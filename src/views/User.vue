<template>
  <main class="custom-pd">
    <div class="item secondary">
      <v-card-title>
        <v-icon class="mr-2" color="primary" large
          >mdi-account-circle-outline</v-icon
        >
        Quản lý người dùng
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template v-slot:[`item.kyc`]="{ item }">
          <v-btn v-if="item.kyc == 'pending'" small class="yellow">
            Đang chờ
          </v-btn>
          <v-btn v-else small class="primary"> Đã duyệt </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            small
            class="info mr-2"
            @click="$router.push('/user/' + item.username)"
          >
            Chi tiết
          </v-btn>
          <v-btn small class="success mr-2" @click="editItem(item)">
            Nhắn tin
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Nội dung tin nhắn</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-text-field
            v-model="content"
            outlined
            label="Nội dung"
            clearable
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog = false"> Hủy </v-btn>
          <v-btn color="primary" @click="sendMessage"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: "ID", value: "id" },
        { text: "Username", value: "username" },
        { text: "Tình trạng KYC", value: "kyc" },
        { text: "SL giao dịch", value: "transaction" },
        { text: "Uy tín", value: "reputation" },
        { text: "Ngày KYC", value: "created_at" },
        { text: "Thao tác", value: "actions", sortable: false },
      ],
      data: [],
      edit_id: "",
      content: "",
      chat_id: "",
      ok: "",
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  mounted() {
    this.getData();
    if (!this.account.rules.includes("user")) {
      this.$router.push("/");
    }
  },
  methods: {
    getData() {
      this.CallAPI("get", "client", {}, (res) => {
        this.data = res.data;
      });
    },
    editItem(item) {
      this.edit_id = item.id;
      this.chat_id = item.chat_id;
      this.dialog = true;
    },
    sendMessage() {
      if (!this.content) {
        this.$toast.error("Vui lòng nhập đủ thông tin");
        return;
      }
      this.CallAPI(
        "post",
        "send-message",
        {
          chat_id: this.chat_id,
          content: this.content,
        },
        (res) => {
          this.$toast.success("Thành công");
          this.dialog = false;
          this.content = "";
        }
      );
    },
    formatDate(date) {
      return date.slice(0, 10);
    },
  },
};
</script>