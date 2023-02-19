<template>
  <section>
    <v-app-bar color="secondary" app class="px-3">
      <v-btn
        icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.width < 1025"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu offset-y right class="menu-admin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on"> Admin </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item>
            <v-list-item-title @click="dialog = true">
             Đổi mật khẩu
            </v-list-item-title>
          </v-list-item> -->
          <v-list-item @click="logout">
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      :mini-variant-width="64"
      :temporary="$vuetify.breakpoint.width < 1024"
      color="secondary"
      app
    >
      <v-list-item class="pl-3 pr-0 py-5 logo">
        <v-list-item-title
          class="text-capitalize d-flex align-center"
          align="center"
        >
          <img src="/img/logosg.png" />
          <h2 class="px-3">Admin</h2>
        </v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
          v-if="$vuetify.breakpoint.width > 1024"
        >
          <v-icon>mdi-menu-open</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense rounded>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
            class="py-1 px-4"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" color="primary"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span>Nhập mật khẩu mới của bạn</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="password"
            outlined
            type="password"
            label="Password"
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> Hủy </v-btn>
          <v-btn color="primary" @click="changePassword"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      mini: false,
      items: [
        {
          icon: "mdi-view-dashboard-outline",
          text: "Thống kê",
          route: "/",
        },
        {
          icon: "mdi-account-circle-outline",
          text: "QL Khách hàng",
          route: "/user",
        },
        {
          icon: "mdi-account-edit-outline",
          text: "QL bài viết",
          route: "/post",
        },
        {
          icon: "mdi-layers-outline",
          text: "Danh sách admin",
          route: "/admin",
        },
      ],
      password: "",
      dialog: false,
    };
  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.width > 1024;
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    },
    changePassword() {
      if (!this.password) {
        this.$toast.error("Nhập mật khẩu");
        return;
      }
      this.CallAPI(
        "put",
        "admin/1",
        {
          password: this.password,
        },
        (response) => {
          this.$toast.success("Thành công");
          this.dialog = false;
          this.password = "";
        }
      );
    },
  },
};
</script>
<style scoped>
div >>> .v-list a {
  text-decoration: none;
}
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-size: 16px;
  line-height: 20px;
}
</style>