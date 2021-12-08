<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header> 
    <ion-content class = "ion-padding">
      <ZipSearch/>
    </ion-content>
    <BottomNav/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import ZipSearch from "../components/ZipSearch";
  import BottomNav from "../components/BottomNav";

  export default {
    name: 'Home',
    components: { ZipSearch, BottomNav },
  }

</script>
