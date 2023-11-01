import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetFeaturedItemInfo } from "../../store/featuredItems";
import { UpdateFeaturedItem } from "./UpdateFeaturedItem";

export const GetFeaturedItemToUpdate = () => {
  const dispatch = useDispatch();

  const { featuredItemId } = useParams();

  const oneFeaturedItem = useSelector(
    (state) => state.featuredItems.singleFeaturedItem
  );

  useEffect(() => {
    dispatch(thunkGetFeaturedItemInfo(featuredItemId));
  }, [dispatch, featuredItemId]);

  if (!oneFeaturedItem.id) return null;

  return (
    <>
      <UpdateFeaturedItem featuredItem={oneFeaturedItem} />
    </>
  );
};
