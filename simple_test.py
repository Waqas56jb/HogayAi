import requests
import json

# Test your Render deployment
url = "https://hogayai.onrender.com"

print("Testing Render deployment...")
print(f"URL: {url}")

# Test 1: Main page
try:
    response = requests.get(url, timeout=10)
    print(f"Main page status: {response.status_code}")
    print(f"Response content: {response.text[:200]}...")
except Exception as e:
    print(f"Main page error: {e}")

print()

# Test 2: Status endpoint
try:
    response = requests.get(f"{url}/status", timeout=10)
    print(f"Status endpoint: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Status endpoint error: {e}")

print()

# Test 3: Chat endpoint
try:
    payload = {"message": "Hello", "conversation_history": []}
    response = requests.post(f"{url}/chat", json=payload, timeout=30)
    print(f"Chat endpoint: {response.status_code}")
    print(f"Response: {response.text[:200]}...")
except Exception as e:
    print(f"Chat endpoint error: {e}")
