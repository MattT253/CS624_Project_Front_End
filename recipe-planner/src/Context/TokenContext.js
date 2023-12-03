// TokenContext.js
import React from "react";

const TokenContext = React.createContext({
  userToken: null,
  setUserToken: () => {},
});

export default TokenContext;