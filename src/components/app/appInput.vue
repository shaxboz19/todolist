<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card px-3">
            <div class="card-body">
              <h4 class="card-title">Awesome Todo list</h4>
              <form>
                <div class="add-items ">
                  <input
                    type="text"
                    class="form-control todo-list-input"
                    placeholder="Название"
                    v-model="titleTodo"
                  />
                  <br />
                  <input
                    type="date"
                    class="form-control todo-list-input"
                    placeholder="Дата выполнения"
                    name="date"
                    v-model="dateTodo"
                  />
                  <br />
                  <input
                    type="text"
                    class="form-control todo-list-input"
                    placeholder="Кто выполняет"
                    v-model="name"
                  />
                  <div class="radio-buttons">
                    <h2>Приоритет</h2>
                    <div class="radio-item">
                      <input
                        type="radio"
                        id="firstLevel"
                        value="firstLevel"
                        v-model="level"
                        name="level"
                      />
                      <label for="firstLevel">Низкий</label>
                    </div>
                    <div class="radio-item">
                      <input
                        type="radio"
                        id="secondLevel"
                        value="secondLevel"
                        v-model="level"
                        name="level"
                      />
                      <label for="secondLevel">Средний</label>
                    </div>
                    <div class="radio-item">
                      <input
                        type="radio"
                        id="highLevel"
                        value="highLevel"
                        v-model="level"
                        name="level"
                      />
                      <label for="highLevel">Высокий</label>
                    </div>
                  </div>
                  <p class="error-text" v-if="error">
                    Название и имя человека обязательны!
                  </p>
                  <button
                    class="add btn btn-primary font-weight-bold todo-list-add-btn"
                    @click.prevent="onSubmit"
                    v-if="!isEdit"
                  >
                    Add
                  </button>
                  <button
                    class="add btn btn-primary font-weight-bold todo-list-add-btn"
                    @click.prevent="onEdit"
                    v-if="isEdit"
                  >
                    Edit
                  </button>
                </div>
              </form>
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
  props: {
    item: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      titleTodo: "",
      name: "",
      level: "firstLevel",
      dateTodo: null,
      error: false
    };
  },
  methods: {
    onSubmit() {
      if (this.titleTodo && this.name) {
        db.collection("todos").add({
          title: this.titleTodo,
          name: this.name,
          level: this.level,
          date: this.dateTodo
        });
        this.titleTodo = "";
        this.name = "";
        this.level = "firstLevel";
        this.dateTodo = null;
      } else {
        this.error = true;
      }
    },
    onEdit() {
      if (this.titleTodo && this.name) {
        db.collection("todos")
          .doc(this.item.id)
          .update({
            title: this.titleTodo,
            name: this.name,
            level: this.level,
            date: this.dateTodo
          });
        this.titleTodo = "";
        this.name = "";
        this.level = "firstLevel";
        this.dateTodo = null;
        this.$store.commit('cancelEdit')
      } else {
        this.error = true;
      }
    }
  },

  computed: {
    isEdit() {
      return this.$store.getters.isEdit;
    }
  },

  watch: {
    item(val) {
      if (val) {
        this.name = val.name;
        this.level = val.level;
        this.titleTodo = val.title;

        this.dateTodo = val.date;
      }
    },
    isEdit(val) {
      if (val == false) {
        this.titleTodo = "";
        this.name = "";
        this.level = "firstLevel";
        this.dateTodo = null;
      }
    }
  }
};
</script>