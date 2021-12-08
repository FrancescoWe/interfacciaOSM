<template>
<div>
  <BottomNav />
  <router-view />
  </div>
</template>

<script type="text/javascript">
  import BottomNav from '../components/BottomNav.vue'
  export default{
    components:{
        BottomNav // register component
    }
  }

</script>