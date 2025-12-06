from pydantic import BaseModel, Field, field_validator
from typing import List
from datetime import datetime


class ProfileBase(BaseModel):
    """Base schema for Profile with common fields."""
    name: str = Field(..., min_length=1, max_length=100, description="Name of the profile")
    role: str = Field(..., description="Role: 'developer' or 'entrepreneur'")
    bio: str = Field(..., min_length=1, max_length=1000, description="Biography")
    skills: List[str] = Field(..., description="List of skills")

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        """Validate that role is either 'developer' or 'entrepreneur'."""
        if v.lower() not in ["developer", "entrepreneur"]:
            raise ValueError("Role must be either 'developer' or 'entrepreneur'")
        return v.lower()


class ProfileCreate(ProfileBase):
    """Schema for creating a new profile."""
    pass


class ProfileUpdate(BaseModel):
    """Schema for updating a profile (all fields optional)."""
    name: str | None = Field(None, min_length=1, max_length=100)
    role: str | None = Field(None)
    bio: str | None = Field(None, min_length=1, max_length=1000)
    skills: List[str] | None = Field(None)

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str | None) -> str | None:
        """Validate that role is either 'developer' or 'entrepreneur'."""
        if v is not None and v.lower() not in ["developer", "entrepreneur"]:
            raise ValueError("Role must be either 'developer' or 'entrepreneur'")
        return v.lower() if v else None


class ProfileResponse(ProfileBase):
    """Schema for profile response."""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

