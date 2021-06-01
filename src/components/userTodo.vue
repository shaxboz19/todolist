<template>
  <div class="container ">
    <h2 class="text-center">{{ userName }}</h2>
    <div class="row d-flex justify-content-center container">
      <div class="card-header-tab card-header">
        <div
          class="card-header-title font-size-lg text-capitalize font-weight-normal"
        >
          <i class="fa fa-tasks"></i>&nbsp;Task Lists
        </div>
      </div>
      <div class="scroll-area-sm">
        <div style="position: static;" class="ps ps--active-y">
          <div class="ps-content">
            <ul class=" list-group list-group-flush">
              <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                <div class="todo-indicator bg-warning"></div>
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left mr-2">
                      <div class="custom-checkbox custom-control">
                        <label
                          class="custom-control-label"
                          for="exampleCustomCheckbox12"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        <strike v-if="todo.isDone"> {{ todo.title }}</strike>
                        <span v-else>{{ todo.title }} </span>
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <button
                        class="border-0 btn-transition btn btn-outline-success"
                        @click="done(todo)"
                      >
                        <i class="fa fa-check">Выполнено</i>
                      </button>
                      <button
                        class="border-0 btn-transition btn btn-outline-danger"
                        @click="cancelDone(todo)"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      todos: [],
      
    };
  },
  methods: {
    done(todo) {
      console.log(todo);
      db.collection("todos")
        .doc(todo.id)
        .update({ ...todo, isDone: true });
    },
    cancelDone(todo) {
      console.log(todo.id);
      db.collection("todos")
        .doc(todo.id)
        .update({ ...todo, isDone: false });
    }
  },

  computed: {
    userName() {
      return this.$store.getters.getName;
    }
  },

  async mounted() {
    const querySnapshot = await db
      .collection("todos")
      .where("name", "==", this.userName);

    querySnapshot.onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          this.todos.push({ ...change.doc.data(), id: change.doc.id });
          console.log({ ...change.doc.data(), id: change.doc.id });
        }
        if (change.type === "modified") {
          // this.todos = {...change.doc.data(), id : change.doc.id}
          this.todos = [{ ...change.doc.data(), id: change.doc.id }];
        }
        // if (change.type === 'removed') {
        //   console.log('Removed city: ', change.doc.data());
        // }
      });
    });
  }


  // firestore : {
  //   todos : db.collection('todos').where('name', '==', this.userName )
  // }
};
</script>












<style scoped>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: left;
  background-color: #6200ea;
}

i {
  font-style: italic;
}

.container {
  margin-top: 100px;
}

.card {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  border-width: 0;
  transition: all 0.2s;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card-header {
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0.625rem;
  height: 3.5rem;
  background-color: #fff;
}

.widget-subheading {
  color: #858a8e;
  font-size: 10px;
}

.card-header.card-header-tab .card-header-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.card-header .header-icon {
  font-size: 1.65rem;
  margin-right: 0.625rem;
}

.card-header.card-header-tab .card-header-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.btn-actions-pane-right {
  margin-left: auto;
  white-space: nowrap;
}

.text-capitalize {
  text-transform: capitalize !important;
}

.scroll-area-sm {
  height: 288px;
  overflow-x: hidden;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}

.todo-indicator {
  position: absolute;
  width: 4px;
  height: 60%;
  border-radius: 0.3rem;
  left: 0.625rem;
  top: 20%;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.bg-warning {
  background-color: #f7b924 !important;
}

.widget-content {
  padding: 1rem;
  flex-direction: row;
  align-items: center;
}

.widget-content .widget-content-wrapper {
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
}

.widget-content .widget-content-right.widget-content-actions {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
}

.widget-content .widget-content-right {
  margin-left: auto;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.btn {
  position: relative;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s,
    box-shadow 0.15s;
}

.btn-outline-success {
  color: #3ac47d;
  border-color: #3ac47d;
}

.btn-outline-success:hover {
  color: #fff;
  background-color: #3ac47d;
  border-color: #3ac47d;
}

.btn-outline-success:hover {
  color: #fff;
  background-color: #3ac47d;
  border-color: #3ac47d;
}

.btn-primary {
  color: #fff;
  background-color: #3f6ad8;
  border-color: #3f6ad8;
}

.btn {
  position: relative;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s,
    box-shadow 0.15s;
  outline: none !important;
}

.card-footer {
  background-color: #fff;
}
</style>