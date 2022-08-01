import { 
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

export default function App(props) {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />

          <Route element={<AuthorizedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings/account" element={<AccountSettings />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
