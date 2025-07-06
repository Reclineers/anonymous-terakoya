import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { UserService } from "@packages/proto/gen/user_connect";

export default defineNuxtPlugin(() => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:4000",
  });

  const userClient = createClient(UserService, transport);

  return {
    provide: {
      userClient,
    },
  };
});
