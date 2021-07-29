<template>
  <div id="dasboard">
    <h4 class="">SwiftGas DashBoard</h4>
    <br />
    <b-row>
      <b-col md="12">
        <div class="container">
          <div class="col-md-8">
            <h6>Active Shops</h6>
            <k-progress
              :value="25"
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
              value="45%"
              line-height="13"
              percent="100"
              color="#242a37"
              active="true"
              show-progress
              active-color="#ff8900"
            ></k-progress>
          </div>
        </div>
      </b-col>
      <b-col col="5">
        <div class="">
          <div class="col-md-12">
            <div class="container-fluid container-xl d-flex container col-md-12">
              <h5>{{ active }}</h5>

              <h5>{{ inactive }}</h5>

              <h5>{{ noOfshops }}</h5>

              <h5>{{ noOfOrders }}</h5>
            </div>

            <div>
              <div class="row" id="fetch">
                <div class="with-header flexbox-container">
                  <div v-for="(vendor, id) in vendors" v-bind:key="id" class="col-md-9">
                    <b-card-group>
                      <v-avatar color="primary" size="56"></v-avatar>
                      <b-card
                        id="CardView"
                        img-left
                        :footer="vendor.shopNo"
                        tag="article"
                        style="max-height: 100rem"
                        class="flexbox-item col-md-12"
                      >
                        <div class="pa-7 secondary rounded-circle d-inline-block">
                          <img
                            id="V_Image"
                            style="border-radius: 50%"
                            :src="vendor.image"
                            alt=""
                          />
                        </div>
                        <b-card-text>
                          <span>{{ vendor.Name }}</span>
                        </b-card-text>
                      </b-card>
                    </b-card-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
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
      value: null,
      active: 0,
      inactive: 0,
      noOfshops: 0,
      noOfCustomers: null,
      noOfOrders: 0,
      totalPercent: 0,
      vendors: [],
      percentActive: null,
      percentInactive: null,
      max: 100,
      data1: [],
    };
  },
  created() {
    this.ActiveStatus;
  },

  computed() {
    this.ActiveStatus;
  },
  beforeUpdate() {
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
      console.log(this.totalPercent);
    },
  },
};
</script>
<style scoped>
#V_Image {
  width: 50px;
  height: 50px;
}
</style>
