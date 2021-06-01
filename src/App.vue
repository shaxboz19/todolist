<template>
  <div>
    <component :is='layout'>
      <router-view></router-view>
    </component>
    
  </div>
</template>

<script>
import AdminLayout  from './layout/adminLayout'
import EmptyLayout  from './layout/emptyLayout'
export default {
  name : 'app',
  components : {
    AdminLayout, 
    EmptyLayout
  },
  computed:{
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style>

</style>
