from app.models import db, environment, SCHEMA
from app.models.featured_item import FeaturedItem
from sqlalchemy.sql import text


def seed_featured_items():
    # asha business_id=1,
    featured_item1 = FeaturedItem(
        business_id=1,
        name="Hong Kong Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/_8SjAW-jAUlU3b_pfHrSGQ/258s.jpg"
    )
    featured_item2 = FeaturedItem(
        business_id=1,
        name="Ice Matcha Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/dQ6GFeT_X3PsPv5U72my0A/258s.jpg"
    )
    featured_item3 = FeaturedItem(
        business_id=1,
        name="Strawberry Black Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/2c-Fdf5zwT_OufBLRcJHFg/258s.jpg"
    )
    featured_item4 = FeaturedItem(
        business_id=1,
        name="Hojicha Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/_hx3XROySpjp4sVXKQaHrw/258s.jpg"
    )
    featured_item5 = FeaturedItem(
        business_id=1,
        name="Matcha Green Tea Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/8QduNKlcEaOdsmHMaJ5FsA/258s.jpg"
    )

    asha_items = [featured_item1, featured_item2, featured_item3, featured_item4, featured_item5]
    add_asha_items = [db.session.add(asha_item) for asha_item in asha_items]
    db.session.commit()

    # bobaguys business_id=2,
    featured_item6 = FeaturedItem(
        business_id=2,
        name="Strawberry Matcha Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/tY1HyU-Rzz0usQ7vqQ8kVQ/258s.jpg"
    )
    featured_item7 = FeaturedItem(
        business_id=2,
        name="Jasmine Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/vm4ZRiVRTjbBwelaISt1Nw/258s.jpg"
    )
    featured_item8 = FeaturedItem(
        business_id=2,
        name="Best Boba Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/ZJmRXAEm5BbfFyk7nRzxLw/258s.jpg"
    )
    featured_item9 = FeaturedItem(
        business_id=2,
        name="Classic Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/S2NJcpd5E3Jup2pxTwT9bw/258s.jpg"
    )
    featured_item10 = FeaturedItem(
        business_id=2,
        name="Dirty Horchata",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/uP0IiLnE8KLBF0f0VgmY7g/258s.jpg"
    )

    bobaguys_items = [featured_item6, featured_item7, featured_item8, featured_item9, featured_item10]
    add_bobaguys_items = [db.session.add(bobaguys_item) for bobaguys_item in bobaguys_items]
    db.session.commit()

    # fengcha business_id=3,
    featured_item11 = FeaturedItem(
        business_id=3,
        name="Dirty Boba",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/ffEabQ7nNCvN40OVeffwZQ/258s.jpg"
    )
    featured_item12 = FeaturedItem(
        business_id=3,
        name="Brown Sugar Boba Milk",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/ybht_e3USsKGjnXt_80eNw/258s.jpg"
    )
    featured_item13 = FeaturedItem(
        business_id=3,
        name="Strawberry Overload",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/XYEiDWMLFh5R4x0lynGO2A/258s.jpg"
    )
    featured_item14 = FeaturedItem(
        business_id=3,
        name="Kiwi Basil Green Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/afWul4s7z-bmCtzMXq1Wag/258s.jpg"
    )
    featured_item15 = FeaturedItem(
        business_id=3,
        name="Black Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/nQn0iNUO7SLnOLzi3vvSXw/258s.jpg"
    )

    fengcha_items = [featured_item11, featured_item12, featured_item13, featured_item14, featured_item15]
    add_fengcha_items = [db.session.add(fengcha_item) for fengcha_item in fengcha_items]
    db.session.commit()

    # happylemon business_id=4,
    featured_item16 = FeaturedItem(
        business_id=4,
        name="Mango Matcha",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/9GVG3HP_cN9-k8whnmjjGw/258s.jpg"
    )
    featured_item17 = FeaturedItem(
        business_id=4,
        name="Green Tea Salted Cheese",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/FF-g2SHgYmHNoBTIpPbR0w/258s.jpg"
    )
    featured_item18 = FeaturedItem(
        business_id=4,
        name="Matcha Latte Tiramisu",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/n-7a9O2-dbaLGn8BMW5CoA/258s.jpg"
    )
    featured_item19 = FeaturedItem(
        business_id=4,
        name="Passion Fruit Green Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/n--ZXcZGnZDO7gaX7u9Z-A/258s.jpg"
    )
    featured_item20 = FeaturedItem(
        business_id=4,
        name="Fresh Lemon Black Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Ma3Xv4PSi6mrSazZavdr3g/258s.jpg"
    )

    happylemon_items = [featured_item16, featured_item17, featured_item18, featured_item19, featured_item20]
    add_happylemon_items = [db.session.add(happylemon_item) for happylemon_item in happylemon_items]
    db.session.commit()

    # sunright business_id=5,
    featured_item21 = FeaturedItem(
        business_id=5,
        name="Strawberry Jasmine Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/AQA17Kxe0NHgbDPFpwovZQ/258s.jpg"
    )
    featured_item22 = FeaturedItem(
        business_id=5,
        name="Sunright Boba Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/5GQxtU2oI7aEkfuV-05Rdw/258s.jpg"
    )
    featured_item23 = FeaturedItem(
        business_id=5,
        name="Sunright Fruit Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/hlrX5bUHuYYx7xdh6Tmd1A/258s.jpg"
    )
    featured_item24 = FeaturedItem(
        business_id=5,
        name="Cream Pudding Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/xq3VByzYxNP5j4BhLXUiBQ/258s.jpg"
    )
    featured_item25 = FeaturedItem(
        business_id=5,
        name="Taro Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/5Z5HI-NrVjHkwa45-Mxzow/258s.jpg"
    )

    sunright_items = [featured_item21, featured_item22, featured_item23, featured_item24, featured_item25]
    add_sunright_items = [db.session.add(sunright_item) for sunright_item in sunright_items]
    db.session.commit()

    # teaspoon business_id=6,
    featured_item26 = FeaturedItem(
        business_id=6,
        name="Grasshopper",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/VFCK15fqVRgOE3jsy5oIAA/258s.jpg"
    )
    featured_item27 = FeaturedItem(
        business_id=6,
        name="Crystal Boba",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/RscRcnhsoSqgwTAWzTPssA/258s.jpg"
    )
    featured_item28 = FeaturedItem(
        business_id=6,
        name="Hot Paradise Lime",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/NZmaQM6_VVWh89b2Gt_Jnw/258s.jpg"
    )
    featured_item29 = FeaturedItem(
        business_id=6,
        name="W/ Fresh Cucumber Juice",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/UycKnzMqS3253bpZS5Rkeg/258s.jpg"
    )
    featured_item30 = FeaturedItem(
        business_id=6,
        name="Roasted Tea Crema",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/3EOw2r9RHJKf-LKupAUqZQ/258s.jpg"
    )

    teaspoon_items = [featured_item26, featured_item27, featured_item28, featured_item29, featured_item30]
    add_teaspoon_items = [db.session.add(teaspoon_item) for teaspoon_item in teaspoon_items]
    db.session.commit()

    # teatop business_id=7,
    featured_item31 = FeaturedItem(
        business_id=7,
        name="Earl Grey Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/gjluaQhkqtLeGOuWyiYrTg/258s.jpg"
    )
    featured_item32 = FeaturedItem(
        business_id=7,
        name="Sun Moon Lake Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/vnRn8VPkqG6TPv4q6jIAZw/258s.jpg"
    )
    featured_item33 = FeaturedItem(
        business_id=7,
        name="Alphine Green Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Vh7HyLX7_Fj70Eksyv_Ptg/258s.jpg"
    )
    featured_item34 = FeaturedItem(
        business_id=7,
        name="Brown Sugar Jasmine Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/rK717mo50fdf0nuIfz15pQ/258s.jpg"
    )
    featured_item35 = FeaturedItem(
        business_id=7,
        name="Taro Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/5HX1iyijfp2pJZN5ukmXTQ/258s.jpg"
    )

    teatop_items = [featured_item31, featured_item32, featured_item33, featured_item34, featured_item35]
    add_teatop_items = [db.session.add(teatop_item) for teatop_item in teatop_items]
    db.session.commit()

    # tiger business_id=8,
    featured_item36 = FeaturedItem(
        business_id=8,
        name="Roasted Oolong Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/UOnt1SSTUG3x96eIkTHAoQ/258s.jpg"
    )
    featured_item37 = FeaturedItem(
        business_id=8,
        name="Black Sugar Boba Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/lv8shJLprYye4uDjXzPRnA/258s.jpg"
    )
    featured_item38 = FeaturedItem(
        business_id=8,
        name="Plant Jasmine Milk Tra",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/gZ-DjkYGVWbj3UZG9qO4og/258s.jpg"
    )
    featured_item39 = FeaturedItem(
        business_id=8,
        name="Brown Sugar Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/bRRwQ3Hf8-bnFkce_H0pwg/258s.jpg"
    )
    featured_item40 = FeaturedItem(
        business_id=8,
        name="Strawberry Jasmine Green Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/pPUmG77EfX9s6R0DpKx1mA/258s.jpg"
    )

    tiger_items = [featured_item36, featured_item37, featured_item38, featured_item39, featured_item40]
    add_tiger_items = [db.session.add(tiger_item) for tiger_item in tiger_items]
    db.session.commit()

    # tptea business_id=9,
    featured_item41 = FeaturedItem(
        business_id=9,
        name="Qq Noodle",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/CgB_ml23V3vpk2D4__X3EQ/258s.jpg"
    )
    featured_item42 = FeaturedItem(
        business_id=9,
        name="Tie Guan Yin Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/tawfll3XByqLGydn4b_rNw/258s.jpg"
    )
    featured_item43 = FeaturedItem(
        business_id=9,
        name="Taiwan Classic Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/da1WIEkQ8X9RivpoXvdVpw/258s.jpg"
    )
    featured_item44 = FeaturedItem(
        business_id=9,
        name="Strawberry Milk Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/9IkXb_faA7ZjySxN4MUbdw/258s.jpg"
    )
    featured_item45 = FeaturedItem(
        business_id=9,
        name="Pearl Tie Guan Yin Tea Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/K4QpNXMNrM7usPnZ5nouBg/258s.jpg"
    )

    tptea_items = [featured_item41, featured_item42, featured_item43, featured_item44, featured_item45]
    add_tptea_items = [db.session.add(tptea_item) for tptea_item in tptea_items]
    db.session.commit()

    # yifang business_id=10,
    featured_item46 = FeaturedItem(
        business_id=10,
        name="Brown Sugar Pearl Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/tIdzo_cLRtg3MNgRibqdsQ/258s.jpg"
    )
    featured_item47 = FeaturedItem(
        business_id=10,
        name="Lychee Fruit Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/IlE9Z66Fr0OMyYBIfKOVAA/258s.jpg"
    )
    featured_item48 = FeaturedItem(
        business_id=10,
        name="Iced Kyoto Uji Matcha Latte",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/X9WGb116pn444bRfJgqYTA/258s.jpg"
    )
    featured_item49 = FeaturedItem(
        business_id=10,
        name="Mango Pomelo Sago",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/JWudjz4MZkqE-g0MkCa3WA/258s.jpg"
    )
    featured_item50 = FeaturedItem(
        business_id=10,
        name="Peach Fruit Tea",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/f5YDLg2fs9FiRviMTULU3A/258s.jpg"
    )

    yifang_items = [featured_item46, featured_item47, featured_item48, featured_item49, featured_item50]
    add_yifang_items = [db.session.add(yifang_item) for yifang_item in yifang_items]
    db.session.commit()


def undo_featured_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.featured_items RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM featured_items"))

  db.session.commit()
