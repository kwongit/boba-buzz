from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text


def seed_businesses():
    # asha business_id=1,
    asha = Business(
        owner_id=2,
        address="2086 University Ave",
        city="Berkeley",
        state="CA",
        name="Asha Tea House",
        type="Bubble Tea",
        price=2,
        open_hours="11:00",
        close_hours="7:00",
        image_url="https://media-cdn.tripadvisor.com/media/photo-m/1280/14/ae/9d/fb/tea.jpg"
        )

    # bobaguys business_id=2,
    bobaguys = Business(
        owner_id=3,
        address="429 Stockton St",
        city="San Francisco",
        state="CA",
        name="Boba Guys",
        type="Bubble Tea",
        price=2,
        open_hours="11:00",
        close_hours="7:00",
        image_url="https://miro.medium.com/v2/resize:fit:1200/1*MEh2RxbxZsfOrJZYx1SR6Q.png"
        )

    # fengcha business_id=3,
    fengcha = Business(
        owner_id=2,
        address="6180 Jarvis Ave Ste W",
        city="Newark",
        state="CA",
        name="Feng Cha Teahouse",
        type="Bubble Tea",
        price=2,
        open_hours="12:00",
        close_hours="10:00",
        image_url="https://d1ralsognjng37.cloudfront.net/32eb90ea-69ae-4f6f-9e9e-b3db47dd1a47.jpeg"
        )

    # happylemon business_id=4,
    happylemon = Business(
        owner_id=3,
        address="2321 Santa Clara Ave",
        city="Alameda",
        state="CA",
        name="Happy Lemon",
        type="Bubble Tea",
        price=2,
        open_hours="12:00",
        close_hours="9:00",
        image_url="https://tb-static.uber.com/prod/image-proc/processed_images/3cc94b7875942bc24e9f909029f0725b/c73ecc27d2a9eaa735b1ee95304ba588.jpeg"
        )

    # sunright business_id=5,
    sunright = Business(
        owner_id=2,
        address="795 E El Camino Real",
        city="Sunnyvale",
        state="CA",
        name="Sunright Tea Studio",
        type="Bubble Tea",
        price=2,
        open_hours="11:00",
        close_hours="9:00",
        image_url="https://images.squarespace-cdn.com/content/v1/5e8840afd65f745da4030ca8/1586873103209-YBWA6FN7D8NKQB842A0B/home-new-banner.jpg"
        )

    # teaspoon business_id=6,
    teaspoon = Business(
        owner_id=3,
        address="4546 El Camino Real",
        city="Los Altos",
        state="CA",
        name="Teaspoon",
        type="Bubble Tea",
        price=1,
        open_hours="11:00",
        close_hours="11:00",
        image_url="https://images.squarespace-cdn.com/content/v1/646e5e529e016e3613d15a03/5c87c63c-ca02-413f-9cf2-94bdd250b3ad/Pre-Sealed1.jpg"
        )

    # teatop business_id=7,
    teatop = Business(
        owner_id=2,
        address="82 Ranch Dr",
        city="Milpitas",
        state="CA",
        name="TeaTop",
        type="Bubble Tea",
        price=1,
        open_hours="12:00",
        close_hours="8:00",
        image_url="https://d1ralsognjng37.cloudfront.net/b62a431b-5058-4932-8de6-f2f7617f26e1.jpeg"
        )

    # tiger business_id=8,
    tiger = Business(
        owner_id=3,
        address="1803 El Camino Real",
        city="Burlingame",
        state="CA",
        name="Tiger Tea & Juice",
        type="Bubble Tea",
        price=2,
        open_hours="11:00",
        close_hours="8:00",
        image_url="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photos/415293d3-60a0-4981-b1bf-f8d9bb74854c-retina-large.jpg"
        )

    # tptea business_id=9,
    tptea = Business(
        owner_id=2,
        address="10787 S Blaney Ave",
        city="Cupertino",
        state="CA",
        name="TP Tea",
        type="Bubble Tea",
        price=2,
        open_hours="12:00",
        close_hours="10:00",
        image_url="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/9d9c0b0b-0edb-41fa-aa7b-538137b91e3f.jpg"
        )

    # yifang business_id=10
    yifang = Business(
        owner_id=3,
        address="34133 Fremont Blvd",
        city="Fremont",
        state="CA",
        name="Yi Fang Taiwan Fruit Tea",
        type="Bubble Tea",
        price=2,
        open_hours="12:00",
        close_hours="8:00",
        image_url="https://d1ralsognjng37.cloudfront.net/4984edbb-53ac-4e84-8944-98a4c609cb3e.jpeg"
        )

    businesses = [asha, bobaguys, fengcha, happylemon, sunright, teaspoon, teatop, tiger, tptea, yifang]
    add_business = [db.session.add(business) for business in businesses]
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
