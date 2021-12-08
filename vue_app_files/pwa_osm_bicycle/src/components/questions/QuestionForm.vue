<template>
  <div>
    <!--<h1>chimichangaaaa</h1>-->
    <form>
        <label for="fname">{{item}}</label><br>
        <input type="text" v-model="answer"><br>
        <!--<input type="submit" value="Submit">-->
    </form>
  </div>
</template>
<script>

export default{
    name: "QuestionForm",
    props: ['item','id','type'],
    data(){
        return{
            answer:"",
        }
    },
    /* eslint-disable */
}
</script>