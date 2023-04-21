import React from "react";
import List from "./List";

const App = () => {
  const listItems = [
    { "text": "Item1" },
    { "text": "Item2" },
    { "text": "Item3" },
    { "text": "Item4" },
    { "text": "Item5" },
  ];
  return <List items={listItems} />;
};

export default App;
