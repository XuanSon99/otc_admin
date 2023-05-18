<template>
  <main class="custom-pd post">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large>mdi-account-edit-outline</v-icon>
        Quản lý bài viết
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-btn color="primary" class="ml-5" @click="$router.push('post/create')">
          Thêm mới
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search" :items-per-page="6" :page.sync="page"
        :server-items-length="totalItems" :footer-props="{ 'items-per-page-options': [6, 6] }">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <img :src="image(item.image)" alt="" />
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <a :href="'https://chootc.com/' + item.slug" target="_blank">{{ item.title }}</a>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="success mr-3" @click="toEdit(item)"> Sửa </v-btn>
          <v-btn class="error" @click="deletePost(item)"> Xóa </v-btn>
        </template>
      </v-data-table>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      dialog: false,
      headers: [
        { text: "Ảnh Thumbnail", value: "image" },
        { text: "Tiêu đề", value: "title" },
        { text: "Ngày tạo", value: "created_at" },
        { text: "Thao tác", value: "actions" },
      ],
      data: [],
      edit_id: "",
      content: "",
      page: 1,
      totalItems: 0
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "posts?page="+this.page, {}, (res) => {
        this.data = res.data.data;
        this.totalItems = res.data.total
      });
    },
    editItem(item) {
      this.edit_id = item.id;
      this.dialog = true;
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
    deletePost(item) {
      this.CallAPI("delete", "posts/" + item.slug, {}, (res) => {
        this.$toast.success("Xóa thành công");
        this.getData();
      });
    },
    toEdit(item) {
      this.$router.push("/post/" + item.slug);
    },
  },
  watch: {
    page() {
      this.getData()
    }
  }
};
</script>