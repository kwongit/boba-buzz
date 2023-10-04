from flask import Blueprint, request
from flask_login import current_user, login_required
from datetime import date
from app.models import Business
from app.models.db import db
from app.forms.business_form import BusinessForm

business_routes = Blueprint('business', __name__)


@business_routes.route('/')
def get_all_businesses():
    """
    Get all businesses and return businesses dictionary
    """
    businesses = Business.query.all()
    all_business_list = [business.to_dict() for business in businesses]

    return { "businesses": all_business_list}


@business_routes.route('/<int:id>')
def get_business_by_id(id):
    """
    Get business by business id
    """
    business = Business.query.get(id).to_dict()
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
    owned_businesses = [ business.to_dict() for business in businesses if business.owner_id == current_user.id ]

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
            image_url=form.data["image_url"],
            description=form.data["description"],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict(), 201

    else:
        print(form.errors)
        return { "errors": form.errors }, 400
