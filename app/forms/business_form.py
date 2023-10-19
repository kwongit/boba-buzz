from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, IntegerField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


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
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    name = StringField("Business Name", validators=[DataRequired()])
    type = StringField("Business Type", validators=[DataRequired()])
    price = IntegerField("Business Price Range", validators=[DataRequired()])
    open_hours = SelectField("Business Open Hours", choices=hours, validators=[DataRequired()])
    close_hours = SelectField("Business Closing Hour", choices=hours, validators=[DataRequired()])
    image_url = FileField("Business Main Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Business Description", validators=[DataRequired()])
    submit = SubmitField("Create Business")
