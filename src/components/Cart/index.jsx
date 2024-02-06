import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { headerContent } from '../../constants/gobal/index'
import './style.css'
import CartList from './components/CartList';
import { useSelector } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';

function Cart(props) {

    const [isOpen, setIsOpen] = useState(false);

    const { cartContent } = headerContent;

    const closeCart = () => {
        setIsOpen(false);
        console.log(isOpen);
    }
    const openCart = () => {
        setIsOpen(true);
        console.log(isOpen);
    }
    const listCart = useSelector(state => state.cart.data);

    return (
        <div className='cart'>
            <div>
                <div className='cart-btn'>
                    <IoCartOutline alt="" className='cart-icon'
                        onClick={openCart}
                    />
                    <span>{listCart.length}</span>
                </div>
                <CartList

                    isOpen={isOpen}
                    closeCart={closeCart}
                    listCart={listCart}
                // onClick={closeCart}


                />
            </div>
        </div>
    )
}

Cart.propTypes = {

}

export default Cart

