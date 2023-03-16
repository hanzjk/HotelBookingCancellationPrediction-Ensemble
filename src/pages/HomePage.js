import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

// pages
import SinglePrediction from "./SinglePrediction";
import BatchPrediction from "./BatchPrediction";
import DashboardOverview from "./dashboard/DashboardOverview";
import AdminView from "./AdminView";
// components
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


const RouteWithSidebar = ({ component: Component, ...rest }) => {
 

  return (
    <Route {...rest} render={props => (
      <>
        <Sidebar />

        <main className="content">
          <Component {...props} />
          <Footer />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    {/* pages */}

    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      path={Routes.SinglePrediction.path}
      component={SinglePrediction}
    />
    <RouteWithSidebar
      exact
      path={Routes.BatchPrediction.path}
      component={BatchPrediction}
    />
    <RouteWithSidebar
      exact
      path={Routes.Admin.path}
      component={AdminView}
    />
  </Switch>
);
