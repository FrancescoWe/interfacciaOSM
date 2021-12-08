<template>
  <div>
      <md-bottom-bar md-sync-route align-items="center" align-content="center">
        <div class="elementi">
          <!--<md-bottom-bar-item to="/nonexistat" exact md-label="post" md-icon="post"></md-bottom-bar-item>-->
          <md-bottom-bar-item to="/classifica" exact md-label="classifica">
            <img class="png-icon" src="../assets/images/211747_flag_icon.png" v-bind:style="filterClass">
          </md-bottom-bar-item>
          <md-bottom-bar-item to="/mytiles" md-label="Home">
            <img class="png-icon" src="../assets/images/home.png" v-bind:style="filterHome">
          </md-bottom-bar-item>
          <md-bottom-bar-item to="/profile" md-label="Profile">
            <img class="png-icon" src="../assets/images/3289576_user_icon.png" v-bind:style="filterProfile">
          </md-bottom-bar-item>
        </div>
      </md-bottom-bar>
  </div>
</template>

<script>
  export default {
    name: 'BottomNav',
    data(){
        return{
            filterHome:"filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);",
            filterProfile:"filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);",
            filterClass:"filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);",
        }
    },
    created(){
      var currentUrl = window.location.pathname;
      console.log("yo"+currentUrl)
      switch(currentUrl){
        //case "/": this.filterHome="filter: invert(0%) sepia(95%) saturate(20%) hue-rotate(39deg) brightness(93%) contrast(107%);"; break;
        case "/mytiles": this.filterHome="filter: invert(0%) sepia(95%) saturate(20%) hue-rotate(39deg) brightness(93%) contrast(107%);"; break;
        case "/profile": this.filterProfile="filter: invert(0%) sepia(95%) saturate(20%) hue-rotate(39deg) brightness(93%) contrast(107%);"; break;
        case "/classification": this.filterClass="filter: invert(0%) sepia(95%) saturate(20%) hue-rotate(39deg) brightness(93%) contrast(107%);"; break;
        default: this.filterHome="filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);";
                this.filterProfile="filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);";
                this.filterClass="filter: invert(97%) sepia(3%) saturate(11%) hue-rotate(107deg) brightness(104%) contrast(104%);";
                
      }
    }
  }
</script>

<!--<style lang="scss" scoped>
  .phone-viewport {
    width: 322px;
    height: 200px;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
  }
</style>-->
<style scoped>
  .md-bottom-bar{
    background:rgb(27, 218, 186);
  }
  .elementi{
    display:flex;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .png-icon{
    width: 24px;
    height: 24px; 
  }

</style>

