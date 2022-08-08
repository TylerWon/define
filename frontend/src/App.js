import { 
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import DefineTheme from "./theme/DefineTheme";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SearchResult from "./components/SearchResult";

export default function App(props) {

  return (
    <DefineTheme>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search/:word" element={<SearchResult />} />

            {/* <Route element={<AuthorizedRoutes />}> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/settings/account" element={<AccountSettings />} /> */}
            {/* </Route> */}
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </DefineTheme>
  )
}
