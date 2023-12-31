// TYPE CONSTANTS

const GET_REVIEWS = "reviews/getReviews";
const GET_REVIEW = "reviews/getReview";
const CREATE_REVIEW = "reviews/createReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";

// ACTION CREATORS

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// THUNK ACTION CREATORS

export const thunkGetReviews = () => async (dispatch) => {
  const res = await fetch("/api/reviews");

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetUserReviews = () => async (dispatch) => {
  const res = await fetch("/api/reviews/current");

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetBusinessReviews = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkCreateReview = (review, businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(thunkGetBusinessReviews(businessId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateReview = (review, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateReview(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  dispatch(deleteReview(reviewId));
  return res;
};

// REDUCERS

const initialState = { allReviews: {}, singleReview: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state, allReviews: {} };
      action.reviews.forEach((review) => {
        newState.allReviews[review.id] = review;
      });
      return newState;

    case GET_REVIEW:
      newState = { ...state, review: {} };
      newState.review = action.review;
      return newState;

    case CREATE_REVIEW:
      newState = {
        ...state,
        allReviews: { ...state.allReviews },
        singleReview: { ...action.review },
      };
      newState.allReviews[action.review.id] = action.review;
      return newState;

    case UPDATE_REVIEW:
      newState = {
        ...state,
        allReviews: {},
        singleReview: { ...state.singleReview },
      };
      newState.singleReview = {
        ...newState.singleReview,
        ...action.review,
      };
      return newState;

    case DELETE_REVIEW:
      newState = {
        ...state,
        allReviews: { ...state.allReviews },
        singleReview: {},
      };
      delete newState.allReviews[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
