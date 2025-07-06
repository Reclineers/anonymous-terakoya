<!-- services/grpc-microservices-sample/apps/frontend/app2/components/ProductCatalog.vue -->
<template>
  <div class="product-catalog">
    <h2>Product Catalog</h2>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="products.length > 0" class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <p v-else>No products found</p>
  </div>
</template>

<script setup lang="ts">
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { ProductService } from "@packages/proto/gen/product_connect.js";
import type { Product } from "@packages/proto/gen/product_pb";

const transport = createGrpcWebTransport({
  baseUrl: "http://localhost:4000",
});

const productClient = createClient(ProductService, transport);

const products = ref<Product[]>([]);
const pending = ref<boolean>(true);
const error = ref<any>(null);

onMounted(async () => {
  try {
    const response = await productClient.listProducts({ page: 1, limit: 10 });
    products.value = response.products;
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>

<style scoped>
.product-catalog {
  padding: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.product-card h3 {
  margin: 0 0 10px 0;
}

.price {
  font-weight: bold;
  color: #007bff;
}
</style>
