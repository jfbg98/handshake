@echo off
REM Batch script to run the FastAPI server
REM Usage: run.bat

echo Starting Handshake API server...

REM Activate virtual environment
if exist "app\venv\Scripts\activate.bat" (
    call app\venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Please create one first.
    exit /b 1
)

REM Run uvicorn
echo.
echo Server will be available at http://localhost:8000
echo API docs available at http://localhost:8000/docs
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

