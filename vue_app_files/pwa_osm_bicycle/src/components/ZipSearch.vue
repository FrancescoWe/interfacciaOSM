<template>
    <ion-grid>
        <form @click="onSubmit"> 
            <ion-col>
                <ion-item>
                    <ion-label> Email: </ion-label>
                    <ion-input :value="email_login" @input="email_login = $event.target.value" placeholder="Enter email" name="email_login"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label> Password: </ion-label>
                    <ion-input :value="password_login" @input="password_login = $event.target.value" placeholder = "Enter password" name="password login"></ion-input>
                 </ion-item>
            </ion-col>
            <ion-col>
                <ion-button color = "primary" expand="block">Login</ion-button>
            </ion-col>
        </form>
        <!---->

        <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>

        <!---->
    </ion-grid>
</template>

<script>
//import alertController from '@ionic/vue';

export default{
    name: "ZipSearch",
    data(){
        return{
            email_login:"",
            password_login:"",
        };
    },
    /* eslint-disable */
    methods:{
        onSubmit(e){
            e.preventDefault();
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(this.email_login)==true){
                console.log("ok");
            }else{
                this.showAlert()
                console.log("WORKING?????");
            }
            //I have to check if it is indeed an email
        },
        showAlert(){
            alert('email_not_in_the_correct_format');
            /*return this.$ionic.alertController.create({
                header: "yo",
                message:"ye",
                buttons: ["ok"]
            }).then(a=>a.present());*/
        },

        login() {
            this.$auth.loginWithRedirect();
        },
        // Log the user out
        logout() {
            this.$auth.logout({
            returnTo: window.location.origin
            });
        }, 
    },
}
</script>
