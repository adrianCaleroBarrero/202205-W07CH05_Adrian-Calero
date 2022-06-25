import React from "react";
import "./App.css";
import { Form } from "./components/form/form";
import { List } from "./components/list/list";

function App() {
  return (
    <>
      <h1>Robots</h1>
      <Form />
      <List />
    </>
  );
}

export default App;
