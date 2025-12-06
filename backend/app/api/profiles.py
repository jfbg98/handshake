from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.db import crud
from app.db.database import get_db
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("", response_model=ProfileResponse, status_code=201)
async def create_profile(
    profile: ProfileCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new profile.
    """
    try:
        return await crud.create_profile(db=db, profile=profile)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating profile: {str(e)}")


@router.get("", response_model=List[ProfileResponse])
async def read_profiles(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of records to return"),
    role: Optional[str] = Query(None, description="Filter by role: 'developer' or 'entrepreneur'"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all profiles with optional filtering and pagination.
    """
    if role and role.lower() not in ["developer", "entrepreneur"]:
        raise HTTPException(
            status_code=400,
            detail="Role must be either 'developer' or 'entrepreneur'"
        )
    
    profiles = await crud.get_profiles(db=db, skip=skip, limit=limit, role=role)
    return profiles


@router.get("/{profile_id}", response_model=ProfileResponse)
async def read_profile(
    profile_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a profile by ID.
    """
    profile = await crud.get_profile(db=db, profile_id=profile_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/{profile_id}", response_model=ProfileResponse)
async def update_profile(
    profile_id: int,
    profile_update: ProfileUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a profile by ID.
    """
    profile = await crud.update_profile(db=db, profile_id=profile_id, profile_update=profile_update)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.patch("/{profile_id}", response_model=ProfileResponse)
async def patch_profile(
    profile_id: int,
    profile_update: ProfileUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Partially update a profile by ID (same as PUT for this implementation).
    """
    profile = await crud.update_profile(db=db, profile_id=profile_id, profile_update=profile_update)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.delete("/{profile_id}", status_code=204)
async def delete_profile(
    profile_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a profile by ID.
    """
    deleted = await crud.delete_profile(db=db, profile_id=profile_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Profile not found")
    return None

