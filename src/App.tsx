import React from "react";
import Form from "./components/Form";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <Form />
      </div>
    </div>
  );
};

export default App;
