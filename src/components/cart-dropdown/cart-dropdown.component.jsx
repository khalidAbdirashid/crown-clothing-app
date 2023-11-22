import { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";
import Button from "../common/button/button.component";
import "./cart-dropdown.styles";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckOutPage = () => {
    navigate("/check-out");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your Cart is Empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOutPage}>go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
