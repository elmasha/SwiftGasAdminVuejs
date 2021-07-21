<template>
  <div><h2>Add cylinder</h2>
      <div class="row">
              
              <div>
                <form @submit.prevent="UpoadStory">
               
                <div class="row form-group  cols-9 md-9" >
                    <label id="label" for="title">Upload story image:</label>
                    <input type="file" @change="previewImage" accept="image/*" >
                    <br>
            
                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                </div>



                 <div class="row form-group">
                    <br>
                    <label id="label" for="title">Select kg</label>
                   <v-select class="col-md-6" v-model="kg" :options="['3kg','6kg','13kg','22kg','50kg']" />
                    <br><br><br>
                    <h5>You selected: {{ kg}}</h5>
                 </div>
                
                <div class="row form-group  cols-9 md-9" >
                    <label id="label" for="title">Enter cylinder name</label>
                    <input type="text" placeholder="Gas name" v-model="name" id="title" >
                </div>

                <button type="submit" id="btn" class="btn">Upload cylinder</button>
                
                </form>
              
              </div>
      
      
      
      
      </div>

      <div><h2>Add Accessories</h2>

      <div class="row">
      

     
      <div>
                <form @submit.prevent="UpoadAccess">
               
                <div class="row form-group  cols-9 md-9" >
                    <label id="label" for="title">Upload story image:</label>
                    <input type="file" @change="previewImage" accept="image/*" >
                    <br>
            
                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                </div>


                <div class="row form-group  cols-9 md-9" >
                    <label id="label" for="title">Enter cylinder name</label>
                    <input type="text" placeholder="Gas name" v-model="accessname" id="title" >
                </div>

                <button type="submit" id="btn" class="btn">Upload Accessories</button>
                
                </form>
              
              </div>
      
      
      
      
      
      </div>

      </div>
  
  
  </div>
</template>
<script>

import db from './firebaseInit'
import firebase from 'firebase'
export default {
name:'addcylinder',

data() {
  return {
            kg:"",
            name:null,
            imageUrl:null,
            uploadValue: 0,
            imageData :null,
            accessImage:null,
            accessname:null

  }
},methods: { 
  
        
        previewImage(event) {
        this.uploadValue=0;
        this.imageData = event.target.files[0];
        },
        UpoadStory(){
            const storageRef= firebase.storage().ref(`Cylinderimages/${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            },error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
            
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.imageUrl =url;
                 db.collection('Admin').doc("Gas_Cylinder").collection("Images&KG").doc().set({
                        kg: this.kg,
                        name: this.name,
                        Cylinder_image: url,
                        timestamp:new Date,
                    }).then(docRef =>{
                        console.log("Added gas"+docRef)
                       //this.$router.push("/")
                        this.kg="",
                        this.name=null,
                        this.imageUrl=null,
                        this.uploadValue= 0,
                        this.imageData =null
                    }).catch(error => console.error(error))
                });
            }
            );
                   
        },
        UpoadAccess(){
            const storageRef= firebase.storage().ref(`Cylinderimages/${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            },error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
            
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.accessImage =url;
                 db.collection('Admin').doc("Gas_Cylinder").collection("AcessoryImages").doc().set({
                        name: this.accessname,
                        Accessory_image: url,
                        timestamp:new Date,
                    }).then(docRef =>{
                        console.log("Added gas"+docRef)
                       //this.$router.push("/")
                        this.accessname=null
            
                    }).catch(error => console.error(error))
                });
            }
            );
                   
        }

},

};
</script>
