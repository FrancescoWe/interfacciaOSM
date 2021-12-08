<template>
  <div class = "popup" id="popup" text-align="center" justify-content="center" display="flex">
      <!--<h1 text-align="center" justify-content="center">this is my popup</h1>-->
      <form> 
            <!--<label for="fname">wewe</label><br>-->
            <input type="text" placeholder="Write a Nickname"><br>
       </form> 
       <row>
            <ion-button color="primary" class="my_button">Submit</ion-button> 
            <ion-button color="primary" class="my_button">Cancel</ion-button> 
       </row>
  </div>
</template>
<script>
export default {
    methods : {
        closeFunction(){
        }
    }
}
</script>

<style>
.popup{
    position: absolute;
    margin: 0 auto;
    text-align:center;
    background-color:white;
    justify-content: center;
    z-index:100;
    height: 25%;
    border-style:solid;
    border-color:black
}
input{
    /*background: transparent;
    border:none;
    text-align:center;*/
}
</style>