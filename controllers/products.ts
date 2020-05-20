import { Product } from "../types.ts";

const products: Product[] = [
  {
    id: "1",
    name: "Product one",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product two",
    description: "This is product two",
    price: 19.99,
  },
  {
    id: "3",
    name: "Product three",
    description: "This is product three",
    price: 9.99,
  },
  {
    id: "4",
    name: "Product four",
    description: "This is product four",
    price: 1.99,
  },
];

// @desc    Get all products
// @route   GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// exports functions
export { getProducts };
