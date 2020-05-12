<template>
  <div class="components-container board grey_bg">
    <Kanban
      :key="1"
      :list="todos"
      :group="group"
      class="kanban todo"
      header-text="Todo"
    />
    <Kanban
      :key="2"
      :list="working"
      :group="group"
      class="kanban working"
      header-text="Working"
    />
    <Kanban
      :key="3"
      :list="completed"
      :group="group"
      class="kanban done"
      header-text="Done"
    />
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ]
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      todos: (state) => state.dashboard.todoList
    }),
    working() {
      return this.todos.filter((todo) => !todo.done)
    },
    completed() {
      return this.todos.filter((todo) => todo.done)
    }
  },
  mounted() {
    this.$store.dispatch('GetTodoList', { params: { username: this.name } })
  }
}
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9 !important;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a !important;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d !important;
    }
  }
}
</style>
