from flask import Blueprint
from flask_login import login_required, current_user
from app.models import FeaturedItem
from app.models.db import db
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


# /api/featuredItems/featuredItemId
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
