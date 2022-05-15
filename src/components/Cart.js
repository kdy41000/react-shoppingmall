import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MenuTitleContext } from '../App';
import { deleteCartData, minusCount, plusCount } from '../store';

const Cart = () => {
    const menuTitle = useContext(MenuTitleContext);
    const dispatch = useDispatch();
    const { cartData } = useSelector((state)=> { return state });
   // const { user } = useSelector((state)=> { return state});
    //.log("user:",user);
    console.log("cartData:",cartData);

    const onClickChangeHandler = (param, flag) => {
        if(flag === 'plus') {
           dispatch(plusCount(param));
        } else if(flag === 'minus') {
           dispatch(minusCount(param));
        }
    }

    const onDeleteCartItemHandler = (param) => {
        if(param != null && param !== undefined) {
            dispatch(deleteCartData(param));
        }
    }

    return (
        <div>
            <h2>{menuTitle[4]}</h2>
            <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>수량변경</th>
                <th>삭제</th>
            </tr>
            </thead>
            <tbody>
                {
                    cartData.map((item,index) => 
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>
                            <Button variant="success" onClick={() => onClickChangeHandler(item, 'plus')}>+</Button>
                            &nbsp;
                            <Button variant="danger" onClick={() => onClickChangeHandler(item, 'minus')}>-</Button>    
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => onDeleteCartItemHandler(item)}>삭제</Button>     
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </Table>
      </div>
    );
};

export default Cart;