import { trpc } from "../../lib/trpc";

export function TestMael() {
  const user = trpc.user.getMe.useQuery();

  return (
    <div>
      <p>Bonjour {user.data?.data.user?.username} !</p>
    </div>
  );
}
