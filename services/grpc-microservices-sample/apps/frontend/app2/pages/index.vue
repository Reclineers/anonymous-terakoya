<!-- apps/frontend/app2/pages/index.vue -->
<template>
  <div class="container">
    <h1>Product Catalog</h1>
    <div class="product-list">
      <h2>Products</h2>
      <div class="products">
        <div v-for="product in products" :key="product.id" class="product-card">
          <h3>{{ product.name }}</h3>
          <p>${{ product.price }}</p>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@packages/proto/gen/product_pb";

const { $productClient } = useNuxtApp();
const products = ref<Product[]>([]);

onMounted(async () => {
  const response = await $productClient.listProducts({ page: 1, limit: 10 });
  products.value = response.products;
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
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
</style>
