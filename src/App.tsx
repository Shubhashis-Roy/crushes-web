import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/store";

import Body from "@components/layout/Body";
import Feed from "@pages/feed/Feed";
import Profile from "@components/Profile";
import Connections from "@components/Connections";
import Requests from "@components/Requests";
import Chat from "@components/Chat";
import OnboardingFlow from "@pages/onboarding/OnboardingFlow";
import Login from "@pages/auth/Login";
import WelcomeStep from "@pages/onboarding/WelcomeStep";
import { PATH } from "@constants/path";

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

            {/* <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
