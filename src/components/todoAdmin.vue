<template>
  <div>
    <h1 class="text-center">Админ</h1>
      <app-input :item = "item"></app-input>
      <app-lists @change = "changeItem"></app-lists>
   
  </div>
</template>

<script>
//import { db } from "../firebase";
import appInput from './app/appInput'
import appLists from './app/appLists'
export default {
  components :{
    appInput,
    appLists
  },
  data() {
    return {
      item : null
     
    };
  },
  methods: {
    changeItem(item) {
      this.$store.commit('isEdit');
      this.item = {
        ...item,  id :item.id
      } 
      console.log(this.$store.getters.isEdit);
       
    }
   
  },
 
};
</script>


<style scoped>
.radio-buttons {
  display: block;
}
.error-text {
  color: red;
}
</style>