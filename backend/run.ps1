# PowerShell script to run the FastAPI server
# Usage: .\run.ps1

Write-Host "Starting Handshake API server..." -ForegroundColor Green

# Activate virtual environment
if (Test-Path ".\app\venv\Scripts\Activate.ps1") {
    & .\app\venv\Scripts\Activate.ps1
} else {
    Write-Host "Virtual environment not found. Please create one first." -ForegroundColor Red
    exit 1
}

# Run uvicorn
Write-Host "Server will be available at http://localhost:8000" -ForegroundColor Cyan
Write-Host "API docs available at http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

