import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (completed, thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:4000/todo/${completed}`)

        if (!response.ok) {
            throw new Error('Упс... Ошибка сервера!')
        }
        
        const todos = await response.json()

        return todos
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const createTodos = createAsyncThunk('todos/createTodos', async (text, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/todo/', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ text })
        })
        const todos = await response.json()

        if (!response.ok) {
            throw new Error('Упс... Временно не могу добавлять задачи!')
        }

        return todos
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const updateTodos = createAsyncThunk('todos/updateTodos', async ({ id, completed }, thunkAPI) => {
    try {
       const response = await fetch(`http://localhost:4000/todo/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ completed })
       })
       if (!response.ok) {
            throw new Error('Упс... Временно не могу изменять задачи!')
        }
        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const editingTodos = createAsyncThunk('todos/editingTodos', async (data, thunkAPI) => {
    try {
       const { text, editing, id } = data
       const response = await fetch(`http://localhost:4000/todo/edit/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ text, editing })
       })

       if (!response.ok) {
            throw new Error('Упс... Временно не могу редактировать задачи!')
        }

        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteTodos = createAsyncThunk('todos/deleteTodos', async ({ id, completed }, thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:4000/todo/${id}`, {
            method : 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Упс... Временно не могу удалять задачи!')
        }

        console.log(id, completed)

        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteAllTodos = createAsyncThunk('todos/deleteAllTodos', async (_, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/delete', {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Произошла какая-то ошибка...')
        }

        return 'Всё чётко!'
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

const todoSlice = createSlice({
    name : 'todos',
    initialState: {
        todo: [],
        isLoading: false,
        error: null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todo = action.payload
            state.error = null
            state.isLoading = false
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
        .addCase(createTodos.fulfilled, (state, action) => {
            state.todo.push(action.payload)
            state.error = null
        })
        .addCase(createTodos.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(updateTodos.fulfilled, (state, action) => {
            state.todo = state.todo.map((item) => {
                if (item._id === action.payload) {
                    item.completed = !item.completed
                    if (item.completed) {
                        item.updatedAt = new Date()
                    }
                }
                return item
            })
            state.error = null
        })
        .addCase(updateTodos.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(editingTodos.fulfilled, (state, action) => {
            state.todo = state.todo.map((item) => {
                if (item._id === action.payload.id) {
                    item.editing = !item.editing
                    item.text = action.payload.text
                }
                return item
            })
            state.error = null
        })
        .addCase(editingTodos.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(deleteTodos.fulfilled, (state, action) => {
            state.todo = state.todo.filter((item) => item._id !== action.payload)
            state.error = null
        })
        .addCase(deleteTodos.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(deleteAllTodos.fulfilled, (state) => {
            state.todo = []
        })
        .addCase(deleteAllTodos.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default todoSlice.reducer