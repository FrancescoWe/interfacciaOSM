<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>HomePage</ion-title>
      </ion-toolbar>
    </ion-header> 
    <ion-content class = "ion-padding">
        <MyTiles/>
    </ion-content>
    <BottomNav/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyTiles from "../components/MyTiles";
  import BottomNav from "../components/BottomNav";
  //console.log("called once");
  export default {
    name: 'TilesVector',
    components: { MyTiles, BottomNav }
  }
</script>
