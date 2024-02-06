import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import ManageUserMain from './components/ManageUserMain'
import Footer from '../../components/Footer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetData } from './../../commons/fetchData';
import { getReceipt } from '../../redux/SliceReceipt'
import Receipt from './../../components/Receipt/index';

function ManageUser(props) {
    const { isLogin, user } = props
    const [isReceipt, setIsReceipt] = useState(false);
    const [receiptCode, setReceiptCode] = useState('')
    const dispatch = useDispatch()
    console.log(receiptCode);
    // isLogin === false ? '' : fetchGetData(`/api/receipt/${user.ACCOUNTCODE}`).then((result) => {
    //     console.log(result);
    //     const action = getReceipt(result);
    //     dispatch(action);

    // })



    return (
        <div>
            <Header />

            <ManageUserMain
                setIsReceipt={setIsReceipt}
                setReceiptCode={setReceiptCode}
            />
            <Footer />
            <Receipt
                isReceipt={isReceipt}
                setIsReceipt={setIsReceipt}
                receiptCode={receiptCode}
                setReceiptCode={setReceiptCode}
            />
        </div>
    )
}

ManageUser.propTypes = {

}

export default ManageUser

