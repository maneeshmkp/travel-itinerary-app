from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from datetime import date, timedelta

app = FastAPI(title="Travel Itinerary API")

# Dependency to get the database session
def get_db():
    db = models.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/itineraries", response_model=List[schemas.Itinerary])
def get_itineraries(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    Get all itineraries with pagination support
    """
    itineraries = db.query(models.Itinerary).offset(skip).limit(limit).all()
    return itineraries


@app.get("/api/itineraries/{itinerary_id}", response_model=schemas.Itinerary)
def get_itinerary(itinerary_id: int, db: Session = Depends(get_db)):
    """
    Get a specific itinerary by ID
    """
    itinerary = db.query(models.Itinerary).filter(models.Itinerary.id == itinerary_id).first()
    if itinerary is None:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary


@app.post("/api/itineraries", response_model=schemas.Itinerary)
def create_itinerary(itinerary: schemas.ItineraryCreate, db: Session = Depends(get_db)):
    """
    Create a new itinerary with accommodations, transfers, and activities
    """
    # Create the itinerary
    db_itinerary = models.Itinerary(
        title=itinerary.title,
        duration_nights=itinerary.duration_nights,
        description=itinerary.description
    )
    db.add(db_itinerary)
    db.commit()
    db.refresh(db_itinerary)
    
    # Add accommodations
    for accommodation in itinerary.accommodations:
        db_accommodation = models.Accommodation(
            itinerary_id=db_itinerary.id,
            name=accommodation.name,
            location=accommodation.location,
            check_in_date=accommodation.check_in_date,
            check_out_date=accommodation.check_out_date,
            nights=accommodation.nights
        )
        db.add(db_accommodation)
    
    # Add transfers
    for transfer in itinerary.transfers:
        db_transfer = models.Transfer(
            itinerary_id=db_itinerary.id,
            from_location=transfer.from_location,
            to_location=transfer.to_location,
            transport_type=transfer.transport_type,
            date=transfer.date
        )
        db.add(db_transfer)
    
    # Add activities
    for activity in itinerary.activities:
        db_activity = models.Activity(
            itinerary_id=db_itinerary.id,
            name=activity.name,
            location=activity.location,
            date=activity.date,
            duration_hours=activity.duration_hours,
            description=activity.description
        )
        db.add(db_activity)
    
    db.commit()
    db.refresh(db_itinerary)
    return db_itinerary


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)