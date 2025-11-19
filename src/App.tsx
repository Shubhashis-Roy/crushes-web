import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/store";
// Pages
import Body from "@components/layout/Body";
import Feed from "@pages/feed/Feed";
import OnboardingFlow from "@pages/onboarding/OnboardingFlow";
import Login from "@pages/auth/Login";
import WelcomeStep from "@pages/onboarding/WelcomeStep";
import { PATH } from "@constants/path";
import Profile from "@pages/profile/Profile";
import Connections from "@pages/connection/Connections";
import Requests from "@pages/request/Requests";
import Chat from "@pages/chat/Chat";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<WelcomeStep />} />
            <Route path={PATH.ONBOARDING} element={<OnboardingFlow />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.FEED} element={<Feed />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.CONNECTION} element={<Connections />} />
            <Route path={PATH.REQUEST} element={<Requests />} />
            <Route path={PATH.CHAT} element={<Chat />} />
            {/* 
            <Route path="chat" element={<Chat />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
