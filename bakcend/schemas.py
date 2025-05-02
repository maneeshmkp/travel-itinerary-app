from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Accommodation schemas
class AccommodationBase(BaseModel):
    name: str
    location: str
    check_in_date: datetime
    check_out_date: datetime
    nights: int


class AccommodationCreate(AccommodationBase):
    pass


class Accommodation(AccommodationBase):
    id: int
    itinerary_id: int

    class Config:
        from_attributes = True


# Transfer schemas
class TransferBase(BaseModel):
    from_location: str
    to_location: str
    transport_type: str
    date: datetime


class TransferCreate(TransferBase):
    pass


class Transfer(TransferBase):
    id: int
    itinerary_id: int

    class Config:
        orm_mode = True


# Activity schemas
class ActivityBase(BaseModel):
    name: str
    location: str
    date: datetime
    duration_hours: float
    description: Optional[str] = None


class ActivityCreate(ActivityBase):
    pass


class Activity(ActivityBase):
    id: int
    itinerary_id: int

    class Config:
        orm_mode = True


# Itinerary schemas
class ItineraryBase(BaseModel):
    title: str
    duration_nights: int
    description: Optional[str] = None


class ItineraryCreate(ItineraryBase):
    accommodations: List[AccommodationCreate]
    transfers: List[TransferCreate]
    activities: List[ActivityCreate]


class Itinerary(ItineraryBase):
    id: int
    created_at: Optional[datetime] = None
    accommodations: List[Accommodation] = []
    transfers: List[Transfer] = []
    activities: List[Activity] = []

    class Config:
        orm_mode = True


# Recommendation schema
class RecommendedItinerary(BaseModel):
    id: int
    title: str
    duration_nights: int
    description: Optional[str] = None
    recommendation_score: float
    highlights: List[str]

    class Config:
        orm_mode = True