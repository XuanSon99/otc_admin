<template>
  <main class="login">
    <v-card class="px-7 py-7">
      <h1 class="text-center mb-5">Đăng nhập</h1>
      <v-form v-model="valid">
        <v-text-field
          v-model="username"
          outlined
          label="Tài khoản"
          clearable
          :rules="rules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          outlined
          type="password"
          label="Mật khẩu"
          clearable
          :rules="rules"
        ></v-text-field>
        <v-btn color="primary" x-large block @click="login" :disabled="!valid">
          Đăng nhập
        </v-btn>
      </v-form>
    </v-card>
  </main>
</template>

<script>
export default {
  data() {
    return {
      rules: [(v) => !!v || "Không được bỏ trống"],
      valid: false,
      username: "",
      password: "",
      ok: ""
    };
  },
  methods: {
    login() {
      this.CallAPI(
        "post",
        "admin/login",
        { username: this.username, password: this.password },
        (res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("username", res.data.username);
          this.$router.push("/");
        },
        (err) => {
          this.$toast.error("Không chính xác");
        }
      );
    },
  },
};
</script>

<style>
</style>