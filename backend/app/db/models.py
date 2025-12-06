from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from app.db.database import Base


class Profile(Base):
    """
    Profile model representing either a developer or an entrepreneur.
    """
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    role = Column(String, nullable=False, index=True)  # "developer" or "entrepreneur"
    bio = Column(String, nullable=False)
    skills = Column(JSON, nullable=False)  # Stored as JSON array
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

