from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, URLField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


hours = [
    "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM",
    "9:00 PM", "9:30 PM",
    "10:00 PM", "10:30 PM",
    "11:00 PM", "11:30 PM",
    "12:00 AM"
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
