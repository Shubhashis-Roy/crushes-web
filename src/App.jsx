import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

// 🧭 Components
import Body from "./components/Body";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import OnboardingFlow from "./components/onboard/OnboardingFlow";
import Login from "./components/Login";

function App() {
  const onboardingDone = localStorage.getItem("onboardingDone");
  const user = localStorage.getItem("user");

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* 🌟 App shell with Navbar + Footer */}
          <Route path="/" element={<Body />}>
            {/* ✅ Default route: Onboarding or Feed */}
            <Route
              index
              element={
                onboardingDone || user ? (
                  <Navigate to="/feed" replace />
                ) : (
                  <OnboardingFlow />
                )
              }
            />

            {/* ✅ Authenticated routes */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} />

            {/* ✅ Login route (separate for returning users) */}
            <Route path="login" element={<Login />} />

            {/* ✅ Fallback redirect */}
            <Route
              path="*"
              element={
                onboardingDone || user ? (
                  <Navigate to="/feed" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
