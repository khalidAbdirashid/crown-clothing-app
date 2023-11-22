/* eslint-disable react/prop-types */
import ProductCard from "../productcard/productcard.component";
import { Link } from "react-router-dom";
import { CategoryPreviewContainer, Preview, Title } from "./category-preview.styles";
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <Title>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </Title>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
