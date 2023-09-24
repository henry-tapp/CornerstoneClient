import { AnimatePresence, LayoutGroup } from "framer-motion";
import { Index } from "pages/Home";
import Progress from "pages/Progress";
import { lazy } from "react";
import { useLocation, Routes, Route, Outlet } from "react-router-dom";

const Diary = lazy(() => import("pages/Diary"));
const Manage = lazy(() => import("pages/Manage"));
const Schedule = lazy(
  () => import("pages/Schedule")
);

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
          <Route path="/home" element={<Outlet />}>
            <Route index element={<Index />} />
            <Route path="manage" element={<Manage />} />
            <Route path="schedule/*" element={<Schedule />} />
            <Route path="diary/*" element={<Diary />} />
          </Route>
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </LayoutGroup>
    </AnimatePresence>
  );
}
