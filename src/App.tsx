import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/store";

import Body from "@components/Body";
import Feed from "@components/Feed";
import Profile from "@components/Profile";
import Connections from "@components/Connections";
import Requests from "@components/Requests";
import Chat from "@components/Chat";
import OnboardingFlow from "@components/onboard/OnboardingFlow";
import Login from "@components/Login";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<OnboardingFlow />} />

            <Route path="login" element={<Login />} />

            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
