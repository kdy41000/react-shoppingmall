import React,{ createContext, useEffect, useState } from "react";
import './App.css';
import { Nav, NavItem, NavLink, NavbarBrand,  } from 'react-bootstrap';
import { list } from './data';
import Main from './components/Main';
import Detail from './components/Detail';
import About from './components/About';
import Event from "./components/Event";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Purchase from "./components/Purchase";

export const MenuTitleContext = createContext();

function App() {

  const menuArr = ['홈','About','상세정보','주문정보'];
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();
  //navigate(1) : 앞 페이지로 이동
  //navigate(-1) : 이전 페이지로 이동

  useEffect(() => {
    setShoes(list);
  }, []);

  const itemOrderAscHander = () => {
    let tmpShoes = [...shoes];
    tmpShoes.sort(function(a, b) {
      return a.price - b.price;
    });
    setShoes(tmpShoes);
  }

  const itemOrderDescHander = () => {
    let tmpShoes = [...shoes];
    tmpShoes.sort(function(a, b) {
      return b.price - a.price;
    });
    setShoes(tmpShoes);
  }

  return (
    <div className="App">

       <Nav style={{padding:'15px'}}>
       <NavItem>
         <NavbarBrand>
            ShoeShop
         </NavbarBrand>
        </NavItem>
        <NavItem>
          <NavLink active onClick={() => navigate('/')}>
            홈
            {/* <Link to="/">홈</Link> */}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active onClick={() => navigate('/about')}>
            About
          </NavLink>
        </NavItem>
      </Nav>

     <MenuTitleContext.Provider value={menuArr}>
      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes} itemOrderAscHander={itemOrderAscHander} itemOrderDescHander={itemOrderDescHander} />} />
        
         {/* 디테일컴포넌트에서 state를 파라미터로 넘겨주는 방식 사용 */}
        <Route path="/detail/:id" element={<Detail />} />
        
        {/* url parameter : 을 입력하고 뒤에 전달할 파라미터 key를 입력합니다. */}
        {/* <Route path="detail/:id" element={<Detail shoes={shoes} />} /> */}

        <Route path="/purchase/:id" element={<Purchase shoes={shoes} />} />


        {/* nested router: /about/member 로 접속하면 About 페이지안에 member path태그를 보여준다.(Outlet으로 보여줄 위치 설정 필요) */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<>멤버</>} />
          <Route path="location" element={<>로케이션</>} />
        </Route>  

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<>첫 주문시 양배추즙 서비스</>} />
          <Route path="two" element={<>생일기념 쿠폰받기</>} />
        </Route>  
        <Route path="*" element={<>404</>} />

      </Routes>
      </MenuTitleContext.Provider>
    </div>
  );
}

export default App;
