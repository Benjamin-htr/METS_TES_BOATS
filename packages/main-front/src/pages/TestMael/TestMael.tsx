import { trpc } from "../../lib/trpc";

export function TestMael() {
  const helloQuery = trpc.hello.useQuery();
  const user = trpc.user.getMe.useQuery();

  return (
    <div>
      <p>{helloQuery.isLoading}</p>
      <p>{helloQuery.data}</p>
      <p>{user.data?.data.user?.id}</p>
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
