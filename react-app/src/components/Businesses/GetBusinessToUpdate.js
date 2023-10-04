import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { UpdateBusiness } from "./UpdateBusiness";

export const GetBusinessToUpdate = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const oneBusiness = useSelector((state) => state.businesses.singleBusiness);

  useEffect(() => {
    dispatch(thunkGetBusinessInfo(businessId));
  }, [businessId, dispatch]);

  if (!oneBusiness.id) return null;

  return (
    <>
      <UpdateBusiness formType="UpdateBusiness" business={oneBusiness} />
    </>
  );
};
