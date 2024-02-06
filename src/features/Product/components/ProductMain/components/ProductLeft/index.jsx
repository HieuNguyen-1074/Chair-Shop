import React from 'react'
import PropTypes from 'prop-types'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { chairContent } from '../../../../../../constants/gobal';
import { FcNext, FcPrevious } from 'react-icons/fc';
import './style.css'
function ProductLeft(props) {
    const { imgArr } = props
    console.log(imgArr, 'ddd');
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <FcNext />,
        prevArrow: <FcPrevious />
    };
    return (
        <>
            <Slider {...settings}
                className='product-slide'
            >
                {
                    imgArr.map((item, index) => {
                        console.log(item);
                        return <div
                            key={index}
                            className='product-img-item'

                        ><img

                                src={`data:image/gif;base64,${item.src}`} alt=""
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: 'cover'
                                }} /></div>
                    })
                }
            </Slider>
        </>
    )
}

ProductLeft.propTypes = {

}

export default ProductLeft

