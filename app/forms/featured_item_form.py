from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class FeaturedItemForm(FlaskForm):
  name = StringField("Featured Item Name", validators=[DataRequired()])
  image_url = FileField("Feature Item Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  submit = SubmitField("Create Featured Item")
