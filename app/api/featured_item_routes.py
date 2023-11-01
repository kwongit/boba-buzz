from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import FeaturedItem, Business
from app.models.db import db
from app.forms.featured_item_form import FeaturedItemForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

featured_item_routes = Blueprint('featured_item', __name__)


# /api/featuredItems/featuredItemId
@featured_item_routes.route('/<int:featuredItemId>')
def get_featured_item_by_id(featuredItemId):
  """
  Get featured item by featuredItemId
  """
  featured_item = FeaturedItem.query.get(featuredItemId)

  if not featured_item:
    return { "message": "Featured item was not found!"}, 404

  return featured_item.to_dict()


# /api/featuredItems/featuredItemId/edit
@featured_item_routes.route('/<int:featuredItemId>/edit', methods=['PUT'])
@login_required
def update_featured_item(featuredItemId):
  """
  Route to update a featured item
  """
  form = FeaturedItemForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  featured_item_to_update = FeaturedItem.query.get(featuredItemId)

  if featured_item_to_update:
    target_business = Business.query.get(featured_item_to_update.business_id)
    if target_business.owner_id == current_user.id:
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


# /api/featuredItems/featuredItemId
@featured_item_routes.route('/<int:featuredItemId>', methods=['DELETE'])
@login_required
def delete_featured_item(featuredItemId):
  """
  Route to delete a featured item and associated S3 files
  """
  featured_item_to_delete = FeaturedItem.query.get(featuredItemId)

  if featured_item_to_delete:
    target_business = Business.query.get(featured_item_to_delete.business_id)
    if target_business.owner_id == current_user.id:
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
