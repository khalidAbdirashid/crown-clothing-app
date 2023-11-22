/* eslint-disable react/prop-types */
import { useContext } from "react";
import Button, {
  BUTTON_TYPES_CLASSES,
} from "../common/button/button.component";
import { CartContext } from "../../contexts/cart.context";
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./productcard.styles";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
