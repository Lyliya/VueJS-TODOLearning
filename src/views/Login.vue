<template>
  <n-element class="container" tag="div">
    <div class="form">
      <n-card v-if="type == 'REGISTER'">
        <h1>Create an account</h1>
        <n-form
          :label-width="80"
          :model="user"
          :rules="rules"
          size="large"
          ref="user"
        >
          <n-form-item
            label="Username"
            path="username"
            required
            @keyup.enter="register"
          >
            <n-input v-model:value="user.username" placeholder="Username" />
          </n-form-item>
          <n-form-item
            label="Password"
            path="password"
            required
            @keyup.enter="register"
          >
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
        <n-button text @click="type = 'LOGIN'">
          Already have an account ? Log in instead
        </n-button>
      </n-card>
      <n-card v-if="type == 'LOGIN'">
        <h1>Login</h1>
        <n-form
          :label-width="80"
          :model="user"
          :rules="rules"
          size="large"
          ref="user"
        >
          <n-form-item
            label="Username"
            path="username"
            required
            @keyup.enter="login"
          >
            <n-input v-model:value="user.username" placeholder="Username" />
          </n-form-item>
          <n-form-item
            label="Password"
            path="password"
            required
            @keyup.enter="login"
          >
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
        <n-button text @click="type = 'REGISTER'">
          Don't have an account ? Register
        </n-button>
      </n-card>
    </div>
  </n-element>
  <!-- <div class="container">
    <n-card class="form" v-if="type == 'REGISTER'">
      <h1>Create an account</h1>
      <n-form
        :label-width="80"
        :model="user"
        :rules="rules"
        size="large"
        ref="user"
      >
        <n-form-item
          label="Username"
          path="username"
          required
          @keyup.enter="register"
        >
          <n-input v-model:value="user.username" placeholder="Username" />
        </n-form-item>
        <n-form-item
          label="Password"
          path="password"
          required
          @keyup.enter="register"
        >
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
      <n-button text @click="type = 'LOGIN'">
        Already have an account ? Log in instead
      </n-button>
    </n-card>
    <n-card class="form" v-if="type == 'LOGIN'">
      <h1>Login</h1>
      <n-form
        :label-width="80"
        :model="user"
        :rules="rules"
        size="large"
        ref="user"
      >
        <n-form-item
          label="Username"
          path="username"
          required
          @keyup.enter="login"
        >
          <n-input v-model:value="user.username" placeholder="Username" />
        </n-form-item>
        <n-form-item
          label="Password"
          path="password"
          required
          @keyup.enter="login"
        >
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
      <n-button text @click="type = 'REGISTER'">
        Don't have an account ? Register
      </n-button>
    </n-card>
  </div> -->
</template>
<script setup>
import { NForm, NCard, NInput, NButton, NFormItem, NElement } from "naive-ui";
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
      logLogin: "",
      logRegister: "",
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
          this.logRegister = "This user already exist";
        else this.logRegister = json.error;
      } else {
        localStorage.setItem("access_token", json.access_token);
        this.$router.push("/");
      }
      //   localStorage.setItem("access_token", "token");
      //   this.$router.push("/");
    },

    login: async function () {
      console.log("Login with", this.user.username, this.user.password);
      const body = {
        username: this.user.username,
        password: this.user.password
      };
      const res = await fetch("http://localhost:3000/user/login", {
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
        this.logLogin = json.error;
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--body-color);
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
}
</style>
