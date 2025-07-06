// services/grpc-microservices-sample/apps/backend/api-gateway/src/index.ts
import { createServer } from "http";
import { createClient } from "@connectrpc/connect";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { createConnectTransport } from "@connectrpc/connect-node"; // createGrpcTransportの代わりに
import { UserService } from "@packages/proto/gen/user_connect.js";
import { ProductService } from "@packages/proto/gen/product_connect.js";
import cors from "cors";

// ConnectTransportを使用（HTTP/1.1で通信）
const userTransport = createConnectTransport({
  baseUrl: "http://localhost:5001",
  httpVersion: "1.1",
});

const productTransport = createConnectTransport({
  baseUrl: "http://localhost:5002",
  httpVersion: "1.1",
});

const userClient = createClient(UserService, userTransport);
const productClient = createClient(ProductService, productTransport);

const routes = (router: any) => {
  // User service proxy
  router.service(UserService, {
    async getUser(req: any) {
      console.log("Proxying getUser request");
      try {
        const result = await userClient.getUser(req);
        console.log("getUser response:", result);
        return result;
      } catch (error) {
        console.error("Error in getUser:", error);
        throw error;
      }
    },
    async listUsers(req: any) {
      console.log("Proxying listUsers request");
      try {
        const result = await userClient.listUsers(req);
        console.log("listUsers response:", result);
        return result;
      } catch (error) {
        console.error("Error in listUsers:", error);
        throw error;
      }
    },
  });

  // Product service proxy
  router.service(ProductService, {
    async getProduct(req: any) {
      console.log("Proxying getProduct request");
      try {
        const result = await productClient.getProduct(req);
        console.log("getProduct response:", result);
        return result;
      } catch (error) {
        console.error("Error in getProduct:", error);
        throw error;
      }
    },
    async listProducts(req: any) {
      console.log("Proxying listProducts request");
      try {
        const result = await productClient.listProducts(req);
        console.log("listProducts response:", result);
        return result;
      } catch (error) {
        console.error("Error in listProducts:", error);
        throw error;
      }
    },
  });
};

const corsMiddleware = cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Grpc-Web",
    "X-User-Agent",
    "Connect-Protocol-Version",
    "Connect-Accept-Encoding",
    "Connect-Content-Encoding",
  ],
  exposedHeaders: [
    "Grpc-Status",
    "Grpc-Message",
    "Grpc-Status-Details-Bin",
    "Connect-Accept-Encoding",
    "Connect-Content-Encoding",
  ],
});

const handler = connectNodeAdapter({
  routes,
});

const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  corsMiddleware(req, res, () => {
    handler(req, res);
  });
});

server.listen(4000, () => {
  console.log("API Gateway listening on port 4000");
});
