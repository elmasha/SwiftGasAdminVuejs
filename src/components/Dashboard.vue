<template>
  <div>
    <h4 class="">SwiftGas DashBoard</h4>
    <br />
    <div class="container">
      <div class="col-md-12">
        <div class="col-md-6">
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

        <div class="col-md-6">
          <div class="container">
            <div class="">
              <div class="container-fluid container-xl d-flex container col-md-12"></div>
              <div class="row">
                <div class="col-md-3">
                  <h2>{{ active }}</h2>
                </div>
                <div class="col-md-3">
                  <h2>{{ inactive }}</h2>
                </div>
                <div class="col-md-3">
                  <h2>{{ noOfshops }}</h2>
                </div>
                <div class="col-md-3">
                  <h2>{{ noOfOrders }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
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
