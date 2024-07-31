import { Children, createContext } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  return (
    <div>
        {children }
    </div>
  );
};


/*

--> Example to understand children property in usercontext

import React from "react";

function Greeting(props) {
  return <p>Hello, {props.children}!</p>;
}

function App() {
  return (
    <div className="App">
      <Greeting>world</Greeting>
    </div>
  );
}

export default App;
*/