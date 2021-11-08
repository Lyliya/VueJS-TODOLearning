<template>
  <div class="navbar">
    <p>This is a navbar</p>
    <p @click="disconnect">Disconnect</p>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {},
  methods: {
    disconnect: function () {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.navbar {
  padding: 0;
  margin: 0;
  height: 80px;
  background-color: lavender;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
