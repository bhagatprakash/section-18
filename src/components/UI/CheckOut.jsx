import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormatter } from "../../Utils/Formatting";
import Input from "./input.jsx";
import Button from "./Button.jsx";
import UserProgressContext from "../Store/UserProgressContect.jsx";
import useHttp from "../../hooks/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/Json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3001/orders", requestConfig);

  const cartTotel = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckOut();
  }
  function handelFinish() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  }

  function handelSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    fetch("http://localhost:3001/orders ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  console.log(actions);

  if (isSending) {
    actions = <span>Sending order data....</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.process === "checkout"}
        onClose={handelFinish}
      >
        <h2>Success!</h2>
        <p>your order was submitted successfully.</p>
        <p>
          We will get back to you width more details via email within the next
          few minites
        </p>

        <p className="modal-actions">
          <Button onClick={handelFinish}>okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.process === "checkout"} onClose={handleClose}>
      <form onSubmit={handelSubmit}>
        <h2> CheckOut :-</h2>
        <p>Total Amount :- {currencyFormatter.format(cartTotel)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
