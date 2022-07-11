import { 
  BrowserRouter,
  Route,
  Routes, 
} from "react-router-dom";

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HeaderAndFooter />}> */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="mywords" element={<MyWords />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="search" element={<Search />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
