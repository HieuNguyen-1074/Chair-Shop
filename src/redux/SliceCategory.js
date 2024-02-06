import { createSlice } from "@reduxjs/toolkit";

const SliceCategory = createSlice({
  name: "category",
  initialState: {
    data: [],
  },
  reducers: {
    setCateGoryList: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { reducer, actions } = SliceCategory;
const { setCateGoryList } = actions;

export { setCateGoryList };
export default reducer;
