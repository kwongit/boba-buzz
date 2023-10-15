from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Business, Review
from app.models.db import db
from app.forms.business_form import BusinessForm
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
        # Check if an image file was uploaded
        if 'image_url' in request.files:
            image = request.files['image_url']
            image.filename = get_unique_filename(image.filename)

            # Upload the image to S3
            upload = upload_file_to_s3(image)

            if 'url' not in upload:
                return { "errors": "Error uploading image to S3" }, 400

            image_url = upload['url']  # Use the S3 URL

            new_business = Business(
                owner_id=current_user.id,
                address=form.data["address"],
                city=form.data["city"],
                state=form.data["state"],
                name=form.data["name"],
                type=form.data["type"],
                price=form.data["price"],
                open_hours=form.data["open_hours"],
                close_hours=form.data["close_hours"],
                image_url=image_url,  # Use the S3 URL
                description=form.data["description"]
            )

            db.session.add(new_business)
            db.session.commit()

            return new_business.to_dict(), 201
        else:
            return { "errors": "No image file provided" }, 400
    else:
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
        if form.validate_on_submit():
            business_to_update.address = form.data["address"]
            business_to_update.city = form.data["city"]
            business_to_update.state = form.data["state"]
            business_to_update.name = form.data["name"]
            business_to_update.type = form.data["type"]
            business_to_update.price = form.data["price"]
            business_to_update.open_hours = form.data["open_hours"]
            business_to_update.close_hours = form.data["close_hours"]
            business_to_update.image_url = form.data["image_url"]
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
    Route to delete a business
    """
    business_to_delete = Business.query.get(businessId)

    if business_to_delete:
        if business_to_delete.owner_id == current_user.id:
            db.session.delete(business_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403
    else:
        return { "message": "Business not found!" }, 404


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
            business_id=businessId,
            user_id=current_user.id,
            review=form.data["review"],
            stars=form.data["stars"]
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    else:
        print(form.errors)
        return { "errors": form.errors }, 400
