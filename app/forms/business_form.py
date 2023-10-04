from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, URLField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


hours = [
    "12:00", "12:30",
    "1:00", "1:30",
    "2:00", "2:30",
    "3:00", "3:30",
    "4:00", "4:30",
    "5:00", "5:30",
    "6:00", "6:30",
    "7:00", "7:30",
    "8:00", "8:30",
    "9:00", "9:30",
    "10:00", "10:30",
    "11:00", "11:30"
    ]


class BusinessForm(FlaskForm):
    address = StringField("Address", validators=[DataRequired(), Length(min=2, message="Address must have at least 2 characters!")])
    city = StringField("City", validators=[DataRequired(), Length(min=2, message="City must have at least 2 characters!")])
    state = StringField("State", validators=[DataRequired(), Length(min=2, message="State must have at least 2 characters!")])
    name = StringField("Business Name", validators=[DataRequired(), Length(min=1, message="Business Name must have at least 1 character!")])
    type = StringField("Business Type", validators=[DataRequired()])
    price = IntegerField("Business Price Range", validators=[DataRequired(), NumberRange(min=1, max=3, message="Business Price Range must be an integer between 1 and 3!")])
    open_hours = SelectField("Business Open Hours", choices=hours, validators=[DataRequired()])
    close_hours = SelectField("Business Closing Hour", choices=hours, validators=[DataRequired()])
    image_url = URLField("Business Main Image", validators=[DataRequired()])
    description = StringField("Business Description", validators=[DataRequired()])
    submit = SubmitField("Create Business")