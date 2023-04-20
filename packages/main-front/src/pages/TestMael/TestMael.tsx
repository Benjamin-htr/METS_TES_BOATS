import { trpc } from "../../lib/trpc";

export function TestMael() {
  const helloQuery = trpc.user.useQuery({ name: "Bob" });
  const goodbyeMutation = trpc.user.useMutation();

  return (
    <div>
      <p>{helloQuery.data?.greeting}</p>

      <button onClick={() => goodbyteMutation.mutate()}>Say Goodbye</button>
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
