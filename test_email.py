#!/usr/bin/env python3
"""
Test script for HogayAI email functionality
"""

import requests
import json

# Test locally
LOCAL_URL = "http://localhost:3000"

def test_email_endpoint():
    """Test the email endpoint"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Email from Local",
            "message": "This is a test message to verify email functionality is working correctly."
        }
        
        print("Testing email endpoint...")
        print(f"URL: {LOCAL_URL}/api/send-email")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{LOCAL_URL}/api/send-email",
            json=payload,
            timeout=30,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✅ Email sent successfully!")
                print("📧 Check contacthogayai@gmail.com for the email")
            else:
                print("❌ Email failed to send")
                print(f"Error: {result.get('message')}")
        else:
            print(f"❌ Request failed with status {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error testing email: {e}")

if __name__ == "__main__":
    test_email_endpoint()
