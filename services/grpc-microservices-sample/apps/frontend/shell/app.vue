<!-- services/grpc-microservices-sample/apps/frontend/shell/app.vue -->
<template>
  <div class="shell-container">
    <header class="shell-header">
      <nav>
        <h1>Microservices Portal</h1>
        <ul class="nav-links">
          <li>
            <button
              @click="currentApp = 'home'"
              :class="{ active: currentApp === 'home' }"
            >
              Home
            </button>
          </li>
          <li>
            <button
              @click="currentApp = 'users'"
              :class="{ active: currentApp === 'users' }"
            >
              Users
            </button>
          </li>
          <li>
            <button
              @click="currentApp = 'products'"
              :class="{ active: currentApp === 'products' }"
            >
              Products
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <main class="shell-main">
      <div v-if="currentApp === 'home'" class="home-content">
        <h2>Welcome to Microservices Portal</h2>
        <div class="app-cards">
          <div class="app-card" @click="currentApp = 'users'">
            <h3>User Management</h3>
            <p>Manage users in the system</p>
          </div>
          <div class="app-card" @click="currentApp = 'products'">
            <h3>Product Catalog</h3>
            <p>Browse and manage products</p>
          </div>
        </div>
      </div>

      <div v-else class="app-container">
        <Suspense>
          <template #default>
            <component :is="currentMicroApp" />
          </template>
          <template #fallback>
            <div class="loading">Loading micro app...</div>
          </template>
        </Suspense>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from "vue";

const currentApp = ref("home");

const UserManagement = defineAsyncComponent(() =>
  import("userApp/UserManagement").catch((err) => {
    console.error("Failed to load UserManagement:", err);
    return {
      template: '<div class="error">Failed to load User Management app</div>',
    };
  })
);

const ProductCatalog = defineAsyncComponent(() =>
  import("productApp/ProductCatalog").catch((err) => {
    console.error("Failed to load ProductCatalog:", err);
    return {
      template: '<div class="error">Failed to load Product Catalog app</div>',
    };
  })
);

const currentMicroApp = computed(() => {
  switch (currentApp.value) {
    case "users":
      return UserManagement;
    case "products":
      return ProductCatalog;
    default:
      return null;
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.shell-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.shell-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.shell-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-links button {
  background: none;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links button.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.shell-main {
  flex: 1;
  overflow: auto;
}

.home-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.app-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.app-card {
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.app-container {
  height: 100%;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}
</style>
