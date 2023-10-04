from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review
from app.models.db import db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/current')
@login_required
def get_owned_reviews():
    """
    Get owned reviews by current user and return reviews dictionary
    """
    reviews = Review.query.all()
    owned_reviews = [review.to_dict() for review in reviews if review.user_id == current_user.id]

    return { "reviews": owned_reviews }


@review_routes.route('/<int:reviewId>', methods=["PUT"])
@login_required
def update_review(reviewId):
    """
    Route to update a review
    """
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    review_to_update = Review.query.get(reviewId)

    if review_to_update.user_id == current_user.id:
        if form.validate_on_submit():
            review_to_update.review = form.data["review"]
            review_to_update.stars = form.data["stars"]
            db.session.commit()
            return review_to_update.to_dict()
        else:
            print(form.errors)
            return { "errors": form.errors }, 400
    else:
        return { "message": "FORBIDDEN" }, 403


@review_routes.route("/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
    """
    Route to delete a review
    """
    review_to_delete = Review.query.get(reviewId)

    if review_to_delete:
        if review_to_delete.user_id == current_user.id:
            db.session.delete(review_to_delete)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403
    else:
        return { "message": "Review not found!" }, 404
