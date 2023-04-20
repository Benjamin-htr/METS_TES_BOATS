import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { History } from "./pages/History/History";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { NewTraject } from "./pages/NewTraject/NewTraject";
import { TestMael } from "./pages/TestMael/TestMael";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test_mael",
    element: <TestMael />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new_traject",
    element: <NewTraject />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
