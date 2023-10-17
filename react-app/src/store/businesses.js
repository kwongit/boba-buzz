// TYPE CONSTANTS

const GET_BUSINESSES = "businesses/getBusinesses";
const GET_BUSINESS = "businesses/getBusiness";
const CREATE_BUSINESS = "businesses/createBusiness";
const UPDATE_BUSINESS = "businesses/updateBusiness";
const DELETE_BUSINESS = "businesses/deleteBusiness";

// ACTION CREATORS

const getBusinesses = (businesses) => {
  return {
    type: GET_BUSINESSES,
    businesses,
  };
};

const getBusiness = (business) => {
  return {
    type: GET_BUSINESS,
    business,
  };
};

const updateBusiness = (business) => {
  return {
    type: UPDATE_BUSINESS,
    business,
  };
};

const deleteBusiness = (businessId) => {
  return {
    type: DELETE_BUSINESS,
    businessId,
  };
};

// THUNK ACTION CREATORS

export const thunkGetBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/businesses");

  if (res.ok) {
    const businesses = await res.json();
    dispatch(getBusinesses(businesses));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetBusinessInfo = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    dispatch(getBusiness(business));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkCreateBusiness = (business, user) => async (dispatch) => {
  const res = await fetch("/api/businesses/", {
    method: "POST",
    body: business,
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetUserBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/businesses/current");

  if (res.ok) {
    const businesses = await res.json();
    dispatch(getBusinesses(businesses));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateBusiness =
  (business, businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
      method: "PUT",
      body: business,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateBusiness(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  dispatch(deleteBusiness(businessId));
  return res;
};

// REDUCERS
const initialState = { allBusinesses: {}, singleBusiness: {} };

const businessesReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_BUSINESSES:
      newState = { ...state, allBusinesses: {} };
      action.businesses.businesses.forEach((business) => {
        newState.allBusinesses[business.id] = business;
      });
      return newState;

    case GET_BUSINESS:
      newState = { ...state, singleBusiness: {} };
      newState.singleBusiness = action.business;
      return newState;

    case CREATE_BUSINESS:
      newState = {
        ...state,
        allBusinesses: { ...state.allBusinesses },
        singleBusiness: { ...action.business },
      };
      newState.allBusinesses[action.business.id] = action.business;
      return newState;

    case UPDATE_BUSINESS:
      newState = {
        ...state,
        allBusinesses: {},
        singleBusiness: { ...state.singleBusiness },
      };
      newState.singleBusiness = {
        ...newState.singleBusiness,
        ...action.business,
      };
      return newState;

    case DELETE_BUSINESS:
      newState = {
        ...state,
        allBusinesses: { ...state.allBusinesses },
        singleBusiness: {},
      };
      delete newState.allBusinesses[action.businessId];
      return newState;

    default:
      return state;
  }
};

export default businessesReducer;
