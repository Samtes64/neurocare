import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Homepage from "./pages/Hero";
import Assessment from "./pages/Assessment";
import DashboardLayout from "./chatting/layouts/dashboard";
import Page404 from "./chatting/pages/Page404";
import { Suspense, lazy } from "react";
import LoadingScreen from "./chatting/components/LoadingScreen";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import Group from "./chatting/pages/dashboard/Group";
import Call from "./chatting/pages/dashboard/Call";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(
  lazy(() => import("../src/chatting/pages/dashboard/GeneralApp"))
);
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />

            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/chat/*" element={<DashboardLayout />}>
                <Route index element={<GeneralApp />} />
                <Route path="group" element={<Group />} />
                <Route path="call" element={<Call />} />

                <Route path="404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>
              <Route path="/settings" exact element={<Settings />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Routes>
              {/* Redirect all routes to the homepage */}
              <Route path="/*" element={<Homepage />} />
              {/* Define other routes here if needed */}
              <Route
                path="/login"
                exact
                element={<Authentication loginProp={false} />}
              />
              <Route
                path="/signup"
                exact
                element={<Authentication loginProp={true} />}
              />
              <Route path="/assessment" exact element={<Assessment />} />
              <Route path="/forgotpassword" exact element={<ResetPassword />} />
              <Route path="/newpassword" exact element={<NewPassword />} />
            </Routes>
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
