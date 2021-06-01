<template>
  <div class="user">
    <user-todo></user-todo>
  </div>
</template>

<script>
// @ is an alias to /src
import userTodo from '../components/userTodo'

export default {
  name: 'user',
  components: {
    userTodo
    
  }
}
</script>
