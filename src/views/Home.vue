<template>
  <Navbar :username="user.username" />
  <n-element class="container" tag="div">
    <!-- <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
      :class="task.done ? 'done' : ''"
    >
      <p>{{ task.id }}.</p>
      <input
        v-model="task.title"
        @keyup.enter="updateTaskTitle(task.id)"
        :class="task.done ? 'done' : ''"
      />
      <n-checkbox v-model:checked="task.done" />
    </div> -->
    <div class="list">
      <n-list style="margin: 0">
        <template #header><h1 class="header">Tasks</h1> </template>
        <n-list-item
          v-for="task in tasks"
          :key="task.id"
          class="task"
          :class="task.done ? 'done' : ''"
        >
          <template #prefix>
            <n-checkbox
              size="large"
              v-model:checked="task.done"
              @click="updateTask(task.id)"
            />
          </template>
          <n-thing>
            <input
              v-model="task.title"
              @keyup.enter="updateTask(task.id)"
              :class="task.done ? 'done' : ''"
            />
          </n-thing>
          <template #suffix>
            <n-button text style="font-size: 24px" @click="deleteTask(task.id)">
              <n-icon>
                <CloseOutline />
              </n-icon>
            </n-button>
          </template>
        </n-list-item>
        <n-list-item>
          <template #prefix><n-checkbox size="large" disabled /></template>
          <n-thing>
            <input
              v-model="newtask"
              placeholder="Add a task"
              @keyup.enter="createTask()"
            />
          </n-thing>
          <template #suffix> </template>
        </n-list-item>
      </n-list>
    </div>
  </n-element>
</template>

<script setup>
import {
  NElement,
  NList,
  NListItem,
  NCheckbox,
  NThing,
  NButton,
  NIcon
} from "naive-ui";

import { CloseOutline } from "@vicons/ionicons5";
</script>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import { useNotification } from "naive-ui";

export default {
  name: "Home",
  components: { Navbar },
  data() {
    return {
      tasks: [],
      user: {},
      token: "",
      notification: useNotification(),
      newtask: ""
    };
  },
  async mounted() {
    this.token = localStorage.getItem("access_token");
    this.tasks = await this.getTasks();
    this.user = await this.getUser();
  },
  methods: {
    getTasks: async function () {
      // If not logged in, redirect to login
      if (!this.token) this.$router.push("/login");

      const res = await fetch("http://localhost:3000/task", {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (res.status != 200) {
        this.$router.push("/login");
      }
      return res.json();
    },

    getUser: async function () {
      // If not logged in, redirect to login
      if (!this.token) this.$router.push("/login");

      const res = await fetch("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (res.status != 200) {
        this.$router.push("/login");
      }
      return res.json();
    },

    async updateTask(taskId) {
      // If not logged in, redirect to login
      if (!this.token) this.$router.push("/login");

      // Find task ID
      const task = this.tasks.find(e => e.id == taskId);

      // Create body for the request
      const body = {
        title: task.title,
        done: task.done
      };
      // Send PUT request for this task
      const res = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (res.status != 200) {
        // If request failed, try to relogin
        this.$router.push("/login");
      } else {
        this.notification.success({
          duration: 10 * 1000,
          content: "Task updated",
          meta: `Your task has been updated`
        });
      }
      // Update Task List
      this.tasks = await this.getTasks();
    },

    async createTask() {
      // If not logged in, redirect to login
      if (!this.token) this.$router.push("/login");

      // Create body for the request
      const body = {
        title: this.newtask
      };
      // Send PUT request for this task
      const res = await fetch(`http://localhost:3000/task`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (res.status != 200) {
        // If request failed, try to relogin
        this.$router.push("/login");
      } else {
        this.notification.success({
          duration: 10 * 1000,
          content: "Task Created",
          meta: `Your task has been created`
        });
      }
      // Update Task List
      this.newtask = "";
      this.tasks = await this.getTasks();
    },

    async deleteTask(taskId) {
      // If not logged in, redirect to login
      if (!this.token) this.$router.push("/login");

      // Send PUT request for this task
      const res = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (res.status != 200) {
        // If request failed, try to relogin
        this.$router.push("/login");
      } else {
        this.notification.success({
          duration: 10 * 1000,
          content: "Task Deleted",
          meta: `Your task has been deleted`
        });
      }
      // Update Task List
      this.newtask = "";
      this.tasks = await this.getTasks();
    }
  }
};
</script>

<style scoped>
.container {
  background-color: var(--body-color);
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
input {
  border: none;
  color: white;
  background-color: var(--body-color);
  width: 80%;
}

input:focus {
  outline: none;
  border-bottom: 2px solid grey;
}

.task {
  font-size: 1.5em;
}

.done {
  color: var(--text-color-disabled) !important;
}

.list {
  margin: 0;
  width: 50%;
}

.header {
  font-size: 2em;
}
</style>
