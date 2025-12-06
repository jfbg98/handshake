"""
Entry point for the FastAPI application.
This file allows running the app with: uvicorn main:app --reload
"""
from app.main import app

__all__ = ["app"]

