import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export const useTodos = () => {
  const todos = ref(localStorageHandlers.get('todos'))

  const addNewTodo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    const freshTodoId = crypto.randomUUID()

    const newTodo = {
      id: freshTodoId,
      content: newText
    }

    localStorageHandlers.create('todos', newTodo)

    todos.value.push({
      id: freshTodoId,
      content: newText
    })
  }

  const removeTodo = (targetId) => {
    localStorageHandlers.remove('todos', targetId)

    const indexToRemove = todos.value.findIndex((todo) => todo.id === targetId)
    todos.value.splice(indexToRemove, 1)
  }

  const updateTodo = (targetId, updateText) => {
    localStorageHandlers.update('todos', targetId, updateText)

    todos.value = todos.value.map((todo) => {
      if (todo.id === targetId) {
        return { ...todo, content: updateText }
      }

      return todo
    })
  }

  return { todos, addNewTodo, removeTodo, updateTodo }
}
