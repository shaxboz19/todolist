<template>
  <div>
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card px-3">
              <div class="card-body">
                <div class="list-wrapper">
                  <ul class="d-flex flex-column-reverse todo-list">
                    <li v-for="todo in todos" :key="todo.id">
                      <div class="form-check list-item ">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox" />
                          <strong>Название:</strong> {{ todo.title }}
                          <strong>дата:</strong> {{ todo.date }}
                          <strong>Выполняет:</strong> {{ todo.name }}
                        </label>
                        <div class="buttons">
                          <button
                            class="btn btn-warning "
                            v-if="!isEdit"
                            @click.prevent="$emit('change', todo), edit"
                          >
                            Изменить
                          </button>
                          <button
                            class="btn btn-warning "
                            v-if="isEdit"
                            @click.prevent="cancelEdit"
                          >
                            Отмена
                          </button>
                          <button
                            class="btn btn-danger"
                            @click.prevent="remove(todo)"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                      <i class="remove mdi mdi-close-circle-outline"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  emits: ["change"],
  data() {
    return {
      todos: []
    };
  },

  methods: {
    remove(item) {
      db.collection("todos")
        .doc(item.id)
        .delete();
    },
    edit() {
      this.isEdit = true;
    },
    cancelEdit() {
      this.$store.commit("cancelEdit");
    }
  },

  firestore: {
    todos: db.collection("todos").orderBy("date")
  },

  computed: {
    isEdit() {
      return this.$store.getters.isEdit;
    }
  },

  mounted() {
    console.log(this.todos);
  }
};
</script>











<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
}
</style>