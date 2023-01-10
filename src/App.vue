<template>
  <v-app>
    <SideBar v-if="$route.meta.show"/>
    <v-main>
      <v-progress-linear
        :active="loader"
        :indeterminate="loader"
        absolute
        top
        color="#8033e6"
      ></v-progress-linear>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    SideBar
  },
  computed: {
    ...mapGetters(["loader"]),
  },
};
</script>
<style>
#app {
  font-family: 'Open Sans', sans-serif;
  font-weight: 500;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
.theme--light.v-application,
.theme--light.v-card,
.theme--light.v-input {
  color: #001b2b !important;
}
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
.theme--dark.v-application {
  color: #fff !important;
}
.theme--dark.v-application,
.theme--dark.v-card {
  background: #031011 !important;
}
.theme--dark.v-card {
  background: #0b151b !important;
}
.theme--dark input {
  color: #fff !important;
}
.theme--light input {
  color: #001b2b !important;
}
.v-tabs > .v-tabs-bar,
.v-tabs-items {
  background: none !important;
}
</style>