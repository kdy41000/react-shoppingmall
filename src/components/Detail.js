import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MenuTitleContext } from '../App';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './Detail.scss';


const StyledButton = styled.button`
  background: ${ props => props.bg };
  color: ${ props => props.bg === 'blue' ? 'white' : 'black' };
  padding: 10px;
`;

const Detail = () => {
    const menuTitle = useContext(MenuTitleContext);
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state.item;

    const [bargenAlert, setBargenAlert] = useState(true);
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(item.price * count);
    const [pressTab, setPressTab] = useState(0);

    // mount, update시 useEffect 실행(html태그가 렌더링 된 후에 실행됨)
    useEffect(() => {
      // mount
      let timer = setTimeout(() => {
        setBargenAlert(false);
      },2000);

      return () => { clearTimeout(timer) }  // unmount시 타이머 객체 제거
    },[]);

    useEffect(() => {
      setTotalPrice(item.price * count);
    },[count]);
    
    const purchaseItemClickHandler = () => {
      if(count < 1) { 
        alert("주문수량을 입력해 주세요."); 
        return;
      }
      if(item.itemCount == 0) {
        alert("재고가 없습니다.");
        return;
      }

      const bargenStatus = bargenAlert ? true : false;
      if(bargenAlert) {
        alert("5% 할인 적용이 완료되었습니다.");
        const discountedRate = Math.round(item.price * (5 / 100));
        item.discountedPrice = item.price - discountedRate;
      }
      item.bargenStatus = bargenStatus;
      item.count = count;

      navigate(`/purchase/${item.id}`, { state: {item: item}});
    }

    return (
        <div className="container">
          <h2>{menuTitle[2]}</h2>
          {
            bargenAlert &&
          <div className="alert alert-warning">
            2초이내 구매시 5% 할인
          </div>
          }
        <div className="row">
          <div className="col-md-6">
            <img alt="not found" src={item.imgUrl} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">상품명: {item.title}</h4>
            <p>상품설명: {item.content}</p>
            <p>가격: ${item.price}</p>
            <p>총 가격: ${totalPrice}</p>
            <p>재고: {item.itemCount}</p>
            <label for="count" className="form-label">수량</label>
            <input 
              type="text" 
              id="count" 
              value={count} 
              onChange={(e) => {
                if(e.target.value > item.itemCount) { alert('재고수량보다 입력수량이 큽니다.'); return } 
                setCount(e.target.value.replace(/[^0-9]/g,''));
              }} />
              <br/>
            <StyledButton className="btn btn-danger" bg="blue" onClick={purchaseItemClickHandler}>주문하기</StyledButton>
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="/link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={() => setPressTab(0)}>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setPressTab(1)}>Option 2</Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={true} classNames="wow" timeout={500}>
          <TabContent pressTab={pressTab}/>
        </CSSTransition>
      </div>
    );
};

const TabContent = ({pressTab}) => {
  if(pressTab === 0) {
    return (
          <>
            <span>0번째 탭 콘텐츠</span>
          </>
    );
  } else if(pressTab === 1) {
    return (
      <>
        <span>1번째 탭 콘텐츠</span>
      </>
    );
  } else {
    return;
  }
}

export default Detail;