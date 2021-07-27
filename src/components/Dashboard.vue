<template>
  <div>
    <h4 class="" align="center">SwiftGas DashBoard</h4>
    <br />
    <br />
    <div class="container">
      <div>
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="12" md="8">
              <div class="flex-start">
                <h6>Active Shops</h6>
                <k-progress
                  :value="25"
                  variant="success"
                  :percent="45"
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
              <br />
              <br />
              <div class="container">
                <div class="col-md-12">
                  <div class="row">
                    <span
                      ><h2>{{ Active }}</h2></span
                    >
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="6" md="4"></b-col>
          </b-row>
        </b-container>
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
      active: null,
      inactive: null,
      noOfshops: null,
      noOfCustomers: null,
      noOfOrders: null,
      percentActive: null,
      percentInactive: null,
      max: 100,
      data1: [],
    };
  },

  mounted() {
    db.collection("Admin")
      .doc("Elmasha")
      .get()
      .then((queryResult) => {
        console.log(queryResult.data());
        const data = {
          id: queryResult.id,
          Active: queryResult.data().Active_Shops,
          Inactive: queryResult.data().Inactive_shops,
          NoOrders: queryResult.data().No_of_Orders,
          NoCustomers: queryResult.data().Registered_Customers,
          NoVendors: queryResult.data().Registered_Vendors,
          NoShops: queryResult.data().Total_No_Shops,
        };
        console.log(data);
        this.data1.push(data);
      });
  },
};
</script>
