import "./cart-icon.styles.jsx";

import shoppingIcon from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CartIconContainer,
  ItemsCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartDropdownOpen, setIsCartDropdownOpen, cartCount } =
    useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartDropdownOpen(!isCartDropdownOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon as="img" src={shoppingIcon} alt="shoppingicon" />
      <ItemsCount>{cartCount}</ItemsCount>
    </CartIconContainer>
  );
};

export default CartIcon;
