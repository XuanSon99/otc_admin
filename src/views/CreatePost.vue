<template>
  <main>
    <div class="item secondary">
      <v-simple-table border>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Tiêu đề</td>
              <td>
                <v-text-field
                  v-model="title"
                  outlined
                  dense
                  class="mt-5"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>URL Slug</td>
              <td>
                <v-text-field
                  readonly
                  v-model="slug"
                  outlined
                  dense
                  class="mt-5"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Ảnh thumbnail</td>
              <td>
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Thumbnail"
                  v-model="image"
                  class="mt-5"
                ></v-file-input>
              </td>
            </tr>
            <tr>
              <td>Danh mục bài viết</td>
              <td>
                <v-select
                  :items="categories"
                  v-model="category_id"
                  dense
                  class="mt-5"
                  outlined
                  item-text="name"
                  item-value="id"
                ></v-select>
              </td>
            </tr>
            <tr>
              <td>Bài viết nổi bật</td>
              <td>
                <v-select
                  :items="featured_list"
                  v-model="featured"
                  dense
                  class="mt-5"
                  outlined
                  item-text="text"
                  item-value="value"
                ></v-select>
              </td>
            </tr>
            <tr>
              <td>Nội dung</td>
              <td>
                <vue-editor
                  id="editor"
                  v-model="body"
                  use-custom-image-handler
                  @image-added="handleImageAdded"
                />
              </td>
            </tr>
            <tr>
              <td>
                <v-btn color="primary" class="mt-5" @click="confirm">
                  Đăng bài
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </main>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      title: "",
      slug: "",
      image: "",
      category_id: "",
      featured: 0,
      featured_list: [
        {
          text: "Nổi bật",
          value: 1,
        },
        {
          text: "Không nổi bật",
          value: 0,
        },
      ],
      body: "",
      categories: [],
    };
  },
  mounted() {
    this.getCategory();
    this.getPost();
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);

      this.CallAPI("post", "upload", formData, (res) => {
        const url = "https://chootc.com/storage" + res.data;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    getPost() {
      // this.CallAPI("get", "posts/" + this.$route.params.id, {}, (res) => {
      //   this.title = res.data.title;
      //   this.body = res.data.body;
      //   this.featured = res.data.featured;
      //   this.image = res.data.image;
      // });
    },
    getCategory() {
      this.CallAPI("get", "categories", {}, (res) => {
        this.categories = res.data;
      });
    },
    confirm() {
      if (!this.title || !this.category_id || !this.body || !this.image) {
        this.$toast.error("Vui lòng nhập đủ thông tin!");
        return;
      }
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("slug", this.slug);
      formData.append("category_id", this.category_id);
      formData.append("featured", this.featured);
      formData.append("body", this.body);
      formData.append("image", this.image);

      this.CallAPI("post", "posts", formData, (res) => {
        this.$router.push("/posts");
        this.$toast.success("Thành công");
      });
    },
    toSlug(str) {
      str = str.toLowerCase();
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      str = str.replace(/[đĐ]/g, "d");
      str = str.replace(/([^0-9a-z-\s])/g, "");
      str = str.replace(/(\s+)/g, "-");
      str = str.replace(/-+/g, "-");
      str = str.replace(/^-+|-+$/g, "");
      return str;
    },
  },
  watch: {
    title() {
      this.slug = this.toSlug(this.title);
    },
  },
};
</script>

<style>
</style>