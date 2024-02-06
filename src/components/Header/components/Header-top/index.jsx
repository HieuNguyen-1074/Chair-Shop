import React, { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';


import './style.css'

import { headerContent } from '../../../../constants/gobal';
import ItemTopHeader from './components/items';
import { Col, Container, Row } from 'react-bootstrap'

export default function HeaderTop() {

    const { carContent,
        callContent,
        clockContent,
        cartContent,
        likeContent,
        userContent
    } = headerContent;

    const contentLeft = [
        carContent,
        clockContent,
        likeContent,
        callContent,
    ];
    const contentRight = [


    ]
    return (

        <div className='header__top'  >
            <div className="header__top--left">


                {
                    contentLeft.map((content, index) => {
                        return <ItemTopHeader key={index} src={content.src} content={content.content} />
                    })
                }

            </div>

        </div>

    )
}
