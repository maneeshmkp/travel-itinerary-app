from sqlalchemy.orm import Session
from models import SessionLocal, Itinerary, Accommodation, Transfer, Activity
from datetime import date, timedelta

def seed_database():
    db = SessionLocal()
    
    # Clear existing data
    db.query(Activity).delete()
    db.query(Transfer).delete()
    db.query(Accommodation).delete()
    db.query(Itinerary).delete()
    db.commit()
    
    # Create seed data for Phuket
    
    # 3-night Phuket itinerary
    phuket_3_nights = Itinerary(
        title="Phuket Beach Getaway",
        duration_nights=3,
        description="A short relaxing beach vacation in Phuket"
    )
    db.add(phuket_3_nights)
    db.commit()
    db.refresh(phuket_3_nights)
    
    # Add accommodation
    db.add(Accommodation(
        itinerary_id=phuket_3_nights.id,
        name="Patong Beach Hotel",
        location="Patong Beach, Phuket",
        check_in_date=date(2023, 6, 1),
        check_out_date=date(2023, 6, 4),
        nights=3
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=phuket_3_nights.id,
        from_location="Phuket International Airport",
        to_location="Patong Beach Hotel",
        transport_type="Private Car",
        date=date(2023, 6, 1)
    ))
    
    db.add(Transfer(
        itinerary_id=phuket_3_nights.id,
        from_location="Patong Beach Hotel",
        to_location="Phuket International Airport",
        transport_type="Private Car",
        date=date(2023, 6, 4)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=phuket_3_nights.id,
        name="Phi Phi Islands Tour",
        location="Phi Phi Islands",
        date=date(2023, 6, 2),
        duration_hours=8,
        description="Full day tour of the stunning Phi Phi Islands with snorkeling and beach time"
    ))
    
    db.add(Activity(
        itinerary_id=phuket_3_nights.id,
        name="Phuket Old Town Walking Tour",
        location="Phuket Old Town",
        date=date(2023, 6, 3),
        duration_hours=4,
        description="Explore the charming streets and Sino-Portuguese architecture of Phuket Old Town"
    ))
    
    # 5-night Phuket itinerary
    phuket_5_nights = Itinerary(
        title="Phuket Explorer",
        duration_nights=5,
        description="Comprehensive exploration of Phuket and surrounding islands"
    )
    db.add(phuket_5_nights)
    db.commit()
    db.refresh(phuket_5_nights)
    
    # Add accommodation
    db.add(Accommodation(
        itinerary_id=phuket_5_nights.id,
        name="Kata Beach Resort",
        location="Kata Beach, Phuket",
        check_in_date=date(2023, 7, 10),
        check_out_date=date(2023, 7, 15),
        nights=5
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=phuket_5_nights.id,
        from_location="Phuket International Airport",
        to_location="Kata Beach Resort",
        transport_type="Private Car",
        date=date(2023, 7, 10)
    ))
    
    db.add(Transfer(
        itinerary_id=phuket_5_nights.id,
        from_location="Kata Beach Resort",
        to_location="Phuket International Airport",
        transport_type="Private Car",
        date=date(2023, 7, 15)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=phuket_5_nights.id,
        name="Phi Phi Islands Tour",
        location="Phi Phi Islands",
        date=date(2023, 7, 11),
        duration_hours=8,
        description="Full day tour of the stunning Phi Phi Islands with snorkeling and beach time"
    ))
    
    db.add(Activity(
        itinerary_id=phuket_5_nights.id,
        name="Phang Nga Bay Tour",
        location="Phang Nga Bay",
        date=date(2023, 7, 12),
        duration_hours=8,
        description="Explore the limestone karsts and caves of Phang Nga Bay, including James Bond Island"
    ))
    
    db.add(Activity(
        itinerary_id=phuket_5_nights.id,
        name="Phuket Old Town Walking Tour",
        location="Phuket Old Town",
        date=date(2023, 7, 13),
        duration_hours=4,
        description="Explore the charming streets and Sino-Portuguese architecture of Phuket Old Town"
    ))
    
    db.add(Activity(
        itinerary_id=phuket_5_nights.id,
        name="Thai Cooking Class",
        location="Kata Beach",
        date=date(2023, 7, 14),
        duration_hours=4,
        description="Learn to cook authentic Thai dishes with local ingredients"
    ))
    
    # Create seed data for Krabi
    
    # 4-night Krabi itinerary
    krabi_4_nights = Itinerary(
        title="Krabi Beach Retreat",
        duration_nights=4,
        description="Relaxing beach vacation in the stunning Krabi province"
    )
    db.add(krabi_4_nights)
    db.commit()
    db.refresh(krabi_4_nights)
    
    # Add accommodation
    db.add(Accommodation(
        itinerary_id=krabi_4_nights.id,
        name="Railay Beach Resort",
        location="Railay Beach, Krabi",
        check_in_date=date(2023, 8, 5),
        check_out_date=date(2023, 8, 9),
        nights=4
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=krabi_4_nights.id,
        from_location="Krabi Airport",
        to_location="Ao Nang Pier",
        transport_type="Private Car",
        date=date(2023, 8, 5)
    ))
    
    db.add(Transfer(
        itinerary_id=krabi_4_nights.id,
        from_location="Ao Nang Pier",
        to_location="Railay Beach",
        transport_type="Longtail Boat",
        date=date(2023, 8, 5)
    ))
    
    db.add(Transfer(
        itinerary_id=krabi_4_nights.id,
        from_location="Railay Beach",
        to_location="Ao Nang Pier",
        transport_type="Longtail Boat",
        date=date(2023, 8, 9)
    ))
    
    db.add(Transfer(
        itinerary_id=krabi_4_nights.id,
        from_location="Ao Nang Pier",
        to_location="Krabi Airport",
        transport_type="Private Car",
        date=date(2023, 8, 9)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=krabi_4_nights.id,
        name="Four Islands Tour",
        location="Krabi",
        date=date(2023, 8, 6),
        duration_hours=8,
        description="Visit four beautiful islands around Krabi with snorkeling opportunities"
    ))
    
    db.add(Activity(
        itinerary_id=krabi_4_nights.id,
        name="Rock Climbing",
        location="Railay Beach",
        date=date(2023, 8, 7),
        duration_hours=4,
        description="Try rock climbing on Railay's world-famous limestone cliffs"
    ))
    
    db.add(Activity(
        itinerary_id=krabi_4_nights.id,
        name="Hong Island Tour",
        location="Hong Island",
        date=date(2023, 8, 8),
        duration_hours=6,
        description="Visit the beautiful Hong Island with its lagoon and pristine beaches"
    ))
    
    # 7-night Phuket & Krabi Combo
    combo_7_nights = Itinerary(
        title="Phuket & Krabi Combo",
        duration_nights=7,
        description="Experience the best of both Phuket and Krabi in one trip"
    )
    db.add(combo_7_nights)
    db.commit()
    db.refresh(combo_7_nights)
    
    # Add accommodations
    db.add(Accommodation(
        itinerary_id=combo_7_nights.id,
        name="Patong Beach Resort",
        location="Patong Beach, Phuket",
        check_in_date=date(2023, 9, 1),
        check_out_date=date(2023, 9, 4),
        nights=3
    ))
    
    db.add(Accommodation(
        itinerary_id=combo_7_nights.id,
        name="Railay Bay Resort",
        location="Railay Beach, Krabi",
        check_in_date=date(2023, 9, 4),
        check_out_date=date(2023, 9, 8),
        nights=4
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=combo_7_nights.id,
        from_location="Phuket International Airport",
        to_location="Patong Beach Resort",
        transport_type="Private Car",
        date=date(2023, 9, 1)
    ))
    
    db.add(Transfer(
        itinerary_id=combo_7_nights.id,
        from_location="Patong Beach Resort",
        to_location="Railay Bay Resort",
        transport_type="Private Car + Longtail Boat",
        date=date(2023, 9, 4)
    ))
    
    db.add(Transfer(
        itinerary_id=combo_7_nights.id,
        from_location="Railay Bay Resort",
        to_location="Krabi Airport",
        transport_type="Longtail Boat + Private Car",
        date=date(2023, 9, 8)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=combo_7_nights.id,
        name="Phi Phi Islands Tour",
        location="Phi Phi Islands",
        date=date(2023, 9, 2),
        duration_hours=8,
        description="Full day tour of the stunning Phi Phi Islands with snorkeling and beach time"
    ))
    
    db.add(Activity(
        itinerary_id=combo_7_nights.id,
        name="Phuket Old Town Walking Tour",
        location="Phuket Old Town",
        date=date(2023, 9, 3),
        duration_hours=4,
        description="Explore the charming streets and Sino-Portuguese architecture of Phuket Old Town"
    ))
    
    db.add(Activity(
        itinerary_id=combo_7_nights.id,
        name="Four Islands Tour",
        location="Krabi",
        date=date(2023, 9, 5),
        duration_hours=8,
        description="Visit four beautiful islands around Krabi with snorkeling opportunities"
    ))
    
    db.add(Activity(
        itinerary_id=combo_7_nights.id,
        name="Rock Climbing",
        location="Railay Beach",
        date=date(2023, 9, 6),
        duration_hours=4,
        description="Try rock climbing on Railay's world-famous limestone cliffs"
    ))
    
    db.add(Activity(
        itinerary_id=combo_7_nights.id,
        name="Hong Island Tour",
        location="Hong Island",
        date=date(2023, 9, 7),
        duration_hours=6,
        description="Visit the beautiful Hong Island with its lagoon and pristine beaches"
    ))
    
    # 2-night Phuket Quick Escape
    phuket_2_nights = Itinerary(
        title="Phuket Quick Escape",
        duration_nights=2,
        description="A quick weekend getaway to Phuket"
    )
    db.add(phuket_2_nights)
    db.commit()
    db.refresh(phuket_2_nights)
    
    # Add accommodation
    db.add(Accommodation(
        itinerary_id=phuket_2_nights.id,
        name="Karon Beach Hotel",
        location="Karon Beach, Phuket",
        check_in_date=date(2023, 10, 1),
        check_out_date=date(2023, 10, 3),
        nights=2
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=phuket_2_nights.id,
        from_location="Phuket International Airport",
        to_location="Karon Beach Hotel",
        transport_type="Private Car",
        date=date(2023, 10, 1)
    ))
    
    db.add(Transfer(
        itinerary_id=phuket_2_nights.id,
        from_location="Karon Beach Hotel",
        to_location="Phuket International Airport",
        transport_type="Private Car",
        date=date(2023, 10, 3)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=phuket_2_nights.id,
        name="Phuket City Tour",
        location="Phuket",
        date=date(2023, 10, 2),
        duration_hours=6,
        description="Explore the highlights of Phuket including Big Buddha, Chalong Temple, and Old Town"
    ))
    
    # 8-night Thailand Explorer
    thailand_8_nights = Itinerary(
        title="Thailand Explorer",
        duration_nights=8,
        description="Comprehensive exploration of Phuket, Krabi and Phi Phi Islands"
    )
    db.add(thailand_8_nights)
    db.commit()
    db.refresh(thailand_8_nights)
    
    # Add accommodations
    db.add(Accommodation(
        itinerary_id=thailand_8_nights.id,
        name="Patong Beach Resort",
        location="Patong Beach, Phuket",
        check_in_date=date(2023, 11, 1),
        check_out_date=date(2023, 11, 4),
        nights=3
    ))
    
    db.add(Accommodation(
        itinerary_id=thailand_8_nights.id,
        name="Phi Phi Island Village",
        location="Phi Phi Island",
        check_in_date=date(2023, 11, 4),
        check_out_date=date(2023, 11, 6),
        nights=2
    ))
    
    db.add(Accommodation(
        itinerary_id=thailand_8_nights.id,
        name="Railay Bay Resort",
        location="Railay Beach, Krabi",
        check_in_date=date(2023, 11, 6),
        check_out_date=date(2023, 11, 9),
        nights=3
    ))
    
    # Add transfers
    db.add(Transfer(
        itinerary_id=thailand_8_nights.id,
        from_location="Phuket International Airport",
        to_location="Patong Beach Resort",
        transport_type="Private Car",
        date=date(2023, 11, 1)
    ))
    
    db.add(Transfer(
        itinerary_id=thailand_8_nights.id,
        from_location="Patong Beach Resort",
        to_location="Phi Phi Island Village",
        transport_type="Ferry",
        date=date(2023, 11, 4)
    ))
    
    db.add(Transfer(
        itinerary_id=thailand_8_nights.id,
        from_location="Phi Phi Island Village",
        to_location="Railay Bay Resort",
        transport_type="Ferry + Longtail Boat",
        date=date(2023, 11, 6)
    ))
    
    db.add(Transfer(
        itinerary_id=thailand_8_nights.id,
        from_location="Railay Bay Resort",
        to_location="Krabi Airport",
        transport_type="Longtail Boat + Private Car",
        date=date(2023, 11, 9)
    ))
    
    # Add activities
    db.add(Activity(
        itinerary_id=thailand_8_nights.id,
        name="Phang Nga Bay Tour",
        location="Phang Nga Bay",
        date=date(2023, 11, 2),
        duration_hours=8,
        description="Explore the limestone karsts and caves of Phang Nga Bay, including James Bond Island"
    ))
    
    db.add(Activity(
        itinerary_id=thailand_8_nights.id,
        name="Phuket Old Town Walking Tour",
        location="Phuket Old Town",
        date=date(2023, 11, 3),
        duration_hours=4,
        description="Explore the charming streets and Sino-Portuguese architecture of Phuket Old Town"
    ))
    
    db.add(Activity(
        itinerary_id=thailand_8_nights.id,
        name="Phi Phi Islands Snorkeling",
        location="Phi Phi Islands",
        date=date(2023, 11, 5),
        duration_hours=6,
        description="Snorkeling tour around the beautiful Phi Phi Islands"
    ))
    
    db.add(Activity(
        itinerary_id=thailand_8_nights.id,
        name="Four Islands Tour",
        location="Krabi",
        date=date(2023, 11, 7),
        duration_hours=8,
        description="Visit four beautiful islands around Krabi with snorkeling opportunities"
    ))
    
    db.add(Activity(
        itinerary_id=thailand_8_nights.id,
        name="Rock Climbing",
        location="Railay Beach",
        date=date(2023, 11, 8),
        duration_hours=4,
        description="Try rock climbing on Railay's world-famous limestone cliffs"
    ))
    
    db.commit()
    db.close()
    
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()