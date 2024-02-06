
import { createSlice } from '@reduxjs/toolkit';

const SliceMessage = createSlice({
    name: 'message',
    initialState: {
        data: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.data = action.payload
        }
    }
})

const { reducer, actions } = SliceMessage;

const { addMessage } = actions

export {
    addMessage
}
export default reducer
