import { Button } from "../../components/button/button";

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={() => console.log("oui")}>test</Button>
    </div>
  );
};
