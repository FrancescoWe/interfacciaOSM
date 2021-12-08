<template>
    <!--
    <form>
        <label for="fname">{{item}}</label><br>
        <input type="text"><br>
    </form>-->
    <div>
        <label>{{item}}</label><br>
        <div class='content'>
            <div class="radiocheck">
                <input type="radio" name="si_no" id="yes_answer" v-model="answer" value="true">
                <label for="si_no">Sì</label>
            </div>
            <div class="radiocheck">
                <input type="radio" name="si_no" id="no_answer" v-model="answer" value="false">
                <label for="si_no">No</label>
            </div>
        </div>
            <!--<small>Model value: {{ answer }}</small>-->
    </div>
</template>

<script>

export default{
    name:"ValidationForm",
    props:['item','id','type'],
    data(){
        return{
            answer:"",
        }
    },
}
</script>

<style>
  small {
    display: block;
  }

  .content{
    display: flex;
    justify-content: space-between;
  }

  .radiocheck{
    margin: auto;
  }
</style>
