<template>
  <div>
    <h1 v-if="this.items" class="my_title">{{items[0].ID}}</h1>
    <ul>
      <li v-for="(value,index) in this.open" v-bind:key="'Q'+index">
        <QuestionForm :id="open[index].ID" :item="open[index].QUESTION" :type="open[index].TYPE" ref="openquests" />
      </li>
      <li v-for="(value,index) in this.validate" v-bind:key="'V'+index">
        <ValidationForm  :id="validate[index].ID" :item="validate[index].QUESTION" :type="open[index].TYPE" ref="validatequests"/>
      </li>
    </ul>
    <ion-button v-on:click="onSubmit" color = "primary" class="my_button">Submit</ion-button>
  </div>
</template>
<script>
import QuestionForm from './questions/QuestionForm.vue'
import ValidationForm from './questions/ValidationForm.vue'

export default {
  name: 'Test',
  props: ['items','open','validate'],
  components:{
      QuestionForm,
      ValidationForm
  },
  data(){
      return{
        validate_list:[],
        open_list:[],
        email_login:"",
        password_login:""
      }
  },
  mounted: function(){
      const values = this.items
      for(var i in values){
        if(values[i].VALIDATING=="no"){
          this.open_list.push(values[i])
        }else{
          this.validate_list.push(values[i])
        }
      }

  },
  updated() {
    this.$nextTick(function () {
      console.log(this.items.length)
      console.log(this.open.length)
      console.log(this.validate.length)
    // Code that will run only after the
    // entire view has been re-rendered
    })
  },
  methods:{
    onSubmit(e){
      e.preventDefault();
      //console.log(this)
      var answer ="";
      var question = "";
      var id ="";
      var type="";
      var cancella=true; //serve per sapere se eliminare completamente la strada
      this.$refs.openquests.forEach(i=>{
        answer=i.answer;
        question=i.item;
        id=i.id;
        type=i.type
        //console.log("risposta: "+answer) //risposta
        //console.log("domanda: "+question) //domanda
        //console.log("id: "+id) //id
        //console.log("type: "+type) //type

        //VERIFICO CHE LA RISPOSTA NON SIA VUOTA SE NON è VUOTA INVIO RISPOSTA
        if(i.answer!=""){
          //invia risposta
          this.sendAnswer(answer,id,question,type).then(items=>{
            console.log(items)
            console.log("Worked?")
          })
        }else{
          //altrimenti setto booleana cancella a false
          cancella=false
        }
      })
      if(cancella==true){
        //this.deleteGeometry(id,type)
        //cancella geometria della strada/nodo
        this.deleteGeometry(id,type).then(items=>{
          console.log("DELETED ALL" + items)
        })
      }
      this.$el.parentNode.removeChild(this.$el);
    },

    async deleteGeometry(id,type){
      console.log("entered_function "+id +type)
      var my_body = {
        "id":id,
        "type":type
      }
      console.log(type)
      try{
        const my_url = this.$api_url + "/posts/allAnswerCompleted"
        const requestSpatialite = {
          method:"post", 
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify(my_body)
        };
        const fetchdata = await fetch(my_url,requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            return new_response_data;
          }).catch((err)=>console.log(err))
          return fetchdata
      }catch(e){
        alert("Errorrrr")
      }
    },

    async sendAnswer(answer,id,question,type){
      var my_body = {
        "id": id,
        "answer": answer,
        "question": question,
        "type": type
      }
      console.log(my_body)
      try{
        const my_url = this.$api_url + "/posts/addAnswer"
        const requestSpatialite = {
          method:"post",
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify(my_body),
        };
        const fetchdata = await fetch(my_url,requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            //console.log(new_response_data); 
            return new_response_data;
          }).catch((err)=>console.log(err)) 
          return fetchdata
      }catch(e){
        alert("Error init");
      }
    }
  }
}
</script>

<style>
  .my_button{
    margin-left: auto;
    margin-right: 20px;
    float:right
  }

  .my_title{
    display:flex;
    justify-content:center;
  }
</style>


