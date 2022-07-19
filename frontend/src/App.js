import { 
  BrowserRouter,
  Route,
  Routes, 
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { getWords } from "./state/slices/wordsSlice";
import { useEffect } from "react";

export default function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWords(15));
  }, [])

  return (
    <h1>HI</h1>
  )
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       {/* <Route path="/" element={<HeaderAndFooter />}> */}
  //         {/* <Route index element={<Home />} /> */}
  //         {/* <Route path="login" element={<Login />} /> */}
  //         {/* <Route path="mywords" element={<MyWords />} /> */}
  //         {/* <Route path="register" element={<Register />} /> */}
  //         {/* <Route path="search" element={<Search />} /> */}
  //       {/* </Route> */}
  //     </Routes>
  //   </BrowserRouter>
  // )
}
