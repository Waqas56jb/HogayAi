# Test script for HogayAI chatbot deployment
# Replace YOUR_RENDER_URL with your actual Render URL

$RENDER_URL = "https://your-app-name.onrender.com"  # Change this to your actual URL

Write-Host "🔍 Testing HogayAI Chatbot Deployment" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host "Testing URL: $RENDER_URL" -ForegroundColor Yellow
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Endpoint..." -ForegroundColor Cyan
try {
    $healthResponse = Invoke-RestMethod -Uri "$RENDER_URL/health" -Method GET -TimeoutSec 10
    Write-Host "✅ Health Check: $($healthResponse.status)" -ForegroundColor Green
    Write-Host "Message: $($healthResponse.message)" -ForegroundColor White
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Gemini API Test
Write-Host "2. Testing Gemini API..." -ForegroundColor Cyan
try {
    $geminiResponse = Invoke-RestMethod -Uri "$RENDER_URL/test-gemini" -Method GET -TimeoutSec 30
    Write-Host "✅ Gemini Test: $($geminiResponse.status)" -ForegroundColor Green
    Write-Host "Message: $($geminiResponse.message)" -ForegroundColor White
    if ($geminiResponse.test_response) {
        Write-Host "Test Response: $($geminiResponse.test_response)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Gemini Test Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Chat Endpoint
Write-Host "3. Testing Chat Endpoint..." -ForegroundColor Cyan
try {
    $chatPayload = @{
        message = "Hello, this is a test message"
        conversation_history = @()
    } | ConvertTo-Json

    $chatResponse = Invoke-RestMethod -Uri "$RENDER_URL/chat" -Method POST -Body $chatPayload -ContentType "application/json" -TimeoutSec 30
    Write-Host "✅ Chat Test: $($chatResponse.status)" -ForegroundColor Green
    Write-Host "Response: $($chatResponse.response)" -ForegroundColor White
} catch {
    Write-Host "❌ Chat Test Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ Tests completed!" -ForegroundColor Green
