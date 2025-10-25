# HogayAI Chatbot with Gemini API Integration

A professional AI-powered chatbot integrated with Google's Gemini API for HogayAI's business automation services website.

## Features

- 🤖 **AI-Powered Chatbot**: Integrated with Google Gemini API for intelligent conversations
- 💬 **Real-time Chat**: FastAPI backend with WebSocket-like real-time messaging
- 📱 **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- 🎨 **Professional UI**: Modern, clean interface with smooth animations
- 📝 **Contact Form**: Integrated contact form with backend processing
- 🔄 **Conversation Memory**: Maintains conversation context throughout the chat
- ⚡ **Fast Performance**: Optimized for speed and reliability

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design with mobile-first approach
- Particles.js for visual effects
- Font Awesome icons

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Google Gemini API** - AI language model for chatbot responses
- **Python 3.8+** - Backend programming language
- **Uvicorn** - ASGI server for running FastAPI

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Your Gemini API key

### 1. Clone/Download the Project
```bash
# If using git
git clone <your-repo-url>
cd HogayAi

# Or simply download and extract the files
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root:
```bash
# Create .env file
echo "GEMINI_API_KEY=your_actual_gemini_api_key_here" > .env
```

Or manually create a `.env` file with:
```
GEMINI_API_KEY=AIzaSyDmyLcPvuYdGCnYhVNpBewAnD3I1_GOkgw
```

### 4. Run the FastAPI Backend
```bash
python app.py
```

The API will be available at: `http://localhost:8000`

### 5. Open the Website
Open `index.html` in your web browser or serve it using a local server:

```bash
# Using Python's built-in server
python -m http.server 8001

# Then open: http://localhost:8001
```

## API Endpoints

### Chat Endpoint
- **URL**: `POST /chat`
- **Description**: Send a message to the chatbot
- **Request Body**:
```json
{
  "message": "Hello, I need help with automation",
  "conversation_history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```
- **Response**:
```json
{
  "response": "Hello! I'd be happy to help you with automation...",
  "status": "success"
}
```

### Contact Form Endpoint
- **URL**: `POST /contact`
- **Description**: Submit contact form data
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "business": "Real Estate",
  "message": "I need help with lead automation"
}
```

### Health Check
- **URL**: `GET /health`
- **Description**: Check API status

## Configuration

### Chatbot Behavior
The chatbot is configured with a comprehensive system prompt that includes:
- Company information and services
- Pricing details
- Contact information
- Conversation guidelines
- Response tone and style

You can modify the `SYSTEM_PROMPT` in `app.py` to customize the chatbot's behavior.

### CORS Settings
The API is configured to allow requests from any origin. For production, update the CORS settings in `app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Deployment

### Local Development
1. Run the FastAPI backend: `python app.py`
2. Open `index.html` in your browser
3. The chatbot will connect to `http://localhost:8000`

### Production Deployment
1. **Backend**: Deploy `app.py` to a cloud service (Heroku, AWS, DigitalOcean, etc.)
2. **Frontend**: Update `API_BASE_URL` in `index.html` to point to your production API
3. **Environment**: Set up your Gemini API key in your production environment

### Example Production Setup
```javascript
// In index.html, update the API URL
const API_BASE_URL = 'https://your-api-domain.com';
```

## File Structure

```
HogayAi/
├── index.html              # Main website with chatbot
├── app.py                  # FastAPI backend
├── requirements.txt        # Python dependencies
├── env_example.txt         # Environment variables example
├── README.md              # This file
└── .env                   # Your environment variables (create this)
```

## Customization

### Styling
- All chatbot styles are in the `<style>` section of `index.html`
- Colors, fonts, and layout can be easily modified
- Responsive breakpoints are included for all device sizes

### Chatbot Responses
- Modify the `SYSTEM_PROMPT` in `app.py` to change chatbot behavior
- Add more conversation context or business-specific information
- Adjust response tone and style

### Contact Form
- The contact form sends data to the `/contact` endpoint
- You can add database storage or email notifications
- Form validation is handled both client-side and server-side

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure the FastAPI backend is running
   - Check that the API URL in `index.html` matches your backend URL

2. **API Key Issues**
   - Verify your Gemini API key is correct
   - Make sure the `.env` file is in the same directory as `app.py`

3. **Chatbot Not Responding**
   - Check browser console for errors
   - Verify the backend is running and accessible
   - Check network tab for failed requests

4. **Mobile Issues**
   - The chatbot is fully responsive
   - If you encounter issues, check the CSS media queries

### Debug Mode
To run the backend in debug mode:
```bash
uvicorn app:app --reload --log-level debug
```

## Support

For technical support or questions:
- Email: contacthogayai@gmail.com
- Phone: +1 (647) 673-9123

## License

This project is proprietary to HogayAI. All rights reserved.

---

**HogayAI** - Your work? Ho Gaya. 🤖