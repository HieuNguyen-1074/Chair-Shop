import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ManageList from '../../../../../../components/ManageList';
import TopTab from '../../../../../../components/TopTab'
import { fetchDeleteData } from '../../../../../../commons/fetchData';

function ManageReceived(props) {
    const { data, dataProduct, setIsReceipt, handleClickReceiptCode } = props
    console.log(data);

    const optionSearch = dataNew.length === 0 ? [] : Object.keys(dataNew[0]);

    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState(optionSearch[0]);
    console.log(data);
    const buttons = [
        {
            name: 'view',
            onClick: function (e, data) {

                handleClickReceiptCode(data.RECEIPTCODE);
                setIsReceipt(true);
            }
        },
        {
            name: 'remove',
            onClick: function (e, data) {
                console.log(e);
                console.log(data);
                fetchDeleteData(`/api/receipt/${data.RECEIPTCODE}`).then(() => {
                    console.log('delete');
                    const action = removeReceipt(data.RECEIPTCODE);
                    dispatch(action)
                })

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
    //////////////////////////
    const dataFilter = searchValue === '' ? dataNew : dataNew.filter((element, index) => {
        return new String(element[search]).search(searchValue) === - 1 ? '' :
            element

    })




    const [sortByPrice, setSortByPrice] = useState('')
    const [sortByDate, setSortByDate] = useState('');

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
        <div className='received'>
            <TopTab
                name='received'
                optionSearch={optionSearch}
                type='text'
                placeholder={`IMPORT ${search}`}
                value={searchValue}
                handleOnChangeInput={handleOnChangeInput}
                handleOnChangeSearch={handleOnChangeSearch}
                search={search}
                sortOptionDate={sortOption}
                sortByDate={sortByDate}
                sortOption={
                    sortOption
                }
            />
            <ManageList
                name='received'
                data={dataSort}
                buttons={buttons}
            />
        </div>
    )
}

ManageReceived.propTypes = {

}

export default ManageReceived

