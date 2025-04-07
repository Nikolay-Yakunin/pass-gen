import React, { useState } from "react";
import { Button, CopyText } from "../../components/shared";
import { generatePassword } from "../../models/Password/password";

function TestPage() {
  const [pass, setPass] = useState();
  const [complexity, setComplexity] = useState("low");

  const handleGenPass = () => {
    setPass(generatePassword(12, complexity));
  };

  const handlerComplexity = (level) => {
    setComplexity(level);
  };

  return (
    <main>
      <h1>Test Page</h1>
      <section>
        <div className="row">
          <h2>Shared ui</h2>
          <Button>Click Me</Button>
          <CopyText>Copy Me</CopyText>
        </div>
        <div className="row">
          <h2>Pass gen</h2>
          <span>{pass ? pass : "Тут будет пароль..."}</span>
          <div>
            <button onClick={() => handlerComplexity("low")}>Low</button>
            <button onClick={() => handlerComplexity("medium")}>medium</button>
            <button onClick={() => handlerComplexity("high")}>high</button>
          </div>
          <button onClick={handleGenPass}>Gen pass</button>
        </div>
      </section>
    </main>
  );
}

export default TestPage;
