import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(!!props.logged);
  console.log(props.logged);

  return (
    <>
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
