import { AnimatePresence, LayoutGroup } from "framer-motion";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import Progress from "pages/Progress";
import WorkoutRunner from "pages/Workout/WorkoutRunner";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Account = lazy(() => import("pages/Account"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Schedule = lazy(() => import("pages/Schedule"));
const Manage = lazy(() => import("pages/Schedule/Manage"));
const Wizard = lazy(() => import("pages/Wizard"));

const routesWithoutNavbar = ["/manage", "/workout"]

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
            <Route path="schedule" element={<Schedule />} />
            <Route path="manage" element={<Manage />} />
            <Route path="progress" element={<Progress />} />
            <Route path="wizard" element={<Wizard />} />
            <Route path="/account/" element={<Account />} />
            <Route path="/workout/:weekItemId/:weekItemWorkoutId" element={<WorkoutRunner />} />
          </Routes>
        </LayoutGroup>
      </AnimatePresence>
    </>
  );
}
