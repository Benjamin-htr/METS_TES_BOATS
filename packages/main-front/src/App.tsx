import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Layout } from "./components/organisms/layouts/Layout";
import { trpc } from "./lib/trpc";
import { History } from "./pages/History/History";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { NewTraject } from "./pages/NewTraject/NewTraject";
import { NotFound } from "./pages/NotFound/NotFound";
import { Signup } from "./pages/Signup/Signup";
import { TestMael } from "./pages/TestMael/TestMael";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: "/new_traject",
            element: <NewTraject />,
          },
          {
            path: "/history",
            element: <History />,
          },
          {
            path: "/profile",
          },
          {
            path: "/test_mael",
            element: <TestMael />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
