import Meals from "./components/Meles";
import Header from "./components/heder";
import { CartContextProvider } from "./components/Store/CartContext";
import { UserProgressContextProvider } from "./components/Store/UserProgressContect";
import Cart from "./components/UI/Cart";
import Checkout from "./components/UI/CheckOut";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
