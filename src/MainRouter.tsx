import { AnimatePresence, LayoutGroup } from "framer-motion";
import Progress from "pages/Progress";
import { lazy } from "react";
import { useLocation, Routes, Route, Outlet } from "react-router-dom";

const Account = lazy(() => import("pages/Account"));
const Home = lazy(() => import("pages/Home"));
const Schedule = lazy(() => import("pages/Schedule"));
const Diary = lazy(() => import("pages/Diary"));
const Manage = lazy(() => import("pages/Manage"));
const Plan = lazy(() => import("pages/Schedule/Plan"));
const ItemDetails = lazy(() => import("pages/Schedule/ItemDetails"));

export function MainRouter() {
  const location = useLocation();
  return (
    <AnimatePresence
      // Without mode=wait we get quicker transitions BUT the layout shifts around!
      mode="wait"
      initial={false} // Whether to play animations on the initial load
    >
      <LayoutGroup>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Outlet />}>
            <Route path="home" element={<Home />} />
            <Route path="schedule/:view" element={<Schedule />} />
            <Route path="schedule/week/plan" element={<Plan />} />
            <Route path="schedule/week/diary" element={<Diary />} />
            <Route path="schedule/item/:itemid" element={<ItemDetails />} />
            <Route path="schedule/item/:itemid/diary" element={<Diary />} />
            <Route path="manage" element={<Manage />} />
            <Route path="progress" element={<Progress />} />
            <Route path="/account/" element={<Account />} />
          </Route>
        </Routes>
      </LayoutGroup>
    </AnimatePresence>
  );
}
