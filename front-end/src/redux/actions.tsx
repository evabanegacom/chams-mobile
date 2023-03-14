import axios from "axios"
import { AppDispatch } from "./store"
import * as types from "./types"

const apiUrl = "http://localhost:4000"

const headers = {
  "Content-Type": "application/json",
}

const fetchTodos = async () => {
  return await axios
    .get(`${apiUrl}/todo`, {
      headers: headers,
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const getTodos = () => async (dispatch) => {
  try {
    await dispatch({ type: types.GET_TODOS_BEGIN })
    const todos: any = await fetchTodos()
    dispatch({ type: types.GET_TODOS_SUCCESS, payload: todos.data })
  } catch (error: any) {
    dispatch({ type: types.GET_TODOS_FAILURE, message: error.message })
  }
}

const createTodo = async (todoInfo) => {
  return await axios
    .post(`${apiUrl}/todo`, todoInfo, {
      headers: headers,
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const addTodos = (todoInfo) => async (dispatch) => {
  try {
    await dispatch({ type: types.CREATE_TODOS_BEGIN })
    const create: any = await createTodo(todoInfo)
    dispatch({ type: types.CREATE_TODOS_SUCCESS, payload: create.data })
  } catch (error: any) {
    dispatch({ type: types.CREATE_TODOS_FAILURE, message: error.message })
  }
}

const editTodo = async (id, todoInfo) => {
  return await axios
    .put(`${apiUrl}/todo/${id}`, todoInfo, {
      headers: headers,
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const updateTodos = (id, todoInfo) => async (dispatch) => {
  try {
    await dispatch({ type: types.EDIT_TODOS_BEGIN })
    const update: any = await editTodo(id, todoInfo)
    dispatch({ type: types.EDIT_TODOS_SUCCESS, payload: update.data })
  } catch (error: any) {
    dispatch({ type: types.EDIT_TODOS_FAILURE, message: error.message })
  }
}

const deleteTodo = async (id: any) => {
  return await axios
    .delete(`${apiUrl}/todo/${id}`, {
      headers: headers,
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const removeTodo = (id: any) => async (dispatch) => {
  try {
    await dispatch({ type: types.DELETE_TODOS_BEGIN })
    const todo: any = await deleteTodo(id)
    console.log({todo})
    dispatch({ type: types.DELETE_TODOS_SUCCESS, payload: todo.data })
  } catch (error: any) {
    dispatch({ type: types.DELETE_TODOS_FAILURE, message: error.message })
  }
}

