import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { ProductService } from "@packages/proto/gen/product_connect";

export default defineNuxtPlugin(() => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:4000",
  });

  const productClient = createClient(ProductService, transport);

  return {
    provide: {
      productClient,
    },
  };
});
