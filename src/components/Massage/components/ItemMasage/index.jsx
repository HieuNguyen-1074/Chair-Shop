import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { AiOutlineCheck } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { deleteAlert } from '../../../../redux/SlideAlert'
function ItemMessage(props) {

    const { data } = props
    console.log(data);
    const dispatch = useDispatch()
    useEffect(() => {

        const a = setTimeout(() => {
            if( Object.keys(data).length !== 0){
                dispatch(deleteAlert(data.code))
            }
        }, 2000);

        return () => {
            clearTimeout(a)
        }
    })

    return (

        <div className='massage'

            style={{
                background: data.type === 'error' ? '#ee4613' : '#11e045'
            }}
        >


            <p>{data.massage}</p>
            <AiOutlineCheck />

        </div>

    )
}

ItemMessage.propTypes = {

}

export default ItemMessage

