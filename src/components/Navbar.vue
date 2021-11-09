<template>
  <n-element class="navbar" tag="div">
    <div class="user">
      <n-dropdown
        @select="handleSelect"
        size="small"
        trigger="hover"
        :options="options"
      >
        <n-button text class="nospace">
          <h1 class="username">{{ username }}</h1>
        </n-button>
      </n-dropdown>
    </div>
  </n-element>
</template>

<script setup>
import { NElement, NButton, NDropdown } from "naive-ui";
</script>

<script>
export default {
  name: "Navbar",
  props: ["username"],
  data() {
    return {
      options: [
        {
          label: "Disconnect",
          key: "disconnect"
        }
      ]
    };
  },
  methods: {
    disconnect: function () {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    },
    handleSelect(key) {
      if (key == "disconnect") {
        this.disconnect();
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  position: relative;
  padding: 0;
  margin: 0;
  height: 80px;
  background-color: var(--inverted-color);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  color: var(--text-color-1);
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.username {
  margin: 0;
  margin-right: 20px;
}

.nospace {
  padding: 0;
  margin: 0;
}
</style>
