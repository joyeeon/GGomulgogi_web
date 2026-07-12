import HomePage from "./pages/Homepage";
import RootLayout from "./layouts/Root-Layout";
import Drawpage from "./pages/Drawpage";
import Gamepage from "./pages/Gamepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from   "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "/draw",
        element: <Drawpage/>
      },
      {
        path: "/game",
        element: <Gamepage/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
