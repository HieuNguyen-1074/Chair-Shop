
import { createSlice } from '@reduxjs/toolkit';

const sliceUser = createSlice({
    name: 'user',
    initialState: {
        data: {

        }
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload
        },
        removeUser: (state, action) => {
            state.data = state.data.filter(element => {

                return element.ACCOUNTCODE != action.payload
            })
        }
    }
})

const { actions, reducer } = sliceUser

export const { setUser, removeUser } = actions

export default reducer