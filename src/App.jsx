import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import OnboardingFlow from "./components/onboard/OnboardingFlow"; // ✅ import onboarding flow

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Wrap all routes inside Body */}
          <Route path="/" element={<Body />}>
            {/* ✅ FIRST screen: Onboarding flow */}
            <Route index element={<OnboardingFlow />} />

            {/* ✅ Login page (after onboarding or direct access) */}
            <Route path="login" element={<Login />} />

            {/* ✅ Other routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} />
            <Route path="feed" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
