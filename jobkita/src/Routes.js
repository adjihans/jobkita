import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
const Homepage = lazy(() => import("./pages/Homepage"));
const JobCreate = lazy(() => import("./pages/JobCreate"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const JobList = lazy(() => import("./pages/JobList"));

export const siteMap = {
  HomePage: {
    title: "Home",
    path: "/",
    description: "Jobkita homepage",
  },
  JobListPage: {
    title: "JobList",
    path: "/job",
    description: "Jobkita job list page",
  },
  JobDetailPage: {
    title: "JobDetail",
    path: "/job/:id",
    description: "Jobkita job detail page",
  },
  PostJobPage: {
    title: "PostJob",
    path: "/create",
    description: "Jobkita create job page",
  },
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path={siteMap.JobListPage.path}>
        <Suspense fallback={<div>Loading</div>}>
          <JobList />
        </Suspense>
      </Route>
      <Route exact path={siteMap.JobDetailPage.path}>
        <Suspense fallback={<div>Loading</div>}>
          <JobDetail />
        </Suspense>
      </Route>
      <Route exact path={siteMap.PostJobPage.path}>
        <Suspense fallback={<div>Loading</div>}>
          <JobCreate />
        </Suspense>
      </Route>
      <Route exact path={siteMap.HomePage.path}>
        <Suspense fallback={<div>Loading</div>}>
          <Homepage />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default Routes;
