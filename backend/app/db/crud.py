from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.db.models import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate


async def create_profile(db: AsyncSession, profile: ProfileCreate) -> Profile:
    """
    Create a new profile.
    """
    db_profile = Profile(
        name=profile.name,
        role=profile.role,
        bio=profile.bio,
        skills=profile.skills,
    )
    db.add(db_profile)
    await db.commit()
    await db.refresh(db_profile)
    return db_profile


async def get_profile(db: AsyncSession, profile_id: int) -> Optional[Profile]:
    """
    Get a profile by ID.
    """
    result = await db.execute(select(Profile).where(Profile.id == profile_id))
    return result.scalar_one_or_none()


async def get_profiles(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    role: Optional[str] = None
) -> List[Profile]:
    """
    Get all profiles with optional filtering by role and pagination.
    """
    query = select(Profile)
    
    if role:
        query = query.where(Profile.role == role.lower())
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return list(result.scalars().all())


async def update_profile(
    db: AsyncSession,
    profile_id: int,
    profile_update: ProfileUpdate
) -> Optional[Profile]:
    """
    Update a profile by ID.
    """
    db_profile = await get_profile(db, profile_id)
    if not db_profile:
        return None
    
    update_data = profile_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_profile, field, value)
    
    await db.commit()
    await db.refresh(db_profile)
    return db_profile


async def delete_profile(db: AsyncSession, profile_id: int) -> bool:
    """
    Delete a profile by ID.
    Returns True if deleted, False if not found.
    """
    db_profile = await get_profile(db, profile_id)
    if not db_profile:
        return False
    
    db.delete(db_profile)
    await db.commit()
    return True

