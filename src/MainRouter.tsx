import { AnimatePresence, LayoutGroup } from "framer-motion";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import Progress from "pages/Progress";
import { lazy } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

const Account = lazy(() => import("pages/Account"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Schedule = lazy(() => import("pages/Schedule"));
const Diary = lazy(() => import("pages/Diary"));
const Manage = lazy(() => import("pages/Manage"));
const Wizard = lazy(() => import("pages/Wizard"));

export function MainRouter() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/manage" && (<NavigationBar />)}
      <AnimatePresence
        // Without mode=wait we get quicker transitions BUT the layout shifts around!
        mode="wait"
        initial={false} // Whether to play animations on the initial load
      >
        <LayoutGroup>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Outlet />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="schedule/:view" element={<Schedule />} />
              <Route path="schedule/week/diary" element={<Diary />} />
              <Route path="schedule/item/:itemid/diary" element={<Diary />} />
              <Route path="manage" element={<Manage />} />
              <Route path="progress" element={<Progress />} />
              <Route path="wizard" element={<Wizard />} />
              <Route path="/account/" element={<Account />} />
            </Route>
          </Routes>
        </LayoutGroup>
      </AnimatePresence>
    </>
  );
}
