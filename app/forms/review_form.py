from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    stars = IntegerField("Stars", validators=[DataRequired(), NumberRange(min=1, max=5, message="Star reviews must be between 1 and 5!")])
    review = StringField("Review", validators=[DataRequired(), Length(min=2, message="Review must have at least 2 characters!")])
    submit = SubmitField("Submit Review")
