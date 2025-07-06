// services/grpc-microservices-sample/apps/backend/user-service/src/index.ts
import { createServer } from "http";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { UserService } from "@packages/proto/gen/user_connect.js";
import type { User } from "@packages/proto/gen/user_pb.js";

const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const routes = (router: any) => {
  router.service(UserService, {
    async getUser(req: any) {
      console.log("getUser request received:", req);
      const user = users.find((u) => u.id === req.id);
      if (!user) throw new Error("User not found");
      console.log("Returning user:", user);
      return user;
    },
    async listUsers(req: any) {
      console.log("listUsers request received:", req);
      const start = ((req.page || 1) - 1) * (req.limit || 10);
      const end = start + (req.limit || 10);
      const result = {
        users: users.slice(start, end),
        total: users.length,
      };
      console.log("Returning users:", result);
      return result;
    },
  });
};

const handler = connectNodeAdapter({ routes });
const server = createServer(handler);

server.listen(5001, () => {
  console.log("User service listening on port 5001");
});
