# Handshake Backend API

FastAPI backend for connecting developers with entrepreneurs.

## Quick Start

### Option 1: Using the run script (Recommended)

**Windows PowerShell:**
```powershell
.\run.ps1
```

**Windows Command Prompt:**
```cmd
run.bat
```

### Option 2: Manual start

1. Activate virtual environment:
   ```powershell
   .\app\venv\Scripts\Activate.ps1
   ```

2. Start the server:
   ```bash
   python -m uvicorn main:app --reload
   ```

   Or from the backend directory:
   ```bash
   uvicorn main:app --reload
   ```

## Installation

If dependencies are not installed:

```powershell
.\app\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## API Endpoints

Once running, the server will be available at:
- **API Root**: http://localhost:8000/
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Profile Endpoints

- `GET /profiles` - List all profiles (with pagination and role filter)
- `GET /profiles/{id}` - Get profile by ID
- `POST /profiles` - Create new profile
- `PUT /profiles/{id}` - Update profile
- `PATCH /profiles/{id}` - Partially update profile
- `DELETE /profiles/{id}` - Delete profile

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI application
│   ├── api/
│   │   └── profiles.py  # Profile endpoints
│   ├── db/
│   │   ├── database.py  # Database configuration
│   │   ├── models.py    # SQLAlchemy models
│   │   └── crud.py      # CRUD operations
│   └── schemas/
│       └── profile.py   # Pydantic schemas
├── main.py              # Entry point (imports from app.main)
├── requirements.txt     # Dependencies
├── run.ps1              # PowerShell startup script
└── run.bat              # Batch startup script
```

## Database

The SQLite database (`handshake.db`) will be created automatically on first run.
