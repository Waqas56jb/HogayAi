from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uvicorn
from typing import Optional
import json

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="HogayAI Chatbot API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (if you have any CSS, JS, images)
# app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Gemini model (using gemini-2.0-flash for free tier)
model = genai.GenerativeModel('gemini-2.0-flash')

# Pydantic models for request/response
class ChatMessage(BaseModel):
    message: str
    conversation_history: Optional[list] = []

class ChatResponse(BaseModel):
    response: str
    status: str = "success"

class HealthResponse(BaseModel):
    status: str
    message: str

# System prompt for the chatbot
SYSTEM_PROMPT = """You are HogayAi Assistant, a helpful AI assistant for HogayAI, an AI automation services company. 

Company Information:
- We help service-based businesses save hours every week through AI-powered automations
- Services include: AI Chatbots, Lead Capture Systems, Follow-Up Automation, CRM Integration
- We serve realtors, fitness coaches, salons, and local businesses
- Our mission is to empower businesses with technology that works 24/7

Pricing:
- Starter: $99 (one-time) - 1 AI automation, professional setup, 1-week support
- Growth: $299 (one-time) - Up to 3 automations, chatbot + CRM integration, 1-month support (Most Popular)
- Pro: $499 (one-time) - Custom automations, analytics dashboard, 3-month support

Contact:
- Phone: +1 (647) 673-9123
- Email: contacthogayai@gmail.com
- Business Hours: Mon-Fri 9am-6pm EST

Guidelines:
- Be friendly, professional, and helpful
- Focus on how AI automation can help their business
- Ask qualifying questions about their business type and needs
- Offer to connect them with the team for a free consultation
- Keep responses concise but informative
- Always maintain a positive, solution-oriented tone
- If asked about technical details, offer to connect them with our technical team
- Encourage them to book a free demo or consultation

Remember: Your goal is to help potential customers understand how HogayAI can solve their automation needs and guide them toward booking a consultation or demo."""

@app.get("/")
async def root():
    """Serve the main HTML page"""
    return FileResponse("index.html")

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="HogayAI Chatbot API is running successfully!"
    )

@app.get("/health", response_model=HealthResponse)
async def health_check_legacy():
    """Health check endpoint (legacy)"""
    return HealthResponse(
        status="healthy",
        message="API is operational"
    )

@app.post("/chat", response_model=ChatResponse)
async def chat_with_bot(chat_message: ChatMessage):
    """
    Main chat endpoint that processes user messages and returns AI responses
    """
    try:
        # Prepare the conversation context
        conversation_context = SYSTEM_PROMPT + "\n\n"
        
        # Add conversation history if provided
        if chat_message.conversation_history:
            conversation_context += "Previous conversation:\n"
            for msg in chat_message.conversation_history[-10:]:  # Keep last 10 messages
                if msg.get("role") == "user":
                    conversation_context += f"User: {msg.get('content', '')}\n"
                elif msg.get("role") == "assistant":
                    conversation_context += f"Assistant: {msg.get('content', '')}\n"
            conversation_context += "\n"
        
        # Add current user message
        conversation_context += f"User: {chat_message.message}\n\nAssistant:"
        
        # Generate response using Gemini
        response = model.generate_content(conversation_context)
        
        # Extract the response text and clean up formatting
        bot_response = response.text.strip()
        
        # Clean up and format the response for better display
        if not bot_response or bot_response.strip() == "":
            bot_response = "I'm here to help! Could you please rephrase your question?"
        
        # Replace markdown formatting with proper HTML-like formatting
        bot_response = bot_response.replace('**', '')   # Remove bold markers
        bot_response = bot_response.replace('__', '')  # Remove underline markers
        bot_response = bot_response.replace('*', '•')  # Replace asterisks with bullets
        
        # Handle line breaks properly
        bot_response = bot_response.replace('\n\n', '\n')  # Clean up double line breaks
        
        # Format headings and lists better
        lines = bot_response.split('\n')
        formatted_lines = []
        for line in lines:
            line = line.strip()
            if line.startswith('•') or line.startswith('-') or line.startswith('*'):
                # Format as bullet point
                formatted_lines.append(f"• {line[1:].strip()}")
            elif line and not line.startswith('•'):
                # Regular text
                formatted_lines.append(line)
        
        bot_response = '\n'.join(formatted_lines)
        
        # Ensure we have a valid response
        if not bot_response or bot_response.strip() == "":
            bot_response = "I'm here to help! Could you please rephrase your question?"
        
        return ChatResponse(
            response=bot_response,
            status="success"
        )
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat message: {str(e)}"
        )

@app.post("/contact", response_model=dict)
async def submit_contact_form(contact_data: dict):
    """
    Handle contact form submissions
    """
    try:
        # Here you would typically save to database or send email
        # For now, we'll just return a success message
        
        required_fields = ["name", "email", "business", "message"]
        for field in required_fields:
            if field not in contact_data:
                raise HTTPException(
                    status_code=400,
                    detail=f"Missing required field: {field}"
                )
        
        # In a real application, you would:
        # 1. Save to database
        # 2. Send email notification
        # 3. Send confirmation email to user
        
        return {
            "status": "success",
            "message": "Thank you for your message! We will get back to you within 24 hours.",
            "data": {
                "name": contact_data["name"],
                "email": contact_data["email"],
                "business": contact_data["business"]
            }
        }
        
    except Exception as e:
        print(f"Error in contact endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing contact form: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
