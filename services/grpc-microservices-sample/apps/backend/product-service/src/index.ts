// services/grpc-microservices-sample/apps/backend/product-service/src/index.ts
import { createServer } from "http";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { ProductService } from "@packages/proto/gen/product_connect.js";
import type { Product } from "@packages/proto/gen/product_pb.js";

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 1200,
    description: "High-performance laptop",
  },
  { id: "2", name: "Mouse", price: 50, description: "Wireless mouse" },
];

const routes = (router: any) => {
  router.service(ProductService, {
    async getProduct(req: any) {
      console.log("getProduct request received:", req);
      const product = products.find((p) => p.id === req.id);
      if (!product) throw new Error("Product not found");
      console.log("Returning product:", product);
      return product;
    },
    async listProducts(req: any) {
      console.log("listProducts request received:", req);
      const start = ((req.page || 1) - 1) * (req.limit || 10);
      const end = start + (req.limit || 10);
      const result = {
        products: products.slice(start, end),
        total: products.length,
      };
      console.log("Returning products:", result);
      return result;
    },
  });
};

const handler = connectNodeAdapter({ routes });
const server = createServer(handler);

server.listen(5002, () => {
  console.log("Product service listening on port 5002");
});
