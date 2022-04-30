import React,{ useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuTitleContext } from '../App';

const Purchase = ({shoes}) => {
    const menuTitle = useContext(MenuTitleContext);
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state.item;

    const [name, setName] = useState('1');
    const [phone, setPhone] = useState('1');
    const [address, setAddress] = useState('1');

    const progressPurchaseHandler = () => {
        if(name === '') return alert('이름을 입력해 주세요.');
        if(phone === '') return alert('전화번호를 입력해 주세요.');
        if(address === '') return alert('주소를 입력해 주세요.');

        let tmpShoes = [...shoes];
        let targetShoe = tmpShoes.find(ele => ele.id === item.id);
        targetShoe.itemCount = targetShoe.itemCount -  item.count;
  
        alert('결제가 완료되었습니다.');
        navigate('/');

    }

    return (
        <div>
             <h2>{menuTitle[3]}</h2>
            <div className="row">
            <div className="col-md-6">
                <img alt="not found" src={item.imgUrl} width="30%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">상품명: {item.title}</h4>
                <p>상품설명: {item.content}</p>
                <p>가격: 
                    {
                        item.bargenStatus ?
                        (<div>
                            <span style={{color:'red', textDecoration:'line-through'}}>${item.price}</span>
                            <span>  ${item.discountedPrice}</span>
                        </div>) :
                        (<span>${item.price}</span>)
                    }</p>
                <p>주문수량: {item.count}</p>
                <p>총 가격:
                    {
                    item.bargenStatus ?
                    (<div>
                        <span style={{color:'red', textDecoration:'line-through'}}>${item.price * item.count}</span>
                        <span>  ${item.discountedPrice * item.count}</span>
                    </div>) :
                    (<span>${item.price * item.count}</span>)
                    }
                </p>
            </div>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">이름</label>
                <input type="text" class="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                name === '' &&    
                <p style={{color:'red', fontWeight:'bold'}}>이름을 입력해주세요.</p>
                }
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">전화번호</label>
                <input type="text" class="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {
                phone === '' &&        
                <p style={{color:'red', fontWeight:'bold'}}>전화번호를 입력해주세요.</p>
                }
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">주소</label>
                <input type="text" class="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                {
                address === '' &&        
                <p style={{color:'red', fontWeight:'bold'}}>주소를 입력해주세요.</p>
                }
            </div>
            <button className="btn btn-danger" onClick={progressPurchaseHandler}>결제하기</button>
        </div>
    );
};

export default Purchase;