import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { trpc } from "./lib/trpc";
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
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          // You can pass any HTTP headers you wish here
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
