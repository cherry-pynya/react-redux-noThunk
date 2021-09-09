import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { pending } from '../URL';

const data = [];

export const listSlice = createSlice({
  name: 'list',
  initialState: {
      data,
      status: pending,
  },
  reducers: {
    add: (state, action) => {
        const { name, price } = action.payload;
        state.data = [...state.data, {id: nanoid(), name, price: Number(price)}];
    },
    remove: (state, action) => {
        const { id } = action.payload;
        state.data = state.data.filter((el) => el.id !== id);
    },
    edit: (state, action) => {
        const { id, name, price } = action.payload;
        const index = state.data.findIndex((el) => el.id === id);
        state.data[index].name = name;
        state.data[index].price = price;
    },
    get: (state, action) => {
        state.data = action.payload;
    },
    changeStatus: (state, action) => {
        state.status = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, edit, get, changeStatus } = listSlice.actions

export const lastId = state => state.data[state.data.length - 1].id;

export default listSlice.reducer