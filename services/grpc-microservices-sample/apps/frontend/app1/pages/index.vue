<!-- apps/frontend/app1/pages/index.vue -->
<template>
  <div class="container">
    <h1>User Management</h1>
    <div class="user-list">
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@packages/proto/gen/user_pb";

const { $userClient } = useNuxtApp();
const users = ref<User[]>([]);

onMounted(async () => {
  const response = await $userClient.listUsers({ page: 1, limit: 10 });
  users.value = response.users;
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-list {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  border-radius: 4px;
}
</style>
