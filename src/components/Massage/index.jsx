import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import ItemMessage from './components/ItemMasage'
import { useSelector } from 'react-redux';
function Massage(props) {

    const alert = useSelector(state => state.alert.data)
    return (
        <div className='list-massage' >

            {
                alert.map((item, index) => {
                    return <ItemMessage data={item} />
                })
            }
            {/* <ItemMessage />
            <ItemMessage />
            <ItemMessage />
            <ItemMessage />
            <ItemMessage /> */}
        </div >
    )
}

Massage.propTypes = {

}

export default Massage

