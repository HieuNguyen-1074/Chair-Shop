import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FilledInput } from '@material-ui/core'
import InputField from '../../custom-field/InputField/index';
import SelectField from '../../custom-field/SelectField';
import './style.css'
import SelectMateral from '../../custom-field/SelectField/SelectMateral';


function TopTab(props) {
    const { name,
        optionSearch,
        type,
        placeholder,
        valueSearch,
        search,
        handleOnChangeInput,
        handleOnChangeSearch,
        // sortOptionPrice,
        // handleSortPrice,
        // handleSortByDate,
        // sortByPrice,
        // sortOptionDate,
        // sortByDate,
        sortOption
    } = props
    console.log(optionSearch);



    return (
        <div className='top-manage'>
            <div className='top-manage-left'>
                <InputField
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={valueSearch}
                    onChange={handleOnChangeInput}
                />
                <SelectMateral
                    handleChange={handleOnChangeSearch}
                    options={optionSearch}
                    value={search}


                />
            </div>
            <div className="right">
                {
                    sortOption.map((element, index) => {
                        return <React.Fragment key={index}>
                            <span>{element.title} : </span>
                            <SelectMateral
                                handleChange={element.handleOnChange}
                                options={element.options}
                                value={element.value}


                            />
                        </React.Fragment>
                    })
                    // sortOptionPrice ? <div className="price">

                    // </div> : ''
                }
                {
                    // sortOptionDate ? <div className="price">
                    //     <spqn>Date:</spqn>
                    //     <SelectMateral
                    //         handleChange={handleSortByDate}
                    //         options={sortOptionDate}
                    //         value={sortByDate} />
                    // </div> : ''

                }

            </div>
        </div>
    )
}

TopTab.propTypes = {

}

export default TopTab

