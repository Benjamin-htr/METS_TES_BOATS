import { useState } from "react";

export const TestMael = () => {
  const [test, setTest] = useState(0);

  return (
    <div>
      <button onClick={() => setTest(test + 1)}>Test</button>
      <p>{test}</p>
    </div>
  );
};
