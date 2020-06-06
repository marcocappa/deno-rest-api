import { Client } from "https://deno.land/x/postgres/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";
import { dbCreds } from "../config.ts";

// Init client
const client = new Client(dbCreds);

let products: Product[] = [
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

// @desc    Get product by id
// @route   GET /api/v1/products/:id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: {
        msg: `No product found with id: ${params.id}`,
        context: {
          id: params.id,
        },
      },
    };
  }
};

// @desc    Add product
// @route   POST /api/v1/products
const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc    Update product by id
// @route   PUT /api/v1/products/:id
const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();
    const updateProduct: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateProduct } : p
    );
    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: {
        msg: `No product found with id: ${params.id}`,
        context: {
          id: params.id,
        },
      },
    };
  }
};

// @desc    Delete product by id
// @route   DELETE /api/v1/products/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    products = products.filter((p) => p.id !== params.id);
    response.status = 204;
    response.body = {
      success: true,
      data: products,
      context: {
        id: params.id,
        msg: `Product with id ${params.id} deleted`,
      },
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      context: {
        id: params.id,
        msg: `Resource with  id ${params.id} not found!`,
      },
    };
  }
};

// exports functions
export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
