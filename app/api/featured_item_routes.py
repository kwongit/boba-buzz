from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import FeaturedItem
from app.forms.featured_item_form import FeaturedItemForm
from app.models.db import db
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

featured_item_routes = Blueprint('featured_item', __name__)


@featured_item_routes.route('/')
def get_all_featured_items():
  """
  Gets all featured items
  """
  featured_items = FeaturedItem.query.all()

  all_featured_items_list = [featured_item.to_dict() for featured_item in featured_items]

  return { "featured_items": all_featured_items_list}


@featured_item_routes.route('/<int:id>')
def get_all_featured_item_by_id(id):
  """
  Get featured item by id
  """
  featured_item = FeaturedItem.get(id).to_dict()

  if not featured_item:
    return { "message": "Featured item was not found!"}, 404

  return featured_item


@featured_item_routes.route('/', methods=['POST'])
@login_required
def create_featured_item():
  """
  Route to create a featured item
  """
  form = FeaturedItemForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    image = form.data["image_url"]
    image.filename = get_unique_filename(image.filename)

    # Upload the image to S3
    upload = upload_file_to_s3(image)
    print(upload)

    if 'url' not in upload:
        return { "errors": "Error uploading image to S3" }, 400

    # Use the S3 URL
    image_url = upload['url']

    new_featured_item = FeaturedItem(
      name=form.data["name"],
      # Use the S3 URL
      image_url=image_url,
    )

    db.session.add(new_featured_item)
    db.session.commit()
    return form.to_dict(), 201

  if form.errors:
    print(form.errors)
    return { "errors": form.errors }, 400


@featured_item_routes.route('/<int:featuredItemId>', methods=['PUT'])
@login_required
def update_featured_item(featuredItemId):
  """
  Route to update a featured item
  """
  form = FeaturedItemForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  featured_item_to_update = FeaturedItem.query.get(featuredItemId)

  if featured_item_to_update.owner_id == current_user.id:
    # Delete associated S3 files
    remove_file_from_s3(featured_item_to_update.image_url)

    if form.validate_on_submit():
      image = form.data["image_url"]
      image.filename = get_unique_filename(image.filename)

      # Upload the image to S3
      upload = upload_file_to_s3(image)
      print(upload)

      if 'url' not in upload:
          return { "errors": "Error uploading image to S3" }, 400

      # Use the S3 URL
      image_url = upload['url']

      featured_item_to_update.name = form.data["name"]
      featured_item_to_update.image_url = image_url

      db.session.commit()
      return featured_item_to_update.to_dict()
    else:
      print(form.errors)
      return { "errors": form.errors }, 400
  else:
    return { "message": "FORBIDDEN"}, 403


@featured_item_routes.route('/<int:featuredItemId>', methods=['DELETE'])
@login_required
def delete_featured_item(featuredItemId):
  """
  Route to delete a featured item and associated S3 files
  """
  featured_item_to_delete = FeaturedItem.query.get(featuredItemId)

  if featured_item_to_delete:
    if featured_item_to_delete.owner_id == current_user.id:
      # Delete associated S3 files
      remove_file_from_s3(featured_item_to_delete.image_url)

      # Delete the featured item from the database
      db.session.delete(featured_item_to_delete)
      db.session.commit()
      return { "message": "Delete successful!" }
    else:
      return { "message": "FORBIDDEN"}, 403
  else:
    return { "message": "Featured item not found!"}, 404
