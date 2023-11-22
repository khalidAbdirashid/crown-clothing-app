// cart-icon.styles.scss
import styled from "styled-components";
import shoppingSvg from "../../assets/shopping-bag.svg";

const ShoppingIcon = styled(shoppingSvg)`
  width: 24px;
  height: 24px;
`;
const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ItemsCount = styled.span`
  font-size: 10px;
  font-weight: bold;
  position: absolute;
  top: 58%;
  transform: translateY(-50%);
`;

export { CartIconContainer, ItemsCount, ShoppingIcon };
