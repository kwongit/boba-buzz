from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    stars = IntegerField("Stars", validators=[DataRequired()])
    review = StringField("Review", validators=[DataRequired(), Length(min=2, message="Review must have at least 2 characters!")])
    submit = SubmitField("Submit Review")
