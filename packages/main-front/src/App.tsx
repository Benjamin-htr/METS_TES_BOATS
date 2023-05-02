import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Operation, createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
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
import { Profile } from "./pages/Profile/Profile";
import { Signup } from "./pages/Signup/Signup";
import { Simulation } from "./pages/Simulation/Simulation";

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
            element: <Profile />,
          },
          {
            path: "/simulation/:id",
            element: <Simulation />,
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
        splitLink({
          // Si l'opération est une subscription, on utilise le lien websocket, sinon on utilise le lien http
          condition: (op: Operation) => op.type === "subscription",
          true: wsLink({
            client: createWSClient({
              url: "ws://localhost:3001",
              onClose() {
                console.log("Connection closed");
              },
              onOpen() {
                console.log("Connection opened");
              },
            }),
          }),
          false: httpBatchLink({
            url: "http://localhost:8000/trpc",
            fetch(url, options) {
              const promise = fetch(url, {
                ...options,
                credentials: "include",
              });

              // Si le serveur renvoie une erreur 401 (unhautorized, donc dans notre cas, token plus valide), on redirige vers la page de login
              promise
                .then((res) => {
                  if (res.status === 401) {
                    window.location.href = "/login";
                  }
                })
                .catch((err) => {
                  console.log(err);
                });

              return promise;
            },
          }),
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
