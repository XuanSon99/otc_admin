<template>
  <main>
    <div class="item secondary">
      <v-simple-table border>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Tiêu đề</td>
              <td>
                <v-text-field v-model="title" outlined @input="getSlug" dense class="mt-5"></v-text-field>
              </td>
            </tr>
            <tr>
              <td>URL Slug</td>
              <td>
                <v-text-field v-model="slug" outlined dense class="mt-5"></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Ảnh thumbnail</td>
              <td>
                <input class="mb-3" type="file" @change="inputImage($event)" />
                <v-img :src="image_url ? image_url : image(old_image)" height="200px" width="200px"
                  style="object-fit: cover" />
              </td>
            </tr>
            <tr>
              <td>Danh mục bài viết</td>
              <td>
                <v-select :items="categories" v-model="category_id" dense class="mt-5" outlined item-text="name"
                  item-value="id"></v-select>
              </td>
            </tr>
            <tr>
              <td>Bài viết nổi bật</td>
              <td>
                <v-select :items="featured_list" v-model="featured" dense class="mt-5" outlined item-text="text"
                  item-value="value"></v-select>
              </td>
            </tr>
            <tr>
              <td>Nội dung</td>
              <td>
                <vue-editor id="editor" v-model="body" use-custom-image-handler @image-added="handleImageAdded" />
              </td>
            </tr>
            <tr>
              <td>
                <v-btn color="primary" class="mt-5" @click="confirm">
                  Xác nhận
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
      new_image: "",
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
      is_edit: false,
      old_image: "",
      image_url: "",
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
    inputImage(event) {
      this.new_image = event.target.files[0];
      this.image_url = URL.createObjectURL(this.new_image);
    },
    getPost() {
      if (this.$route.params.id == "create") {
        return;
      }
      this.CallAPI("get", "posts/" + this.$route.params.id, {}, (res) => {
        this.title = res.data.title;
        this.body = res.data.body;
        this.featured = res.data.featured;
        this.category_id = res.data.category_id;
        this.slug = res.data.slug;
        this.old_image = res.data.image;
        this.is_edit = true;
      });
    },
    getCategory() {
      this.CallAPI("get", "categories", {}, (res) => {
        this.categories = res.data;
      });
    },
    confirm() {
      if (!this.title || !this.body) {
        this.$toast.error("Vui lòng nhập đủ thông tin!");
        return;
      }
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("slug", this.slug);
      formData.append("category_id", this.category_id);
      formData.append("featured", this.featured);
      formData.append("body", this.body);
      if (this.new_image) {
        formData.append("image", this.new_image);
      }
      let url = "posts";
      if (this.is_edit) {
        formData.append("_method", "put");
        url = "posts/" + this.$route.params.id;
      }

      this.CallAPI("post", url, formData, (res) => {
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
    getSlug() {
      this.slug = this.toSlug(this.title);
    }
  },
};
</script>

<style></style>