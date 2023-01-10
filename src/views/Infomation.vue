<template>
  <main class="detail-info">
    <div class="item secondary">
      <v-simple-table border>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{{ data.username }}</td>
            </tr>
            <tr>
              <td>Họ tên</td>
              <td>{{ data.name }}</td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>{{ data.phone }}</td>
            </tr>
            <tr>
              <td>Ảnh CCCD</td>
              <td>
                <div class="d-flex">
                  <expandable-image
                    :src="image(data.front_photo)"
                    class="mr-2"
                  />
                  <expandable-image
                    :src="image(data.back_photo)"
                    class="mr-2"
                  />
                  <expandable-image
                    :src="image(data.portrait_photo)"
                    class="mr-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Địa chỉ IP</td>
              <td>{{ data.ip_address }}</td>
            </tr>
            <tr>
              <td>Chat ID</td>
              <td>{{ data.chat_id }}</td>
            </tr>
            <tr>
              <td>Uy tín</td>
              <td>
                <v-select
                  :items="['yes', 'no']"
                  v-model="reputation"
                  dense
                  class="mt-5"
                  outlined
                  prepend-icon="check"
                ></v-select>
              </td>
            </tr>
            <tr>
              <td>Số lần GD</td>
              <td>
                <v-text-field
                  v-model="transaction"
                  type="number"
                  outlined
                  dense
                  class="mt-5"
                  append-outer-icon="add"
                  @click:append-outer="increment"
                  prepend-icon="remove"
                  @click:prepend="decrement"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Tình trạng KYC</td>
              <td>
                <v-select
                  :items="['pending', 'success']"
                  v-model="kyc"
                  dense
                  class="mt-5"
                  outlined
                  prepend-icon="check"
                ></v-select>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn color="primary" class="mt-5" @click="update"> Cập nhật </v-btn>
      <v-btn color="error" class="ml-3 mt-5" @click="dialog2 = true">
        Xóa KYC
      </v-btn>
      <v-btn color="success" class="ml-3 mt-5" @click="dialog = true">
        Nhắn tin
      </v-btn>
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
          <v-btn color="primary" @click="sendMessage(content)">
            Xác nhận
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="450px">
      <v-card>
        <v-card-title>
          <span>Lý do KYC bị từ chối</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog2 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="mx-6 mt-6">
          <v-autocomplete
            :items="reason_list"
            v-model="reason"
            class="mt-5"
            outlined
            placeholder="Nếu đã nhắn tin riêng có thể để trống"
          ></v-autocomplete>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="default" @click="dialog2 = false"> Hủy </v-btn>
          <v-btn color="primary" @click="deleteKYC"> Xác nhận </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      data: "",
      transaction: "",
      reputation: "",
      kyc: "",
      content: "",
      reason_list: [
        "Ảnh không đúng vui lòng KYC lại theo hướng dẫn!",
        "Vui lòng chụp lại ảnh rõ hơn!",
        "Vui lòng chụp sát CCCD/CMND!",
        "Vui lòng chụp lại CCCD/CMND không để mất góc!",
        "Vui lòng chụp rõ chân dung hơn!",
        "Thẻ CCCD/CMND của bạn đã hết hạn!",
      ],
      reason: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.CallAPI("get", "user-info/" + this.$route.params.id, {}, (res) => {
        this.data = res.data;
        this.transaction = res.data.transaction;
        this.reputation = res.data.reputation;
        this.kyc = res.data.kyc;
      });
    },
    update() {
      this.CallAPI(
        "put",
        "client/" + this.data.id,
        {
          transaction: this.transaction,
          reputation: this.reputation,
          kyc: this.kyc,
        },
        (res) => {
          if (this.kyc == "success" && this.kyc != this.data.kyc) {
            let content = "Yêu cầu KYC của bạn đã thành công!";
            this.sendMessage(content);
            return;
          }
          this.$toast.success("Cập nhật thành công");
        }
      );
    },
    deleteKYC() {
      this.CallAPI("delete", "client/" + this.data.id, {}, (response) => {
        if (this.reason) {
          this.sendMessage(this.reason);
        }
        this.$router.push("/user");
      });
    },
    sendMessage(content) {
      if (!content) {
        this.$toast.error("Vui lòng nhập đủ thông tin");
        return;
      }
      this.CallAPI(
        "post",
        "send-message",
        {
          chat_id: this.data.chat_id,
          content: content,
        },
        (res) => {
          this.$toast.success("Thành công");
          this.dialog = false;
          this.content = "";
        }
      );
    },
    increment() {
      this.transaction += 1;
    },
    decrement() {
      this.transaction -= 1;
    },
  },
};
</script>