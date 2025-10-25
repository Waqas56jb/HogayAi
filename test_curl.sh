#!/bin/bash
# Test script for HogayAI chatbot deployment
# Replace YOUR_RENDER_URL with your actual Render URL

RENDER_URL="https://your-app-name.onrender.com"  # Change this to your actual URL

echo "🔍 Testing HogayAI Chatbot Deployment"
echo "======================================"
echo "Testing URL: $RENDER_URL"
echo ""

# Test 1: Health Check
echo "1. Testing Health Endpoint..."
curl -s "$RENDER_URL/health" | jq '.' 2>/dev/null || curl -s "$RENDER_URL/health"
echo ""

# Test 2: Gemini API Test
echo "2. Testing Gemini API..."
curl -s "$RENDER_URL/test-gemini" | jq '.' 2>/dev/null || curl -s "$RENDER_URL/test-gemini"
echo ""

# Test 3: Chat Endpoint
echo "3. Testing Chat Endpoint..."
curl -s -X POST "$RENDER_URL/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, this is a test", "conversation_history": []}' | jq '.' 2>/dev/null || \
curl -s -X POST "$RENDER_URL/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, this is a test", "conversation_history": []}'
echo ""

echo "✅ Tests completed!"
