<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        @keyup.enter="addTodo"
      />
    </header>
    <!-- main section -->
    <section class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :class="{ selected: visibility === key }"
            @click.prevent="visibility = key"
            >{{ key | capitalize }}</a
          >
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import { mapGetters, mapState } from 'vuex'
const STORAGE_KEY = 'todos'
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done)
}

export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + 's'),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: 'all',
      filters
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
    }
  },
  computed: {
    allChecked() {
      if (this.todos) {
        return this.todos.every((todo) => todo.done)
      }
    },
    filteredTodos() {
      if (this.todos) {
        return filters[this.visibility](this.todos)
      }
    },
    remaining() {
      if (this.todos) {
        return this.todos.filter((todo) => !todo.done).length
      }
    },
    ...mapGetters(['name']),
    ...mapState({
      todos: (state) => state.dashboard.todoList
    })
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    async setTodo() {
      await this.$store.dispatch('SetListAll', {
        username: this.name,
        todo: this.todos
      })
    },
    async addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setTodo()
        e.target.value = ''
      }
    },
    //切换状态
    toggleTodo(val) {
      val.done = !val.done
      this.setTodo()
    },
    //删除
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setTodo()
    },
    //编辑
    editTodo({ todo, value }) {
      todo.text = value
      console.log({ todo, value })
      this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.done)
      console.log(this.todos)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach((todo) => {
        todo.done = done
        this.setLocalStorage()
      })
    }
  },
  mounted() {
    this.$store.dispatch('GetTodoList', { params: { username: this.name } })
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
