import { Children, createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
  return <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>;
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
