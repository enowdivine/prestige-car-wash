<template>
  <div>
    <v-toolbar flat color="rgb(109, 199, 109)" dark>
      <div class="toolbar-head">
        <v-toolbar-title>
          <span class="logo-title"
            ><img width="100" src="/logo.png" alt="" />
            <h4>PRESTIGE CAR WASH</h4></span
          >
        </v-toolbar-title>
        <v-toolbar-title>
          <v-avatar :size="30" color="white">
            <v-icon small color="rgb(109, 199, 109)">
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <small class="email">{{ email }}</small>
        </v-toolbar-title>
      </div>
    </v-toolbar>
    <v-tabs vertical color="rgb(109, 199, 109)">
      <div class="tabs">
        <v-tab>
          <v-icon left> mdi-finance </v-icon>
          <span>Statistics</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-account-cash </v-icon>
          <span>Clients</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-car-wash </v-icon>
          <span>Car Detailing</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-home-city </v-icon>
          <span>Home & Office Cleaning</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-home-edit </v-icon>
          <span>Household Items Cleaning</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-car-cog </v-icon>
          <span>Car Rentals and Repairs</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-school </v-icon>
          <span>Prestige Training Acedemy</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-truck-check </v-icon>
          <span>Prestige Franchising</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-gift </v-icon>
          <span>Packages</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-hand-heart </v-icon>
          <span>Services</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-car </v-icon>
          <span>Cars</span>
        </v-tab>
        <v-tab>
          <v-icon left> mdi-account </v-icon>
          <span>Profile</span>
        </v-tab>
      </div>

      <v-tab-item>
        <v-card flat>
          <v-container>
            <div class="scroller">
              <Statistics />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Resgistered Client</h2>
            </div>
            <div class="scroller">
              <Viewcustomers />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Car Detailing</h2>
            </div>
            <div class="scroller">
              <Registercustomer />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Home & Office Cleaning</h2>
            </div>
            <div class="scroller">
              <Homecleaning />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Cleaning of Household Items</h2>
            </div>
            <div class="scroller">
              <Householditems />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Car Rentals and Repairs</h2>
            </div>
            <div class="scroller">
              <Rentalsandrepairs />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Prestige Training Academy</h2>
            </div>
            <div class="scroller">
              <Prestigeacademy />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Prestige Franchising</h2>
            </div>
            <div class="scroller">
              <Franchising />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Packages</h2>
            </div>
            <div class="scroller">
              <Packages />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Services</h2>
            </div>
            <div class="scroller">
              <Service />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Cars</h2>
            </div>
            <div class="scroller">
              <Cartype />
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <div>
              <h2 class="regCustomer">Admin Details</h2>
            </div>
            <div class="scroller">
              <Profile />
            </div>
            <div>
              <v-btn @click="logout">Log out</v-btn>
            </div>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Registercustomer from "../../components/Registercustomer";
import Statistics from "../../components/Statistics";
import Viewcustomers from "../../components/Viewcustomers";
import Profile from "../../components/Profile";
import Packages from "../../components/Packages";
import Homecleaning from "../../components/Homecleaning.vue";
import Householditems from "../../components/Householditems.vue";
import Prestigeacademy from "../../components/Prestigeacademy.vue";
import Rentalsandrepairs from "../../components/Rentalsandrepairs.vue";
import Service from "../../components/Service.vue";
import Cartype from "../../components/Cartype.vue";
import Franchising from "../../components/Franchising.vue";
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  components: {
    Registercustomer,
    Statistics,
    Viewcustomers,
    Franchising,
    Profile,
    Packages,
    Homecleaning,
    Householditems,
    Prestigeacademy,
    Rentalsandrepairs,
    Service,
    Cartype,
  },
  computed: {
    email() {
      return this.getEmail();
    },
  },
  methods: {
    ...mapGetters({
      getEmail: "auth/getUser",
    }),
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      this.$router.push("/");
    },
  },
};
</script>

, Franchising
<style scoped>
.toolbar-head {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.logo-title {
  display: flex;
}
img {
  float: left;
}
h4 {
  margin-top: 20px;
}
.v-avatar {
  margin: 20px 10px 0 0;
  cursor: pointer;
}
.email {
  float: right;
  margin-top: 22px;
  cursor: pointer;
}
.v-tabs {
  min-height: 550px;
}
.v-tab {
  display: block;
}
.v-tab .v-icon {
  float: left;
  padding: 15px 0 0 10px;
  color: rgb(109, 199, 109);
}
.v-tab span {
  float: left;
  padding: 19px 0 0 10px;
}
.regCustomer {
  margin: 20px auto;
  color: rgb(109, 199, 109);
}
.scroller {
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
}
</style>
