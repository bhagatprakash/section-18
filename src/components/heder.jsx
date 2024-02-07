import { useContext } from "react";
import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import "../index.css";
import CartContext from "./Store/CartContext";
import UserProgressContext from "./Store/UserProgressContect";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
    return totalNumberofItems + item.quantity;
  }, 0);

  function handelShowCart() {
    UserProgressCtx.showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="image header" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button textOnly={true} onClick={handelShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}
