#!/usr/bin/env python3
"""
Test script to check HogayAI chatbot deployment
Replace YOUR_RENDER_URL with your actual Render URL
"""

import requests
import json
import sys

# Your actual Render URL
RENDER_URL = "https://hogayai.onrender.com"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{RENDER_URL}/api/health", timeout=10)
        print(f"Health Check: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Health Check Failed: {e}")
        return False

def test_gemini():
    """Test Gemini API endpoint"""
    try:
        response = requests.get(f"{RENDER_URL}/test-gemini", timeout=30)
        print(f"Gemini Test: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Gemini Test Failed: {e}")
        return False

def test_chat():
    """Test chat endpoint"""
    try:
        payload = {
            "message": "Hello, this is a test message",
            "conversation_history": []
        }
        response = requests.post(
            f"{RENDER_URL}/chat", 
            json=payload, 
            timeout=30,
            headers={"Content-Type": "application/json"}
        )
        print(f"Chat Test: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Chat Test Failed: {e}")
        return False

def main():
    print("Testing HogayAI Chatbot Deployment")
    print("=" * 50)
    
    # Update the URL first
    print(f"Testing URL: {RENDER_URL}")
    print()
    
    # Run tests
    health_ok = test_health()
    print()
    
    gemini_ok = test_gemini()
    print()
    
    chat_ok = test_chat()
    print()
    
    # Summary
    print("=" * 50)
    print("Test Results:")
    print(f"Health Check: {'PASS' if health_ok else 'FAIL'}")
    print(f"Gemini API: {'PASS' if gemini_ok else 'FAIL'}")
    print(f"Chat Endpoint: {'PASS' if chat_ok else 'FAIL'}")
    
    if all([health_ok, gemini_ok, chat_ok]):
        print("\nAll tests passed! Your chatbot is working!")
    else:
        print("\nSome tests failed. Check the error messages above.")

if __name__ == "__main__":
    main()
