// TYPE CONSTANTS

const GET_FEATURED_ITEMS = "featuredItems/getFeaturedItems";
const GET_FEATURED_ITEM = "featuredItems/getFeaturedItem";
const UPDATE_FEATURED_ITEM = "featuredItems/updateFeaturedItem";
const DELETE_FEATURED_ITEM = "featuredItems/deleteFeaturedItem";

// ACTION CREATORS

const getFeaturedItems = (featuredItems) => {
  return {
    type: GET_FEATURED_ITEMS,
    featuredItems,
  };
};

const getFeaturedItem = (featuredItem) => {
  return {
    type: GET_FEATURED_ITEM,
    featuredItem,
  };
};

const updateFeaturedItem = (featuredItem) => {
  return {
    type: UPDATE_FEATURED_ITEM,
    featuredItem,
  };
};

const deleteFeaturedItem = (featuredItemId) => {
  return {
    type: DELETE_FEATURED_ITEM,
    featuredItemId,
  };
};

// THUNK ACTION CREATORS

export const thunkGetFeaturedItems = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}/featuredItems`);
  if (res.ok) {
    const featuredItems = await res.json();
    dispatch(getFeaturedItems(featuredItems));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetFeaturedItemInfo =
  (featuredItemId) => async (dispatch) => {
    const res = await fetch(`/api/featuredItems/${featuredItemId}`);
    if (res.ok) {
      const featuredItem = await res.json();
      dispatch(getFeaturedItem(featuredItem));
      return res;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const thunkCreateFeaturedItem =
  (featuredItem, businessId) => async (dispatch) => {
    const res = await fetch(
      `/api/businesses/${businessId}/createFeaturedItem`,
      {
        method: "POST",
        body: featuredItem,
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

// export const thunkUpdateFeaturedItem =
//   (featuredItem, featuredItemId) => async (dispatch) => {
//     const res = await fetch(`/api/featuredItems/${featuredItemId}`, {
//       method: "PUT",
//       body: featuredItem,
//     });
//     if (res.ok) {
//       const data = await res.json();
//       return data;
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   };

export const thunkUpdateFeaturedItem =
  (featuredItem, featuredItemId) => async (dispatch) => {
    const res = await fetch(`/api/featuredItems/${featuredItemId}/edit`, {
      method: "PUT",
      body: featuredItem,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateFeaturedItem(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const thunkDeleteFeaturedItem = (featuredItemId) => async (dispatch) => {
  const res = await fetch(`/api/featuredItems/${featuredItemId}`, {
    method: "DELETE",
  });

  dispatch(deleteFeaturedItem(featuredItemId));
  return res;
};

// REDUCERS

const initialState = { allFeaturedItems: {}, singleFeaturedItem: {} };

const featuredItemsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_FEATURED_ITEMS:
      newState = { ...state, allFeaturedItems: {} };
      action.featuredItems.forEach((featuredItem) => {
        newState.allFeaturedItems[featuredItem.id] = featuredItem;
      });
      return newState;

    case GET_FEATURED_ITEM:
      newState = { ...state, singleFeaturedItem: {} };
      newState.singleFeaturedItem = action.featuredItem;
      return newState;

    case UPDATE_FEATURED_ITEM:
      newState = {
        ...state,
        allFeaturedItems: {},
        singleFeaturedItem: { ...state.singleFeaturedItem },
      };
      newState.singleFeaturedItem = {
        ...newState.singleFeaturedItem,
        ...action.featuredItem,
      };
      return newState;

    case DELETE_FEATURED_ITEM:
      newState = {
        ...state,
        allFeaturedItems: { ...state.allFeaturedItems },
        singleFeaturedItem: {},
      };
      delete newState.allFeaturedItems[action.featuredItemId];
      return newState;

    default:
      return state;
  }
};

export default featuredItemsReducer;
