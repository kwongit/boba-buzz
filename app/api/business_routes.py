from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Business, FeaturedItem, Review
from app.models.db import db
from app.forms.business_form import BusinessForm
from app.forms.featured_item_form import FeaturedItemForm
from app.forms.review_form import ReviewForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

business_routes = Blueprint('business', __name__)


@business_routes.route('/')
def get_all_businesses():
    """
    Get all businesses and return businesses dictionary
    """
    businesses = Business.query.all()
    reviews = Review.query.all()

    all_business_list = [business.to_dict() for business in businesses]
    all_review_list = [review.to_dict() for review in reviews]

    for business in all_business_list:
        business_reviews = [ review for review in all_review_list if review["business_id"] == business["id"]]

        total_stars = 0

        for review in business_reviews:
            total_stars += review["stars"]

        if total_stars > 0:
            avg_rating = total_stars / len(business_reviews)
            business["avg_rating"] = avg_rating
            business["num_reviews"] = len(business_reviews)

    return { "businesses": all_business_list }


@business_routes.route('/<int:id>')
def get_business_by_id(id):
    """
    Get business by business id
    """
    business = Business.query.get(id).to_dict()
    reviews = Review.query.all()

    all_review_list = [review.to_dict() for review in reviews]

    business_reviews = [ review for review in all_review_list if review["business_id"] == business["id"]]

    total_stars = 0

    for review in business_reviews:
        total_stars += review["stars"]

    if total_stars > 0:
        avg_rating = total_stars / len(business_reviews)
        business["avg_rating"] = avg_rating
        business["num_reviews"] = len(business_reviews)

    if not business:
        return { "message": "Business was not found!" }, 404

    return business


@business_routes.route('/current')
@login_required
def get_owned_businesses():
    """
    Get owned businesses by current user and return businesses dictionary
    """
    businesses = Business.query.all()
    reviews = Review.query.all()

    owned_businesses = [ business.to_dict() for business in businesses if business.owner_id == current_user.id ]

    all_review_list = [review.to_dict() for review in reviews]

    for business in owned_businesses:
        business_reviews = [ review for review in all_review_list if review["business_id"] == business["id"]]

        total_stars = 0

        for review in business_reviews:
            total_stars += review["stars"]

        if total_stars > 0:
            avg_rating = total_stars / len(business_reviews)
            business["avg_rating"] = avg_rating
            business["num_reviews"] = len(business_reviews)

    return { "businesses": owned_businesses }


@business_routes.route('/', methods=["POST"])
@login_required
def create_business():
    """
    Route to create a new business
    """
    form = BusinessForm()
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

        new_business = Business(
            owner_id = current_user.id,
            address = form.data["address"],
            city = form.data["city"],
            state = form.data["state"],
            name = form.data["name"],
            type = form.data["type"],
            price = form.data["price"],
            open_hours = form.data["open_hours"],
            close_hours = form.data["close_hours"],
            # Use the S3 URL
            image_url = image_url,
            description = form.data["description"]
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict(), 201

    if form.errors:
        print(form.errors)
        return { "errors": form.errors }, 400


@business_routes.route("/<int:businessId>", methods=["PUT"])
@login_required
def update_business(businessId):
    """
    Route to update a business
    """
    form = BusinessForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    business_to_update = Business.query.get(businessId)

    if business_to_update.owner_id == current_user.id:
        # Delete associated S3 files
        remove_file_from_s3(business_to_update.image_url)

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

            business_to_update.address = form.data["address"]
            business_to_update.city = form.data["city"]
            business_to_update.state = form.data["state"]
            business_to_update.name = form.data["name"]
            business_to_update.type = form.data["type"]
            business_to_update.price = form.data["price"]
            business_to_update.open_hours = form.data["open_hours"]
            business_to_update.close_hours = form.data["close_hours"]
            business_to_update.image_url = image_url
            business_to_update.description = form.data["description"]

            db.session.commit()
            return business_to_update.to_dict()
        else:
            print(form.errors)
            return { "errors": form.errors }, 400
    else:
        return { "message": "FORBIDDEN" }, 403


@business_routes.route("/<int:businessId>", methods=["DELETE"])
@login_required
def delete_business(businessId):
    """
    Route to delete a business and associated S3 files
    """
    business_to_delete = Business.query.get(businessId)

    if business_to_delete:
        if business_to_delete.owner_id == current_user.id:
            # Delete associated S3 files
            remove_file_from_s3(business_to_delete.image_url)

            # Delete the restaurant from the database
            db.session.delete(business_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403
    else:
        return { "message": "Business not found!" }, 404


@business_routes.route('/<int:businessId>/featuredItems')
def get_business_featured_items(businessId):
  """
  Gets all featured items for a specific business
  """
  featured_items = FeaturedItem.query.all()

  featured_items_list = [featured_item.to_dict() for featured_item in featured_items if featured_item.business_id == businessId]

  return featured_items_list


@business_routes.route('/<int:businessId>/createFeaturedItem', methods=['POST'])
@login_required
def create_featured_item(businessId):
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
      business_id = businessId,
      name = form.data["name"],
      # Use the S3 URL
      image_url = image_url,
    )

    db.session.add(new_featured_item)
    db.session.commit()
    return new_featured_item.to_dict(), 201

  else:
    print(form.errors)
    return { "errors": form.errors }, 400


@business_routes.route('/<int:businessId>/reviews')
def get_business_reviews(businessId):
    """
    Get all reviews by businessId and return businesses dictionary
    """
    reviews = Review.query.all()
    business_reviews = [review.to_dict() for review in reviews if review.business_id == businessId]

    return business_reviews


@business_routes.route('/<int:businessId>', methods=["POST"])
@login_required
def create_review(businessId):
    """
    Route to create a new review by businessId
    """
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            business_id = businessId,
            user_id = current_user.id,
            review = form.data["review"],
            stars = form.data["stars"]
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    else:
        print(form.errors)
        return { "errors": form.errors }, 400
