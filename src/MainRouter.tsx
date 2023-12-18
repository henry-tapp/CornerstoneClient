import { AnimatePresence, LayoutGroup } from "framer-motion";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import Progress from "pages/Progress";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Account = lazy(() => import("pages/Account"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const WeekView = lazy(() => import("pages/WeekView"));
const WorkoutDetails = lazy(() => import("pages/WorkoutDetails"));
const WorkoutRunner = lazy(() => import("pages/WorkoutRunner"));
const Schedule = lazy(() => import("pages/Schedule"));
const Wizard = lazy(() => import("pages/Wizard"));

const routesWithoutNavbar = ["/schedule", "/workout"]

export function MainRouter() {
  const location = useLocation();

  return (
    <>
      {!routesWithoutNavbar.some(x => location.pathname.startsWith(x)) && (<NavigationBar />)}
      <AnimatePresence
        // Without mode=wait we get quicker transitions BUT the layout shifts around!
        mode="wait"
        initial={false} // Whether to play animations on the initial load
      >
        <LayoutGroup>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="weekview" element={<WeekView />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="workout/:weekItemId/:weekItemWorkoutId" element={<WorkoutDetails />} />
            <Route path="workout/runner/:weekItemId/:weekItemWorkoutId" element={<WorkoutRunner />} />
            <Route path="progress" element={<Progress />} />
            <Route path="wizard" element={<Wizard />} />
            <Route path="/account/" element={<Account />} />
          </Routes>
        </LayoutGroup>
      </AnimatePresence>
    </>
  );
}
