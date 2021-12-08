<template>
  <div class= "ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header> 
    <br>
    <ion-content class = "ion-text-center" justify-content-center>
        <ProfileInfo/>
    </ion-content>
    <BottomNav/>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
import ProfileInfo from "../components/ProfileInfo";

export default{
    name: "Profile",
    components: {BottomNav, ProfileInfo},
    methods:{

    },
}
</script>
