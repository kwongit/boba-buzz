from flask import Blueprint
from flask_login import current_user, login_required

from app.models import Business
from app.models.db import db

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
