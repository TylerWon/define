import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import AuthorizedRoutes from "./components/Navigation/AuthorizedRoutes";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navigation/Navbar";
import NotFound from "./components/NotFound";
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
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search/:word" element={<SearchResult />} />

              <Route element={<AuthorizedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/settings/account" element={<AccountSettings />} /> */}
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
