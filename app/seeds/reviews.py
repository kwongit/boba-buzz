from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text


def seed_reviews():
    # asha
    review1 = Review(
        business_id=1,
        user_id=1,
        review= """
        As a Taiwanese-American who grew up on bubble tea before it became mainstream and globally loved, Asha became one of my haunts during my Cal undergrad days. After all these years, and even through the pandemic, I'm so happy to see still Asha here, and still popular as ever. I'm surprised I didn't write a review til now!

        There's always long lines and crowds of people sitting at the tables. Definitely recommend the matcha latte or the black strawberry drinks. They also have a great selection of authentic Taiwanese and Chinese teas that are imported and fantastic to taste. Whether you're here to study, work, or just have a pleasurable zen session with your choice of tea, Asha is a staple here in downtown Berkeley. It's been wonderful to see them expand in the Bay Area to San Francisco and Oakland, but Berkeley is always going to be the OG location, and a source of pride for Cal.
        """,
        stars=4
        )
    review2 = Review(
        business_id=1,
        user_id=3,
        review= """
        After seeing this place online, I really wanted to give it a shot as it seemed to have really high quality teas and drinks. When you walk in, you're greeted with a huge space with high ceilings and a long bar. There were quite a few options-- some were seasonal, so take advantage of those and give them a try! But, I ended up choosing the basic strawberry matcha haha.

        I brought my laptop here to get some work done, but unfortunately, there was no free wi-fi (I ended up just doing some work offline). The strawberry matcha was really good, but definitely a lot less sweet than if you were to go to other cafes or a big boba/drink chain. However, I did like that change of pace so I would definitely recommend it. Overall, I would love to come back here sometime and try some of their other drinks!
        """,
        stars=5
        )

    # bobaguys
    review3 = Review(
        business_id=2,
        user_id=1,
        review= """
        It's easy to consume loose leaf milk tea, with black pearls made from cassava roots and plenty of sugar. Therefore, I chose an alternative that was beneficial to my health and well being. Even at Boba Guys, it's good to have more than just plenty of options on a plastic cup.

        It's a good thing I came to Boba Guys as early as possible before the line starts to get longer. The one near the tunnel towards Chinatown was one of the most popular, so be patient if the line had lengthened. Once it's your turn, you must choose your drink as soon as possible.

        Like many bubble tea shops, it's imperative to support Asian owned businesses. The Tea people in Boba Guys had done a great job working together to get the drinks done right. The matcha they're using was culinary grade in top quality. The plastic cups, the bamboo boba straws, and the rest of the merchandise were the best assets that made Boba Guys bright.
        """,
        stars=5
        )
    review4 = Review(
        business_id=2,
        user_id=2,
        review=
        """
        I stopped by Boba Guys after it was recommended by a local San Franciscan friend! I was excited to try it out because I'd heard amazing things. I ordered the Hong Kong milk tea since I love the condensed milk and that sweetness in my milk tea.

        I'm not sure if it's because we ordered off the kiosk, but I didn't get the option to select a sweetness or ice level. The tea didn't really have flavor - I wish I could've made it a bit sweeter. It's an order and go type of spot - no chairs and tables inside to drink boba.
        """,
        stars=4
        )

    # fengcha
    review5 = Review(
        business_id=3,
        user_id=1,
        review= "Place is in a great location with surrounding food places. Stopped by after having dinner and it was pretty busy for a Thursday at 8:30 PM. I ordered the strawberry overload with boba. It took awhile to get it but it was pretty good. The people after me didn't have boba in their drinks because they ran out. It makes sense why my boba was very fresh. The tea itself was okay, I feel like it could have been a little sweeter. I was surprised it wasn't that sweet since I asked for 100% sweet. Overall it's a great place to have drinks with friends and desserts. Pretty clean inside and plenty of seating.",
        stars=3
        )
    review6 = Review(
        business_id=3,
        user_id=3,
        review= """
        My first time coming to the Newark location of this boba establishment, and it was a good experience! The interiors are super cute, with decor that reminds me of the cafes I would frequent in Asia. I was the only customer there while I went, but as more people hear about this branch I can imagine it becoming pretty crowded. For now though, it's nice to be able to order and sit at my own leisure, without worrying about crowds and noise. I think this would make a good hangout and first date spot :)

        The drink selection is standard with some of the more traditionally popular options available, along with drinks I don't see very often elsewhere (like dragonfruit). Sizes are pretty big, though I will note that the prices are on the higher end - most drinks cost $6.50 without additions. (Maybe you're also paying for the relaxing and kawaii atmosphere.)

        As preferred, you can customize your sugar and ice level and I enjoyed my 50% sugar 30% ice dragonfruit tea on an especially hot day. Pro Tip: for any drinks in the Fresh Fruit Tea series, you can make it decaf by substituting sparkling water!
        """,
        stars=5
        )

    # happylemon
    review7 = Review(
        business_id=4,
        user_id=1,
        review= """
        There was a line, and other customers before us waiting for their drinks outside. There was a big screen to show whose's drink were up next. Kinda felt like the dmv. Lol but I did like how they limited capacities.

        My very first happy lemon, and I sure am very happy. I got passion fruit green tea with lychee jelly. I love drinks with real fruits in them, and was satisfy with real passion fruit inside my drink. My friend loved her matcha drink, even though she didn't really tasted the tiramisu. But she love the salted cheese, I guess it's a happy lemon must have. Too bad I can't try it, because Of my lactose allergy.

        I really wanted to try their boba waffle, but they don't make that after 8pm. I will return and hopefully they will have them available.
        """,
        stars=4
        )
    review8 = Review(
        business_id=4,
        user_id=2,
        review= "Happy Lemon is probably one of my favorite boba places. I've gotten the green tea with cheese foam and the black tea with cheese foam and both were really good. Definitely a bit on the sweet side so 50 to 75% sweet is a good range. The service was super quick and the girls working were happy to make the adjustments to the drinks that we requested. Not much for seating so it's more of a grab and go place.",
        stars=5
        )

    # sunright
    review9 = Review(
        business_id=5,
        user_id=1,
        review= """
        Not really a boba person but Sunright Tea is one of my all time favorite boba shops!

        We visited Sunright when they had the Honkai event with exclusive drinks. I'd highly highly recommend the Blushing blueberry splendor, it has a perfect amount if sweetness and tartness (tastes better with less than 50% sweet). I hope they will keep this drink in their permanent menu.

        The chocolate matcha, on the other hand, was a bit disappointing. The chocolate is overpowering so you couldn't really taste any matcha flavor
        """,
        stars=3
        )
    review10 = Review(
        business_id=5,
        user_id=3,
        review= """
        Not like this place needs more raves, but this is my favorite boba place. Mainly because I love the mochi topping and haven't found it anywhere else.

        Everything from their regular milk teas to fruit teas to brûlées to yakults are solid. My go to whenever I'm in the area. Re toppings - I also love their honey boba, pudding, etc. I do need that oat milk because I accidentally did the regular milk which was noticeably tastier, but I paid for it later.

        If I'm saving it for the next day (do not advise generally) I will get it without ice and without boba since the boba texture gets real weird if it sits for too long, like any other boba.
        """,
        stars=4
        )

    # teaspoon
    review11 = Review(
        business_id=6,
        user_id=1,
        review= "I was greeted immediately by one of the staff, good vibes with a self-order marching on your right when you first walk-in, a long line waiting outside (so order ahead of you can) plenty of seating area outside as well. Everything was super quick and efficient, in addition to the service, my taro milk tea was delicious. The only thing I would change for my own preference would be to order my taro milk without the Taro shavings because I prefer to just drink my milk tea and not choke on pieces that you could swallow accidentally. Definitely would come back with my husband next time to try out another flavor.",
        stars=5
        )
    review12 = Review(
        business_id=6,
        user_id=2,
        review= """
        A variety of interesting drink options. I went with the creamy Jasmine, since I wanted something more simple. Tasted good but not better than any other boba shop.

        The line seems to fluctuate and there was only 1 person working (making drinks and taking orders at the register). When I ordered there was only 1 person in front. By the time my drink was ready there were about 8 people waiting.
        """,
        stars=3
        )

    # teatop
    review13 = Review(
        business_id=7,
        user_id=1,
        review= """
        Yum!!! Got a couple drinks after dinner and it was one of the best drinks we've had from a boba shop!! I got the lychee milk slushy 30% sweet and it was soooo good! Everyone kept wanting to drink mine also got a mango green tea with aloe and my mom loved it.

        The inside of the shop is super cute and has Vietnamese decorations. Plenty of seating inside to hangout and tables and chairs outside too. The service was quick and our drinks came out perfect. I'd love to come back and grab some other drinks!
        """,
        stars=4
        )
    review14 = Review(
        business_id=7,
        user_id=3,
        review= """
        Oh TeaTop how I miss thee. It's definitely further from us these days, but when we're in the area and we need a boba pick me up, we do end up coming here. Now do I actually get boba at TeaTop? Not really. What I do get here often is their milk foam aka creama drinks. Also specifically we get the sun moon lake black tea (#42) which you can't often get at other places. For some reason, I love this black tea. It's different. I do sometimes get their oolong, but I always go back to the sun moon lake.

        Now if you want a meal, then I suggest getting #6 which is the Earl Grey Milk Tea w/ 3Q. Their earl grey tea doesn't have a strong bergamot taste which is what I like. It doesn't need to be in my face.

        The area does get a little busy during peak times like lunch or dinner because it's next to Shabuya and a couple of other restaurants. They have very limited parking.
        """,
        stars=5
        )

    # tiger
    review15 = Review(
        business_id=8,
        user_id=1,
        review= """
        Solid boba spot in a convenient location! I love the option to make any drink a "potted plant" (cheese foam topped with oreo crumbs and a mint leaf). You can order ahead via the Snackpass app for rewards and convenience.

        I ordered an earl grey tea with boba and the "potted plant" topping. On the pricier side with both of these toppings ($7.75 total), but the drink is creative and delicious! The menu warns that the drink is highly caffeinated. I ordered this drink at 3:30 pm and I'm still awake writing this at 5 am -- oops, use this information to your advantage.

        There's some seats and tables inside to chat and enjoy your drinks. There's also plenty of parking outside the complex and a few stores nearby.
        """,
        stars=3
        )
    review16 = Review(
        business_id=8,
        user_id=2,
        review= """
        Ordered boba here via Doordash after a friend said it was amongst the best boba spots in the Peninsula! Ordered the brown sugar boba milk tea at 50% sugar and less ice. The boba is on the softer side, and even though i don't usually get the brown sugar bobas, it didn't disappoint.

        I have seen brown sugar boba at other places not allow adjustment of the sugar and they always end up too sweet in my opinion. Happy that they let you alter it, especially if you're gonna calorie splurge on it!

        Service was great for delivery (aka they got the order right) and it was so speedy that the boba was still warm and fresh! Amazing amazing! There's some stiff competition for good boba in the peninsula, but it is definitely amongst the best!
        """,
        stars=4
        )

    # tptea
    review17 = Review(
        business_id=9,
        user_id=1,
        review= """
        TP Tea seems to be such a popular place (I usually visit a Japanese store next door, and TP is always pretty busy) so I am glad I decided to finally stop by to get myself a very delicious tea! Lots of various options to choose from so there is something for everyone. My drink (honey lemon tea) was super flavorful, and I loved the fact that you can make it with no ice and no sugar. Tons of options to personalize your drink.

        I didn't have the app so I ordered using the screen by the counter, then you get an assigned number and wait for your tea. I would definitely recommend ordering ahead using the app as it will be much faster (took about 15-20 minutes for my tea). It's very small inside so it's mainly a place where you get your drink to go. It's located in downtown San Mateo so it's street parking only. Overall, it's a great place if you are looking for a nice refreshing drink!
        """,
        stars=5
        )
    review18 = Review(
        business_id=9,
        user_id=3,
        review= "Love when you go to a bubble tea spot and they give you exactly what you asked for - a not-too-sweet 25 percent sugar milk tea that tastes free and not overly-sweet. Refreshing, delicious, straightforward, great taste. Coming back.",
        stars=3
        )

    # yifang
    review19 = Review(
        business_id=10,
        user_id=1,
        review= """
        Yifang has quickly become a boba fallback when they're nearby, as they're quite the reliable option and generally are pretty quick and easy about their menu offerings. It also helps that they adjust their sugar level recommendations based on the drink, which is a rather acute awareness of how things taste on their menu (also more in line with my preferences).

        This particular location has basically no seating and is fairly minimalistic, albeit with some nice traditional-looking decor around. There's a big menu for a visual glance, but ordering is done either online or at their kiosk.

        As their Fruit Teas are in their name, it's a pretty safe bet to go with any of those! The acidic ones tend to be rather uniquely potent so caution is advised (such as the Green Plum). However, I'm also quite the sucker for their fresh taro in their Taro lattes, which are all also pretty good.
        """,
        stars=5
        )
    review20 = Review(
        business_id=10,
        user_id=2,
        review= "Very nice place. Order is automated. I used search function for coffee and two items piped up. Brown sugar, boba, your choice of milk. It came out in minutes. The drink is super rich, the coffee is high quality. It's a little pricey but the product justifies the cost.",
        stars=4
        )

    reviews = [review1,review2,review3,review4,review5,review6,review7,
               review8,review9,review10,review11,review12,review13,review14,
               review15,review16,review17,review18,review19,review20]
    add_review = [db.session.add(review) for review in reviews ]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
