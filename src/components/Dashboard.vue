<template>
  <div id="dashboard">
    <h4 class="">SwiftGas DashBoard</h4>
    <br />
    <b-container class="text-center">
      <b-row align-v="center">
        <b-col md="12">
          <div class="container">
            <div class="col-md-12">
              <h6>Active Shops</h6>
              <k-progress
                variant="success"
                :percent="totalPercent"
                :striped="striped"
                line-height="13"
                active="true"
                color="#242a37"
                active-color="#ff8900"
              ></k-progress>
              <h6>InActive Shops</h6>
              <k-progress
                line-height="13"
                :percent="totalPercent2"
                color="#242a37"
                active="true"
                show-progress
                active-color="#ff8900"
              ></k-progress>
            </div>
          </div>
        </b-col>

        <div class="container text-center">
          <v-container class="my-12">
            <v-layout row wrap justify-space-around>
              <v-flex xs6 md4>
                <h6>
                  <strong id="showValue">{{ noOfshops }}</strong>
                  <br /><span id="labelVal"> Shops OnBoard</span>
                </h6>
              </v-flex>
              <v-flex xs6 md4>
                <h6>
                  <strong id="showValue">{{ noOfCustomers }}</strong>
                  <br />
                  <span id="labelVal">All Customer </span>
                </h6>
              </v-flex>
              <v-flex text-xs-centered xs12 md4>
                <h6>
                  <strong id="showValue">{{ noOfOrders }}</strong>
                  <br />
                  <span id="labelVal">Total Orders </span>
                </h6>
              </v-flex>
              <v-flex xs6 md4> </v-flex>
            </v-layout>
          </v-container>
        </div>

        <b-col col="9" md="9">
          <div class="text-center">
            <div id="dash" class="container-xl d-flex col-md-9">
              {{ ActiveStatus() }}
            </div>

            <div>
              <div class="" id="fetch">
                <div class="with-header">
                  <h5>Registered shops</h5>
                  <perfect-scrollbar>
                    <div
                      v-for="(vendor, id) in vendors"
                      v-bind:key="id"
                      class="col-md-5 text-center"
                    >
                      <div class="pa-9 secondary rounded-circle d-inline-block">
                        <img
                          id="V_Image"
                          style="border-radius: 50%"
                          :src="vendor.image"
                          alt=""
                        />
                        <div>
                          <span>{{ vendor.Name }}</span>
                          <br />
                          <span>{{ vendor.shopNo }}</span>
                          <br />
                          <span>{{ vendor.shopName }}</span>
                        </div>
                      </div>
                    </div>
                  </perfect-scrollbar>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <div class="container">
      <div class="col-md-12">
        <div class="row"></div>
      </div>

      <div class="fixed-action-btn">
        <router-link to="/addcylinder" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      timerEnabled: false,
      timerCount: 10,
      value: null,
      active: 0,
      inactive: 0,
      noOfshops: 0,
      noOfCustomers: null,
      noOfOrders: 0,
      totalPercent: 0,
      totalPercent2: 0,
      vendors: [],

      percentActive: 0,
      percentInactive: 0,
      max: 100,
      data1: [],
    };
  },

  beforeUpdate() {
    this.ActiveStatus;
  },
  updated() {
    this.ActiveStatus;
  },
  beforeMount() {
    this.ActiveStatus;
  },

  created() {
    this.ActiveStatus;
  },

  computed() {
    this.ActiveStatus;
  },

  mounted() {
    db.collection("SwiftGas_Vendor")
      .get()
      .then((queryResult) => {
        queryResult.forEach((doc) => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            Name: doc.data().first_name,
            shopName: doc.data().ShopName,
            shopNo: doc.data().Shop_No,
            image: doc.data().User_Image,
          };
          this.vendors.push(data);
        });
      });
    db.collection("Admin")
      .doc("Elmasha")
      .get()
      .then((queryResult) => {
        console.log(queryResult.data());

        (this.active = queryResult.data().Active_Shops),
          (this.inactive = queryResult.data().Inactive_shops),
          (this.noOfOrders = queryResult.data().No_of_Orders),
          (this.noOfCustomers = queryResult.data().Registered_Customers),
          (this.noOfshops = queryResult.data().Registered_Vendors),
          (this.noOfshops = queryResult.data().Total_No_Shops);
      });
  },
  methods: {
    ActiveStatus() {
      var average = this.active / this.noOfshops;
      this.totalPercent = average * 100;
      console.log("Total Percentage", this.totalPercent);

      var average2 = this.inactive / this.noOfshops;
      this.totalPercent2 = average2 * 100;
      console.log("Total Percentage", this.totalPercent2);
    },
  },
};
</script>
<style scoped>
#dash {
  display: table;
  margin: 0 auto;
}
#V_Image {
  width: 40px;
  height: 40px;
}
#labelVal {
  font-weight: 500;
  font-size: 18px;
}
#showValue {
  font-size: 30px;
  color: #ff8900;
  margin: 30px;
  margin-bottom: 20px;
}

.ps {
  height: 500px;
}
</style>
