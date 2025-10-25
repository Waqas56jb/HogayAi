# HogayAI Chatbot - Render Deployment Guide

## 🚀 Deploy to Render

### Step 1: Push to GitHub
1. Make sure all your files are committed to GitHub
2. Your repository should contain:
   - `app.py` (FastAPI backend)
   - `index.html` (Frontend)
   - `requirements.txt` (Dependencies)
   - `render.yaml` (Render configuration)
   - `Procfile` (Process file)
   - `.env` (Environment variables - keep this private!)

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select your HogayAI repository
6. Configure the service:
   - **Name**: `hogayai-chatbot`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

```
GEMINI_API_KEY=AIzaSyDmyLcPvuYdGCnYhVNpBewAnD3I1_GOkgw
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Your chatbot will be available at: `https://your-app-name.onrender.com`

## 🔧 Environment Variables for Render

### Required Environment Variables:
```
GEMINI_API_KEY=AIzaSyDmyLcPvuYdGCnYhVNpBewAnD3I1_GOkgw
```

### How to Add Environment Variables in Render:
1. Go to your service dashboard
2. Click on "Environment" tab
3. Add the environment variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyDmyLcPvuYdGCnYhVNpBewAnD3I1_GOkgw`
4. Click "Save Changes"
5. Redeploy if necessary

## 📁 Project Structure
```
HogayAi/
├── app.py                 # FastAPI backend
├── index.html            # Frontend with chatbot
├── requirements.txt      # Python dependencies
├── render.yaml          # Render configuration
├── Procfile             # Process file for Render
├── .env                 # Environment variables (local only)
├── env_example.txt      # Environment variables example
├── README.md           # Project documentation
└── DEPLOYMENT.md       # This deployment guide
```

## 🌐 Production URLs
- **Frontend**: `https://your-app-name.onrender.com`
- **API Health Check**: `https://your-app-name.onrender.com/health`
- **API Chat Endpoint**: `https://your-app-name.onrender.com/chat`

## 🔍 Troubleshooting

### Common Issues:
1. **Build Fails**: Check if all dependencies are in `requirements.txt`
2. **Environment Variables**: Make sure `GEMINI_API_KEY` is set in Render dashboard
3. **CORS Issues**: The app is configured to allow all origins in production
4. **Empty Responses**: Check the logs in Render dashboard for API errors

### Logs:
- Go to your service dashboard
- Click "Logs" tab
- Check for any error messages
- Common errors: Missing environment variables, API key issues

## 🎯 Features After Deployment:
- ✅ AI-powered chatbot with Gemini API
- ✅ Professional responsive UI
- ✅ Real-time messaging
- ✅ Contact form integration
- ✅ Mobile-friendly design
- ✅ Production-ready backend

## 📞 Support
If you encounter issues:
- Check Render logs
- Verify environment variables
- Test API endpoints
- Contact: contacthogayai@gmail.com

---

**Your HogayAI Chatbot is now live! 🎉**
