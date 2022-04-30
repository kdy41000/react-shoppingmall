import React, { useState, useContext } from 'react';
import CardShoes from './CardShoes';
import styled from 'styled-components';
import axios from 'axios';
import { MenuTitleContext } from '../App';

const MoreBtn = styled.button`
    display: ${props => !props.moreBtn && 'none'};
`;

const Main = ({shoes, setShoes, itemOrderAscHander, itemOrderDescHander}) => {
    const menuTitle = useContext(MenuTitleContext);
    const [moreBtn, setMoreBtn] = useState(true);

    const moreItemHandler = () => {
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((res) => { 
            let tmpShoes = [...shoes];
            tmpShoes.push(...res.data);
            setShoes(tmpShoes);
            setMoreBtn(false);
            }
        )
        .catch((err) => { 
            console.log("err:",err); 
            }
        );
    }

    return (
        <div>
            <h2>{menuTitle[0]}</h2>
            <div className='main-bg'></div>
            <div style={{float:'right'}}>
                <span>정렬 </span>
                <button onClick={itemOrderAscHander}>▲</button>
                <button onClick={itemOrderDescHander}>▼</button>
            </div>
            <div className='container'>
            <div className='row'>
                {
                shoes.map((shoe,index) => (
                    <CardShoes key={index} shoe={shoe} index={index} />
                ))
                }
            </div>
            <MoreBtn className='btn btn-primary' onClick={moreItemHandler} moreBtn={moreBtn} >더보기</MoreBtn>
            </div>
        </div>
    );
};

export default Main;