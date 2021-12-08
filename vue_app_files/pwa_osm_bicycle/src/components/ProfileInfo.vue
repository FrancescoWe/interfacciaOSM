<template>
  <div>
    <div>
      <img :src="$auth.user.picture">
      <!--<h2>{{ $auth.user.nickname }}</h2>-->
      <ion-grid>
            <ion-row justify-content-center>
                <form> 
                    <ion-item>
                        <ion-input class="text-input" text-center :value=this.nickname :readonly=this.read_only></ion-input>
                        <ion-icon class="my_icon_class" :icon="this.my_icon" v-on:click="createNamePopup"></ion-icon>
                    </ion-item>
                </form>
                <popup v-if="editing"></popup>
            </ion-row>
      </ion-grid>

      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import Popup from'./Popup.vue';

export default{
    name: "ProfileInfo",
    components:{
      "popup" : Popup
    },
    data(){
        return{
            editing:null,
            read_only: null,
            nickname: null,
            my_icon:null,
        }
    },
    methods:{
        async updateName(){
            //console.log(this.$auth.user.nickname)
            var acc_token = await this.$auth.getTokenApi();
            var user_id = this.$auth.user.sub;
            console.log(acc_token);
            var token_to_use = "Bearer " + acc_token.access_token;
            var my_body = {
                "new_name": "provetta",
                "user_id": user_id
            }
            
            var my_url = this.$api_url + "/posts/user/changeUsername"
            try{
                var my_request = {
                    method: "post",
                    headers:{ "Content-Type":"application/json", "Authorization": token_to_use},
                    body:JSON.stringify(my_body)
                }
                const fetchdata = await fetch(my_url,my_request)
                .then(response => response.json())
                .then((new_response_data)=>{
                    console.log(new_response_data); 
                    return new_response_data;
                }).catch((err)=>console.log(err))
                    return fetchdata
            }catch(e){
                console.log(e)
            }
        },

        async createNamePopup(){
            this.editing=true;
        }
    },

    mounted:async function(){
        this.nickname = this.$auth.user.nickname;
        this.read_only = true;
        this.my_icon=require("@/assets/images/pencil-sharp.svg")

        //this.updateName()
        //CHIAMATA ALLA GAMIFICATION PER PRENDERE LIVELLI ECC...
    }
}
</script>

<style scoped>

ion-item{
  text-align : center;
  align-items:center;
}
.text-input{
    color:black;
    opacity:1
}
ion-icon{
    cursor:pointer
}

</style>
