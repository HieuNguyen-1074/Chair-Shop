import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { dcContent } from '../../../../constants/gobal'
import Item from './components/Item';

import './style.css'
import { useSelector } from 'react-redux';
function Dircoration(props) {
    const [screen, setScreen] = useState(window.innerWidth);
    const categoryList = useSelector(state=> state.category.data)
    useEffect(() => {
       
        window.addEventListener('resize', () => {

            setScreen(window.innerWidth)
        })
        return () => {

        }
    })
    return (
        <div className="decroration">
            {
              
                categoryList.map((item, index) => {
                        return <Item
                            key={index}
                            item={item}
                        />
                    })
                    
            }

        </div>
    )
}

Dircoration.propTypes = {

}

export default Dircoration

