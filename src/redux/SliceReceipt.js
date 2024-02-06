
import { createSlice } from '@reduxjs/toolkit';

const sliceReceipt = createSlice({
    name: 'receipt',
    initialState: {
        data: []
    },
    reducers: {
        getReceipt: (state, action) => {
            state.data = action.payload
        },
        removeReceipt: (state, action) => {

            state.data = state.data.filter((item, index) => {
                return item.RECEIPTCODE != action.payload
            })
        },
        confirmReceipt: (state, action) => {
            state.data = state.data.map(element => {
                return element.RECEIPTCODE === action.payload ? {
                    ...element,
                    STATUS: 'CONFIRMED'
                } :
                    element
            })
        },
        receivedReceipt: (state, action) => {
            state.data = state.data.map(element => {
                return element.RECEIPTCODE === action.payload ? {
                    ...element,
                    STATUS: 'RECEIVED'
                } :
                    element
            })
        }
    }
})

const { reducer, actions } = sliceReceipt;

export const { getReceipt, removeReceipt, confirmReceipt, receivedReceipt } = actions;
export default reducer