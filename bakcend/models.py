from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, create_engine, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime

Base = declarative_base()

class Itinerary(Base):
    __tablename__ = "itineraries"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    duration_nights = Column(Integer, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    accommodations = relationship("Accommodation", back_populates="itinerary", cascade="all, delete-orphan")
    transfers = relationship("Transfer", back_populates="itinerary", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="itinerary", cascade="all, delete-orphan")
    
    # Index for faster querying by duration
    __table_args__ = (Index('idx_duration_nights', 'duration_nights'),)


class Accommodation(Base):
    __tablename__ = "accommodations"
    
    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    check_in_date = Column(Date, nullable=False)
    check_out_date = Column(Date, nullable=False)
    nights = Column(Integer, nullable=False)
    
    # Relationship
    itinerary = relationship("Itinerary", back_populates="accommodations")
    
    # Index for faster querying by location
    __table_args__ = (Index('idx_accommodation_location', 'location'),)


class Transfer(Base):
    __tablename__ = "transfers"
    
    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id", ondelete="CASCADE"), nullable=False)
    from_location = Column(String, nullable=False)
    to_location = Column(String, nullable=False)
    transport_type = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    
    # Relationship
    itinerary = relationship("Itinerary", back_populates="transfers")
    
    # Index for faster querying by date
    __table_args__ = (Index('idx_transfer_date', 'date'),)


class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    duration_hours = Column(Float, nullable=False)
    description = Column(String)
    
    # Relationship
    itinerary = relationship("Itinerary", back_populates="activities")
    
    # Indexes for faster querying by location and date
    __table_args__ = (
        Index('idx_activity_location', 'location'),
        Index('idx_activity_date', 'date'),
    )


# Database connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./travel_itineraries.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()