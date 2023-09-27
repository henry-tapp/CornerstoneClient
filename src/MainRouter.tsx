import { AnimatePresence, LayoutGroup } from "framer-motion";
import Progress from "pages/Progress";
import { lazy } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const Account = lazy(() => import("pages/Account"));
const Log = lazy(() => import("pages/Log/WeekView"));
const Diary = lazy(() => import("pages/Diary"));
const Manage = lazy(() => import("pages/Manage"));
const Plan = lazy(() => import("pages/Log/Plan"));
const ItemDetails = lazy(() => import("pages/Manage/ItemDetails"));

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
          <Route path="/home" element={<Home />} />
          <Route path="week/:currentWeek" element={<Log />} />
          <Route path="week/manage" element={<Manage />} />
          <Route path="week/:currentWeek/plan" element={<Plan />} />
          <Route path="week/diary" element={<Diary />} />
          <Route path="week/:currentWeek/item/:itemid" element={<ItemDetails />} />
          <Route path="progress" element={<Progress />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </LayoutGroup>
    </AnimatePresence>
  );
}
