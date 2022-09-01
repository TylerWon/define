import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import AccountSettings from "./components/AccountSettings";
import AuthorizedRoutes from "./components/Navigation/AuthorizedRoutes";
import ForgotMyPassword from "./components/ForgotMyPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navigation/Navbar";
import NotFound from "./components/NotFound";
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SearchResult from "./components/SearchResult";

import { getUser } from "./state/slices/userSlice";

export default function App(props) {
  // State
  const [loading, setLoading] = useState(true);

  // React Redux hooks
  const dispatch = useDispatch();

  // Dispatches the getUser action
  const dispatchGetUser = async (userId) => {
    try {
      await dispatch(getUser(userId)).unwrap();
    } catch(e) {
      // do nothing
    } finally {
      setLoading(false);
    }
  }

  // Effect: On initial render, get user info if previously logged in
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId !== null) dispatchGetUser(userId);
    else setLoading(false);
  }, [])

  return (
    <>
      {!loading ? 
        <BrowserRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/forgot-my-password" element={<ForgotMyPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/password-reset/:uid/:token" element={<PasswordReset />} />
              <Route path="/search/:word" element={<SearchResult />} />
              <Route path="/register" element={<Register />} />

              <Route element={<AuthorizedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/account/settings" element={<AccountSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      :
        null
      }
    </>
  )
}
