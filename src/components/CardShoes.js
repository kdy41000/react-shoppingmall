import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardShoes = ({shoe, index}) => {
    const navigate = useNavigate();
    return (
        <div className='col-md-4' key={index} onClick={() => 
           navigate(`/detail/${shoe.id}`, { state: {item: shoe}})
        }>
            <img alt="not found" src={shoe.imgUrl} width="80%" />
            <h4>상품명: {shoe.title}</h4>
            <p>상품설명: {shoe.content}</p>
            <p>가격: ${shoe.price}</p>
            <p>재고 : {shoe.itemCount}</p>
        </div>
    );
};

export default CardShoes;