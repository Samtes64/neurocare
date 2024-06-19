import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DoneTasks from "./pages/DoneTasks";
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
// import Profile from "./pages/Therapist/Profile";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import Therapists from "./pages/Therapists";
import TherapistAuthentication from "./pages/TherapistAuthentication";
import TherapistProfile from "./pages/TherapistProfile";

import TherapistDashboard from "./pages/Therapist/TherapistDashboard";
import MyPatients from "./pages/Therapist/MyPatients";
import ChatsPage from "./pages/ChatPage";
import ApproveTherapist from "./pages/Admin/ApproveTherapist";
import AllPatients from "./pages/Admin/AllPatients";
import AllTherapists from "./pages/Admin/AllTherapists";
import WaitingForApproval from "./pages/WaitingForApproval";

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
  height: 100%;
  scroll: auto;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser, userinfo } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />

            <Routes>
              {currentUser.userType === "patient" && (
                <>
                  <Route path="/" exact element={<Dashboard />} />
                  <Route path="/donetasks" exact element={<DoneTasks />} />
                  <Route path="/todos" exact element={<Todos />} />
                  {/* <Route path="/chat/*" element={<DashboardLayout />}>
                    <Route index element={<GeneralApp />} />
                    <Route path="group" element={<Group />} />
                    <Route path="call" element={<Call />} />

                    <Route path="404" element={<Page404 />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Route> */}

                  <Route path="/chat" exact element={<ChatsPage />} />
                  <Route path="/settings" exact element={<Settings />} />
                  <Route path="/profile" exact element={<Profile />} />
                  <Route path="/therapist" exact element={<Therapists />} />
                  <Route path="/therapist/:id" element={<TherapistProfile />} />
                  <Route path="/assessment" exact element={<Assessment />} />
                </>
              )}
            </Routes>
            <Routes>
              {currentUser.userType === "therapist" ? (
                userinfo.therapistApprovalStatus === "Approved" ? (
                  <>
                    <Route path="/" exact element={<TherapistDashboard />} />
                    <Route path="/patients" exact element={<MyPatients />} />
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/chat" exact element={<ChatsPage />} />
                  </>
                ) : (
                  <>
                  <Route path="*" element={<WaitingForApproval />} />
                  <Route path="/profile" exact element={<Profile />} />
                  </>
                )
              ) : (
                // Add routes for other user types here
                <Route path="*" element={<div>Access Denied</div>} />
              )}
            </Routes>
            <Routes>
              {currentUser.userType === "admin" && (
                <>
                  {/* <Route path="/" exact element={<TherapistDashboard />} /> */}
                  <Route path="/approve" exact element={<ApproveTherapist />} />
                  <Route path="/" exact element={<AllPatients />} />
                  <Route path="/therapist" exact element={<AllTherapists />} />
                  {/* <Route path="/chat" exact element={<ChatsPage />} />  */}
                </>
              )}
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
              <Route
                path="/therapistsignup"
                exact
                element={<TherapistAuthentication loginProp={true} />}
              />

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
