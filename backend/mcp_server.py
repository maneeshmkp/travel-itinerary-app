from fastapi import FastAPI, Depends, HTTPException, Path
from sqlalchemy.orm import Session
import models
import schemas
from typing import List
import random

app = FastAPI(title="MCP Server for Travel Itineraries")

# Dependency to get the database session
def get_db():
    db = models.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome MCP Server to the Travel Itinerary API!"}


@app.get("/api/recommendations/{nights}", response_model=List[schemas.RecommendedItinerary])
def get_recommendations(
    nights: int = Path(..., ge=2, le=8),  
    db: Session = Depends(get_db)
):

    """
    Get recommended itineraries for a specific duration (2-8 nights)
    """
    if nights < 2 or nights > 8:
        raise HTTPException(status_code=400, detail="Duration must be between 2 and 8 nights")
    
    # Get itineraries with the specified duration
    itineraries = db.query(models.Itinerary).filter(
        models.Itinerary.duration_nights == nights
    ).all()
    
    # If no exact matches, get itineraries with similar duration
    if not itineraries:
        itineraries = db.query(models.Itinerary).filter(
            models.Itinerary.duration_nights.between(nights-1, nights+1)
        ).all()
    
    # Transform to recommended itineraries with scores and highlights
    recommended_itineraries = []
    for itinerary in itineraries:
        # Generate a recommendation score (in a real system, this would be based on algorithms)
        score = round(random.uniform(0.7, 0.98), 2)
        
        # Extract highlights from activities
        highlights = []
        for activity in itinerary.activities[:3]:  # Take up to 3 activities as highlights
            highlights.append(activity.name)
        
        recommended_itineraries.append(
            schemas.RecommendedItinerary(
                id=itinerary.id,
                title=itinerary.title,
                duration_nights=itinerary.duration_nights,
                description=itinerary.description,
                recommendation_score=score,
                highlights=highlights
            )
        )
    
    # Sort by recommendation score
    recommended_itineraries.sort(key=lambda x: x.recommendation_score, reverse=True)
    
    return recommended_itineraries


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)