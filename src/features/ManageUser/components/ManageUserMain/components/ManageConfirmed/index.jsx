import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopTab from '../../../../../../components/TopTab'
import ManageList from '../../../../../../components/ManageList';
import { receivedReceipt } from '../../../../../../redux/SliceReceipt';
import { useDispatch } from 'react-redux';
import { fetchPutData } from './../../../../../../commons/fetchData';

function ManageComfirmed(props) {
    const { data, dataProduct, setIsReceipt, handleClickReceiptCode } = props
    console.log(data);
    const dispatch = useDispatch()
    const dataNew = data.map((item, index) => {
        const product = dataProduct.find((element) => item.PRODUCTCODE === element.PRODUCTCODE);
        const productName = product.PRODUCTNAME;
        const totalPrice = product.PRICE * item.QUALITY
        return {
            PRODUCTNAME: productName,
            RECEIPTCODE: item.RECEIPTCODE,
            TIMEORDER: item.TIMEORDER,
            TOTALPRICE: totalPrice
        }

    })
    const optionSearch = dataNew.length === 0 ? [] : Object.keys(dataNew[0]);
    console.log("ddddddddddsssssss");
    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState(optionSearch[0]);
    const buttons = [
        {
            name: 'view',
            onClick: function (e, data) {
                console.log(data);
                handleClickReceiptCode(data.RECEIPTCODE);
                setIsReceipt(true);
            }
        },
        {
            name: 'Received',
            onClick: function (e, data) {
                console.log(e);
                dispatch(receivedReceipt(data.RECEIPTCODE))
                fetchPutData('/api/receipt', { ...data, action: 'RECEIPT' })
            }
        },


    ]
    const handleOnChangeInput = (e) => {
        setSearchValue(e.target.value);
        console.log(searchValue);
    }
    const handleOnChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const dataFilter = searchValue === '' ? dataNew : dataNew.filter((element, index) => {

        return new String(element[search]).search(searchValue) === - 1 ? '' :
            element

    })
    const [sortByPrice, setSortByPrice] = useState('')
    const [sortByDate, setSortByDate] = useState('');
    // const sortOption = [
    //     'INCREASE',
    //     'REDUCE'
    // ];

    const dataSort = sortByDate != '' ? dataFilter.sort((a, b) => {
        console.log(Date.parse(a.TIMEORDER));
        if (sortByDate === "INCREASE") {
            return Date.parse(a.TIMEORDER) - Date.parse(b.TIMEORDER)
            // return Date.parse(a.TIMEORDER) - Date.parse(b.TIMEORDER)
        }
        else {
            return Date.parse(b.TIMEORDER) - Date.parse(a.TIMEORDER)
            // return Date.parse(b.TIMEORDER) - Date.parse(a.TIMEORDER);
        }
    }) : (sortByPrice != '') ? dataFilter.sort((a, b) => {
        if (sortByPrice === "INCREASE") {
            return a.TOTALPRICE - b.TOTALPRICE
            // return a.TOTALPRICE - b.TOTALPRICE
        }
        else {
            return b.TOTALPRICE - a.TOTALPRICE
            // return b.TOTALPRICE - a.TOTALPRICE;
        }
    }) : dataFilter
    const sortOption = [
        {
            title: 'Date',
            value: sortByDate,
            options: [
                'REDUCE',
                'INCREASE'
            ],
            handleOnChange: (e) => {
                setSortByPrice('')
                setSortByDate(e.target.value);
            }
        },
        {
            title: 'Price',
            value: sortByPrice,
            options: [
                'REDUCE',
                'INCREASE'
            ],
            handleOnChange: (e) => {
                setSortByDate('')
                setSortByPrice(e.target.value);
            }
        }
    ]
    return (
        <div className='confirm'>
            <TopTab
                name='confirmed'
                optionSearch={optionSearch}
                type='text'
                placeholder={`IMPORT ${search}`}
                value={searchValue}
                handleOnChangeInput={handleOnChangeInput}
                handleOnChangeSearch={handleOnChangeSearch}
                search={search}
                sortOption={sortOption}
            />
            <ManageList
                name='confirmed'
                data={dataSort}
                buttons={buttons}
            />
        </div>
    )
}

ManageComfirmed.propTypes = {

}

export default ManageComfirmed

