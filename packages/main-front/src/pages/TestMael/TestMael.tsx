import { useState } from "react";

export const TestMael = () => {
  const [test, setTest] = useState(false);

  return (
    <div>
      <button onClick={() => setTest(!test)}>Test</button>
      {test && (
        <div>
          <p>Test</p>
        </div>
      )}
    </div>
  );
};
