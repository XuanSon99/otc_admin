<template>
  <main class="dashboard">
    <div class="mowgrid">
      <v-card class="user">
        <h4 class="text-center my-3">Số người đăng ký hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_user }}</h1>
          <div class="space mt-3">
            <span>Tổng số người dùng đã đăng ký</span>
            <p>{{ data.total_user }}</p>
          </div>
        </div>
      </v-card>
      <!-- <v-card class="contract">
        <h4 class="text-center my-3">Số lượng đơn vay hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ data.new_contract }}</h1>
          <div class="space mt-3">
            <span>Tổng số lượng đơn vay</span>
            <p>{{ data.total_contract }}</p>
          </div>
        </div>
      </v-card>
      <v-card class="amount">
        <h4 class="text-center my-3">Số tiền cho vay hôm nay</h4>
        <v-divider></v-divider>
        <div class="py-5 px-5">
          <h1 class="text-center">{{ formatMoney(data.new_amount) }}</h1>
          <div class="space mt-3">
            <span>Tổng số tiền cho vay</span>
            <p>{{ formatMoney(data.total_amount) }} VND</p>
          </div>
        </div>
      </v-card> -->
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: "",
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
      this.CallAPI("get", "overview", {}, (res) => {
        this.data = res.data;
      });
    },
    formatMoney(value) {
      if (!value) return 0;
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>