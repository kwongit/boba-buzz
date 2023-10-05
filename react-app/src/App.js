import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { Businesses } from "./components/Businesses";
import { ManageBusinesses } from "./components/Businesses/ManageBusinesses";
import { ManageReviews } from "./components/Reviews/ManageReviews";
import { BusinessDetails } from "./components/Businesses/BusinessDetails";
import { CreateBusiness } from "./components/Businesses/CreateBusiness";
import { GetBusinessToUpdate } from "./components/Businesses/GetBusinessToUpdate";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Businesses />
          </Route>
          <Route exact path="/businesses/new">
            <CreateBusiness />
          </Route>
          <Route exact path="/businesses/current">
            <ManageBusinesses />
          </Route>
          <Route exact path="/reviews/current">
            <ManageReviews />
          </Route>
          <Route exact path="/businesses/:businessId">
            <BusinessDetails />
          </Route>
          <Route exact path="/businesses/:businessId/edit">
            <GetBusinessToUpdate />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
