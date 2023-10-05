from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"), ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    review = db.Column(db.String,nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships
    businesses = db.relationship("Business", back_populates = "reviews")
    users = db.relationship("User", back_populates = "reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'user_id': self.user_id,
            'review': self.review,
            'stars': self.stars,
            'business_name': self.businesses.name,
            'user': self.users.username,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
