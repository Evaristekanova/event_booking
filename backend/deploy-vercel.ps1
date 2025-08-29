# Vercel Deployment Script for Windows
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    Write-Host "Please run: npm i -g vercel" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
try {
    $vercelAuth = vercel whoami
    Write-Host "✅ Logged in as: $vercelAuth" -ForegroundColor Green
} catch {
    Write-Host "❌ Not logged in to Vercel" -ForegroundColor Red
    Write-Host "Please run: vercel login" -ForegroundColor Yellow
    exit 1
}

# Build the application
Write-Host "🏗️ Building application..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Blue
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Your app is now live on Vercel!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📊 Check status with:" -ForegroundColor Cyan
    Write-Host "   vercel status" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 View logs with:" -ForegroundColor Cyan
    Write-Host "   vercel logs" -ForegroundColor White
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host "Check the logs above for errors." -ForegroundColor Yellow
}
