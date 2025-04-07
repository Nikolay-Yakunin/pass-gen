import React from "react";
import { Button, CopyText } from "../../components/shared";

function TestPage() {
  return (
    <main>
      <h1>Test Page</h1>
      <section>
        <h1>shared ui</h1>
        <div className="row">
            <Button>Click Me</Button>
            <CopyText>Copy Me</CopyText>
        </div>
      </section>
    </main>
  );
}

export default TestPage;
