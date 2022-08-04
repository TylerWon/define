import { 
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import DefineTheme from "./theme/DefineTheme";

import Home from "./components/Home";
import Navbar from "./components/Navbar";

export default function App(props) {

  return (
    <DefineTheme>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dictionary/:word" element={<SearchResult />} /> */}

            {/* <Route element={<AuthorizedRoutes />}> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/settings/account" element={<AccountSettings />} /> */}
            {/* </Route> */}
          </Route>

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </DefineTheme>
  )
}
