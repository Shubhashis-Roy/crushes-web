import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import OnboardingFlow from "./components/onboard/OnboardingFlow";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* ✅ Default onboarding route */}
            <Route index element={<OnboardingFlow />} />

            {/* ✅ Authenticated main app routes */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} />

            {/* ✅ Redirect unknown routes */}
            <Route
              path="*"
              element={
                localStorage.getItem("onboardingDone") ? (
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
