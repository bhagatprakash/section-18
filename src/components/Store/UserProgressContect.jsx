import { createContext, useState } from "react";
import Cart from "../UI/Cart";
const UserProgressContext = createContext({
  process: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setuserProgress] = useState("");

  function showCart() {
    setuserProgress("cart");
  }

  function hideCart() {
    setuserProgress("");
  }

  function showCheckOut() {
    setuserProgress("checkout");
  }

  function hideCheckOut() {
    setuserProgress("");
  }

  const userProgressCtx = {
    process: userProgress,
    showCart: showCart,
    hideCart: hideCart,
    showCheckOut: showCheckOut,
    hideCheckOut: hideCheckOut,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
