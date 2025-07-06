<!-- services/grpc-microservices-sample/apps/frontend/app1/components/UserManagement.vue -->
<template>
  <div class="user-management">
    <h2>User Management</h2>
    <div class="user-list">
      <div v-if="pending">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul v-else-if="users.length > 0">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
      <p v-else>No users found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { UserService } from "@packages/proto/gen/user_connect.js";
import { User } from "@packages/proto/gen/user_pb";

// 直接gRPCクライアントを作成
const transport = createGrpcWebTransport({
  baseUrl: "http://localhost:4000",
});

const userClient = createClient(UserService, transport);

const users = ref<User[]>([]);
const pending = ref<boolean>(true);
const error = ref<any>(null);

onMounted(async () => {
  try {
    const response = await userClient.listUsers({ page: 1, limit: 10 });
    users.value = response.users;
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>

<style scoped>
.user-management {
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
