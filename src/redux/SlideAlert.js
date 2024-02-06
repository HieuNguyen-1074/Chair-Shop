
import { createSlice } from '@reduxjs/toolkit';

const sliceAlert = createSlice({
    name: 'alert',
    initialState: {
        data: [

        ]
    },
    reducers: {
        addAlert: (state, action) => {

            const newAlert = {
                ...action.payload,
                code: Math.random().toString(36)
            }
            state.data.push(newAlert)

        },
        deleteAlert: (state, action) => {
            state.data = state.data.filter((element) => {
                return element.code != action.payload
            })
        }
    }
})
const { actions, reducer } = sliceAlert
export const { addAlert, deleteAlert } = actions


export default reducer