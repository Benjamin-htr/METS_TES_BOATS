import { sayHi } from "@pnpm-monorepo/shared";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { History } from "./pages/History/History";
import { Home } from "./pages/Home/Home";
import { NewTraject } from "./pages/NewTraject/NewTraject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  sayHi("test");
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
