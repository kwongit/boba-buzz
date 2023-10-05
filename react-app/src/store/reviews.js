import { csrfFetch } from "./csrf";

// TYPE CONSTANTS

const GET_REVIEWS = "reviews/getReviews";
const GET_REVIEW = "reviews/getReview";

// ACTION CREATORS

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const getReview = (review) => {
  return {
    type: GET_REVIEW,
    review,
  };
};

// THUNK ACTION CREATORS

export const thunkGetReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews");

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetReviewInfo = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`);

  if (res.ok) {
    const review = await res.json();
    dispatch(getReview(review));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetUserReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews/current");

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
  const res = await csrfFetch(`/api/businesses/${businessId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
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

    default:
      return state;
  }
};

export default reviewsReducer;
