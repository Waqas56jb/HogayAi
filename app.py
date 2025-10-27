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
import resend

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

print(f"GEMINI_API_KEY loaded: {GEMINI_API_KEY[:10]}...")  # Debug log

genai.configure(api_key=GEMINI_API_KEY)

# Configure Resend API
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "contacthogayai@gmail.com")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    print(f"RESEND_API_KEY loaded: {RESEND_API_KEY[:10]}...")  # Debug log
else:
    print("Warning: RESEND_API_KEY not found in environment variables")

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

class EmailRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class EmailResponse(BaseModel):
    success: bool
    message: str

# System prompt for the chatbot
SYSTEM_PROMPT = """You are HogayAi Assistant, a helpful AI assistant for HogayAI, an AI automation services company. 

Company Information:
- We help service-based businesses save hours every week through AI-powered automations
- Services include: AI Chatbots, Lead Capture Systems, Follow-Up Automation, CRM Integration
- We serve realtors, fitness coaches, salons, and local businesses
- Our mission is to empower businesses with technology that works 24/7

Pricing:
- Starter: $199 per month - Stay connected with your customers automatically. We maintain your chatbot, handle your follow-ups, and send you a monthly performance report — so your business runs on autopilot.
- Growth: $299 per month - Get a smarter automation system that grows with your business. We optimize your lead flow, bookings, and customer reminders every month for better results — no tech headaches.
- Pro: $499 per month (Includes Website) - Everything your business needs in one package. We build and manage your website, automate customer messages, and track your growth with monthly reports and full support.

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
    try:
        return FileResponse("index.html")
    except Exception as e:
        print(f"Error serving index.html: {e}")
        return {"error": "Could not serve the main page", "details": str(e)}

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="HogayAI Chatbot API is running successfully!"
    )

@app.get("/test-gemini")
async def test_gemini():
    """Test Gemini API connection"""
    try:
        test_response = model.generate_content("Hello, this is a test message.")
        return {
            "status": "success",
            "message": "Gemini API is working!",
            "test_response": test_response.text[:100] + "..."
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Gemini API error: {str(e)}",
            "api_key_loaded": bool(GEMINI_API_KEY)
        }

@app.get("/health", response_model=HealthResponse)
async def health_check_legacy():
    """Health check endpoint (legacy)"""
    return HealthResponse(
        status="healthy",
        message="API is operational"
    )

@app.get("/status")
async def status():
    """Simple status endpoint"""
    return {"status": "ok", "message": "HogayAI Chatbot is running"}

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
        try:
            response = model.generate_content(conversation_context)
            bot_response = response.text.strip()
            print(f"Gemini response: {bot_response[:50]}...")  # Debug log
        except Exception as e:
            print(f"Gemini API error: {str(e)}")  # Debug log
            bot_response = "I'm experiencing technical difficulties. Please try again in a moment."
        
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

@app.post("/api/send-email", response_model=EmailResponse)
async def send_email(email_request: EmailRequest):
    """
    Send email notification to admin when users submit contact form
    """
    try:
        if not RESEND_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="Email service not configured"
            )
        
        # Create HTML email content
        html_content = f"""
        <h2>New Contact Message from HogayAI Website</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p><strong>Name:</strong> {email_request.name}</p>
            <p><strong>Email:</strong> {email_request.email}</p>
            <p><strong>Subject:</strong> {email_request.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                {email_request.message.replace('\n', '<br>')}
            </div>
            <hr>
            <p style="color: #666; font-size: 12px;">
                This message was sent from the HogayAI website contact form.
            </p>
        </div>
        """
        
        # Send email using Resend
        email_response = resend.Emails.send({
            "from": "HogayAI Website <noreply@hogayai.com>",
            "to": [ADMIN_EMAIL],
            "subject": f"New Contact Form Message from {email_request.name}",
            "html": html_content,
        })
        
        print(f"Email sent successfully: {email_response}")
        
        return EmailResponse(
            success=True,
            message="Email sent successfully"
        )
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return EmailResponse(
            success=False,
            message=f"Failed to send email: {str(e)}"
        )

@app.post("/contact", response_model=dict)
async def submit_contact_form(contact_data: dict):
    """
    Handle contact form submissions (legacy endpoint)
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
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port,
        reload=False,  # Set to False for production
        log_level="info"
    )
