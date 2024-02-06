import { createSlice } from '@reduxjs/toolkit'

const sliceProduct = createSlice({
    name: 'PRODUCT',
    initialState: {
        data: []
    },
    reducers: {
        getProduct: (state, action) => {
            // console.log(action.payload)
            state.data = action.payload
        },
        deleteProductImg: (state, action) => {
            console.log(action.payload)
            state.data = state.data.map((element) => {
                if (element.PRODUCTCODE === action.payload.idProduct) {
                    let newImgArr;


                    newImgArr = element.IMGARR.filter((element) => {
                        return element.id != action.payload.idImg
                    })


                    return {
                        ...element,
                        IMGARR: newImgArr
                    }

                }
                else {
                    return { ...element }
                }

            })

        },
        deleteProduct: (state, action) => {
            state.data = state.data.filter((element) => {
                return element.PRODUCTCODE != action.payload
            })
        }
    }
})
const { actions, reducer } = sliceProduct
export const { getProduct, deleteProductImg, deleteProduct } = actions
export default reducer
