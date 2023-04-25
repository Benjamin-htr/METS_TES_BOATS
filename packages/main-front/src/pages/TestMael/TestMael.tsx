import { Button } from "@chakra-ui/react";
import { trpc } from "../../lib/trpc";

export function TestMael() {
  const helloQuery = trpc.hello.useQuery();
  const user = trpc.user.getMe.useQuery();
  const logout = trpc.auth.logoutUser.useMutation();
  const test = trpc.data.getCoordinates.useQuery();

  return (
    <div>
      <p>{helloQuery.isLoading}</p>
      <p>{helloQuery.data}</p>
      <p>Bonjour {user.data?.data.user?.username} !</p>
      <p>
        Le bateau :{" "}
        {test.data?.map((obj) => (
          <div>{obj.latitude}</div>
        ))}
      </p>
      <Button
        onClick={() => {
          logout.mutate();
        }}
        isLoading={logout.isLoading}
      >
        Déconnexion
      </Button>
    </div>
  );
}
// import { trpc } from "../../lib/trpc";
// import { useState } from "react";

// export const TestMael = () => {
//   const [test, setTest] = useState(0);

//   return (
//     <div>
//       <button onClick={() => setTest(test + 1)}>Test</button>
//       <p>{test}</p>
//     </div>
//   );
// };
