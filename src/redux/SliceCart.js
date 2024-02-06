import { createSlice } from "@reduxjs/toolkit";
import { screen } from "@testing-library/react";

const saveLocal = function (data) {
  localStorage.setItem("cart", JSON.stringify(data));
};

const SliceCart = createSlice({
  name: "cart",
  initialState: {
    data: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addCart: (state, action) => {
      state.data.push(action.payload);
      saveLocal(state.data);
    },
    increaseQuality: (state, action) => {
      state.data = state.data.map((item, index) => {
        return item.id === action.payload
          ? { ...item, quality: item.quality + 1 }
          : item;
      });
      saveLocal(state.data);
    },
    reduceQuality: (state, action) => {
      const data = [];
      state.data.forEach((item, index) => {
        if (item.id === action.payload) {
          item.quality - 1 === 0
            ? (state.data = state.data.filter((item) => {
                return item.id != action.payload;
              }))
            : data.push({
                ...item,
                quality: item.quality - 1,
              });
        } else {
          data.push(item);
        }
      });
      state.data = data;
      saveLocal(state.data);
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item, index) => {
        return item.id != action.payload;
      });
      saveLocal(state.data);
    },
    removeAll: (state, action) => {
      state.data = action.payload;
      saveLocal(state.data);
    },
  },
});

const { actions, reducer } = SliceCart;

const { addCart, increaseQuality, reduceQuality, removeItem, removeAll } =
  actions;

export { addCart, increaseQuality, reduceQuality, removeItem, removeAll };
export default reducer;
