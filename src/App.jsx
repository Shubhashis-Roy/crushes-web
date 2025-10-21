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
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* ✅ Everything inside Body (includes NavBar + Footer) */}
          <Route path="/" element={<Body />}>
            {/* 🌟 Onboarding (Footer visible here) */}
            <Route index element={<OnboardingFlow />} />

            {/* 🌟 Login (no footer) */}
            <Route path="login" element={<Login />} />

            {/* 🌟 Main app routes (no footer) */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          {/* 🚨 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
