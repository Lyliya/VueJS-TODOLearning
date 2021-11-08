<template>
  <div class="container">
    <div class="form" v-if="type == 'REGISTER'">
      <h1>Create an account</h1>
      <n-form
        :label-width="80"
        :model="user"
        :rules="rules"
        size="large"
        ref="user"
      >
        <n-form-item label="Username" path="username" required>
          <n-input v-model:value="user.username" placeholder="Username" />
        </n-form-item>
        <n-form-item label="Password" path="password" required>
          <n-input
            placeholder="Password"
            v-model:value="user.password"
            type="password"
          />
        </n-form-item>
        <div class="center">
          <n-form-item>
            <n-button @click="register" size="large" ghost color="#fff"
              >Register</n-button
            >
          </n-form-item>
        </div>
      </n-form>
      <p v-if="logRegister">Error: {{ logRegister }}</p>
    </div>
    <div class="form" v-if="type == 'LOGIN'">
      <h1>Login</h1>
      <n-form
        :label-width="80"
        :model="user"
        :rules="rules"
        size="large"
        ref="user"
      >
        <n-form-item label="Username" path="username" required>
          <n-input v-model:value="user.username" placeholder="Username" />
        </n-form-item>
        <n-form-item label="Password" path="password" required>
          <n-input
            placeholder="Password"
            v-model:value="user.password"
            type="password"
          />
        </n-form-item>
        <div class="center">
          <n-form-item>
            <n-button @click="login" size="large" ghost color="#fff"
              >Login</n-button
            >
          </n-form-item>
        </div>
      </n-form>
      <p v-if="logLogin">Error: {{ logLogin }}</p>
    </div>
  </div>
</template>
<script setup>
import { NForm, NInput, NButton, NFormItem } from "naive-ui";
</script>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: {
          required: true,
          message: "Please input your username",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "Please input your password",
          trigger: ["input", "blur"]
        }
      },
      log: "",
      type: "REGISTER"
    };
  },
  methods: {
    // TODO Get username / password, send to API and log user
    register: async function () {
      console.log(
        "Create an account for",
        this.user.username,
        this.user.password
      );
      const body = {
        username: this.user.username,
        password: this.user.password
      };
      const res = await fetch("http://localhost:3000/user", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
      });

      const json = await res.json();
      console.log(json);
      if (json.error) {
        // Something went wrong, handle error
        if (json.error.includes("ER_DUP_ENTRY"))
          this.log = "This user already exist";
      } else {
        localStorage.setItem("access_token", json.access_token);
        this.$router.push("/");
      }
      //   localStorage.setItem("access_token", "token");
      //   this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.container {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: tomato; */
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  width: 15%;
  padding: 50px;
  border-radius: 10px;
  background-color: lightblue;
}
</style>
