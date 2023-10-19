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
        open_hours="11:00 AM",
        close_hours="7:00 PM",
        image_url="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photos/9b2a1b1f-7229-4bd5-9804-b385801933dc-retina-large-jpeg",
        description="""
        Established in 2012.

        Asha Tea House is a venture started by David and Diana Lau, engineers by training but tea enthusiasts at heart. They were inspired by how Starbucks revolutionized the coffee industry by creating a "third home" for coffee lovers, and are huge fans of third-wave coffee companies like Blue Bottle and Intelligentsia Coffee that are devoted to further enhancing the coffee-drinking experience.

        Asha's team members are fiercely dedicated to quality and honesty, and we hope that our passion for tea and what we offer shines through with every sip. If you want to know more, check out these pages: What Makes Asha Different, Where We Source our Teas, How Our Space Came to Be, and a few insights about the Design of our tea house.
        """
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
        open_hours="11:00 AM",
        close_hours="7:00 PM",
        image_url="https://s.hdnux.com/photos/01/16/75/25/20698479/4/rawImage.jpg",
        description="""
        Established in 2011.

        Bin and Andrew worked together at Timbuk2, the kickass messenger bag and accessories company. Bin found the only other Asian guy at Timbuk2 and asked Andrew if he wanted to play ping pong.  After playing ping pong for an hour, we realized that we had the same upbringing despite our geographic and cultural differences: Bin, the small-town country boy from Texas and Andrew, the nerd from New Jersey/California.

        Needless to say, we became great friends and bonded over lunch runs to the local boba shop in the Mission. One day it closed down. We panicked. But soon took matters into our own hands and started learning how to make the perfect cup of boba milk tea. The wheels were churning. Two months later, we threw our first pop-up event with our friends at Ken Ken Ramen.
        """
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
        open_hours="12:00 PM",
        close_hours="10:00 PM",
        image_url="https://d1ralsognjng37.cloudfront.net/32eb90ea-69ae-4f6f-9e9e-b3db47dd1a47.jpeg",
        description="""
        Established in 2016.

        Founded on a passion for tea, we serve fresh, original recipes crafted with premium ingredients. We are truly passionate about quality, fresh ingredients, and providing the best customer experience as possible!
        """
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
        open_hours="12:00 PM",
        close_hours="9:00 PM",
        image_url="https://tb-static.uber.com/prod/image-proc/processed_images/3cc94b7875942bc24e9f909029f0725b/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
        description="""
        Established in 2006.

        Happy Lemon is a world-leading beverage chain founded in 2006 by the Yummy-Town Group, a publicly listed tea culture company originating in Taiwan. They are the elite pioneers who originally brought and expanded the tea culture to Mainland China and Hong Kong.

        In 2014, Happy Lemon successfully became the world’s most recognized and respected tea culture brand with more than 2,000 locations across 21 countries including the USA, Canada, Australia, United Kingdom, South Korea, Japan, Dubai, Philippines, and many more.
        """
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
        open_hours="11:00 AM",
        close_hours="9:00 PM",
        image_url="https://tb-static.uber.com/prod/image-proc/processed_images/2e71f7e6439a8935e733f9f01b22757f/445a4b2618e10f7db95d4f17a85b117d.jpeg",
        description="""
        Established in 2021.

        Sunright was created to bring joy into the routine of the daily caffeine fix. You’ll immediately notice the bold yellow colors and whimsical clouds in our interior design. You’ll connect with our helpful team members who guide you through your personalized Sunright experience. You’ll find something on the menu for everyone in the family — whether it be our Oreo Brȗlée Boba Milk for the child (or child at heart) who loves cookies, or a freshly-brewed Four Seasons Tea for your grandma who wants an elegant drink with a light, smooth flavor.
        """
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
        open_hours="11:00 AM",
        close_hours="11:00 PM",
        image_url="https://images.squarespace-cdn.com/content/v1/646e5e529e016e3613d15a03/5c87c63c-ca02-413f-9cf2-94bdd250b3ad/Pre-Sealed1.jpg",
        description="""
        Established in 2023.

        Teaspoon, the esteemed boba drink destination, originated in Los Altos, CA, and has achieved a remarkable milestone of serving over 7 million unique and delightful beverages. Our popularity has rapidly expanded from the West Coast to the Midwest and East Coast, captivating taste buds nationwide. At Teaspoon, we take pride in the art of handcrafting every drink with love, ensuring an unforgettable experience for individuals from all walks of life.

        We firmly believe in the power of a cup of your favorite tea to bring happiness. Whether you've endured a challenging day or simply desire a rejuvenating beverage, trust in us to deliver joy, one Teaspoon at a time.
        """
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
        open_hours="12:00 PM",
        close_hours="8:00 PM",
        image_url="https://d1ralsognjng37.cloudfront.net/b62a431b-5058-4932-8de6-f2f7617f26e1.jpeg",
        description="""
        Established in 2006.

        TeaTop originates from Tea Talk, a premium enterprise specialized in the domestic tea brewing business.

        To change the traditional idea of using “inferior” tea for bubble drinks in the early days, President David Yang entered the tea drink market and pioneered the use of top graded “High Mountain Tea Leaves” (cost $1.50 per ounce) to serve his customers in Taiwan.
        """
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
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photos/415293d3-60a0-4981-b1bf-f8d9bb74854c-retina-large.jpg",
        description="""
        Established in 2015.

        Established in 2015 in the San Francisco Bay Area, Tiger Tea & Juice sources the finest teas from around the world. Our ingredients are strictly quality-controlled for a rich, lingering taste, making it an ideal choice for those who appreciate high-quality tea.

        We select fresh, in-season fruits without any artificial colors or flavors, allowing you to enjoy the true taste of nature's bounty.

        Our healthy beverages are made from natural ingredients without additives or artificial colors, providing a refreshing taste that's also rich in nutrition, making it a great choice for those who are committed to maintaining a healthy lifestyle while enjoying boba tea.

        At Tiger Tea & Juice, we’re committed to providing passionate and attentive service while offering excellent products. Our trained staff will provide you with warm and caring service throughout your experience. Whether it's a busy workday or a relaxing weekend, we offer you the best options to indulge in while enjoying a pleasurable experience. We appreciate your support and look forward to your visit!
        """
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
        open_hours="12:00 PM",
        close_hours="10:00 PM",
        image_url="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/9d9c0b0b-0edb-41fa-aa7b-538137b91e3f.jpg",
        description="""
        Established in 2005.

        TP TEA has utilized the 30 years of experience and expertise in tea to select tea leaves of the finest quality for our consumers.

        We want to make new friends via tea and therefore want to provide the best tea for them.

        Everyone at TP TEA is committed to making the best tea to entertain our customers.
        """
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
        open_hours="12:00 PM",
        close_hours="8:00 PM",
        image_url="https://d1ralsognjng37.cloudfront.net/4984edbb-53ac-4e84-8944-98a4c609cb3e.jpeg",
        description="""
        Established in 2018.

        My grandmother, Yi Fang, married a young farmer. For three generations, our family has been planting pineapples for a living.

        Bending down and working hard all day long, that was their life in miniature. With an epiphany, grandma braised the overripe golden pineapples into preservable homemade jam. ​Our most sought-out drink, Yifang Fruit Tea, inherited not only grandma’s name, but also her secret recipe. We have put the early Taiwan epitome, historic memories and warm hospitality in this one cup of drink — using home-made organic cane sugar, seasonal fresh fruits, and natural ingredients (zero concentrated juice and powders). In every sip, you can taste the freshness of the tea and sweetness of the fruits, recreating the authentic and classic Taiwanese flavor all over again.
        """
        )

    # tongsui business_id=11
    tongsui = Business(
        owner_id=1,
        address="927 E Arques Ave Ste 151 ",
        city="Sunnyvale",
        state="CA",
        name="Tong Sui",
        type="Bubble Tea",
        price=3,
        open_hours="11:00 AM",
        close_hours="9:00 PM",
        image_url="https://tb-static.uber.com/prod/image-proc/processed_images/94c381dd22fc0470343b0b6227bdf1ef/c73ecc27d2a9eaa735b1ee95304ba588.jpeg",
        description="""
        Specialties
        coconut pudding, organic, made of fresh coconut water, low sugary, Asian dessert, seasonal, frushie, fresh, real fruit, smoothies
        """
        )

    # pinkpink business_id=12
    pinkpink = Business(
        owner_id=1,
        address="2855 Stevens Creek Blvd Ste 2299",
        city="Santa Clara",
        state="CA",
        name="Pink Pink Tea Shoppe",
        type="Bubble Tea",
        price=3,
        open_hours="11:00 AM",
        close_hours="9:00 PM",
        image_url="https://doordash-static.s3.amazonaws.com/media/store/header/ab1576dd-35aa-4c8d-b0dc-2003feeff62d.jpg",
        description="""
        We're a local woman-owned small business with a passion for creating fresh and healthy tea drinks. We use organic ingredients and less sugar than most boba tea shops. Our team tests hundreds of recipes to make sure we offer only the best-looking, best-tasting, and best-for-you drinks possible! We're just getting started and would appreciate your review and feedback on any platform. Thanks for your support and we hope you enjoy it!
        """
        )

    #  business_id=13
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=14
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=15
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=16
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=17
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=18
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=19
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    #  business_id=20
    x = Business(
        owner_id=1,
        address="",
        city="",
        state="CA",
        name="",
        type="Bubble Tea",
        price=2,
        open_hours="11:00 AM",
        close_hours="8:00 PM",
        image_url="",
        description="""

        """
        )

    businesses = [asha, bobaguys, fengcha, happylemon, sunright, teaspoon, teatop, tiger, tptea, yifang, tongsui, pinkpink]
    add_business = [db.session.add(business) for business in businesses]
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
