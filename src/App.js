import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, Col, Row, Card } from 'react-bootstrap';
import image from './img/main.jpg';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
// import Detail from './routes/detail.js';
// import Cart from './routes/Cart';
import Event from './routes/event';

const Detail = lazy(() => import('./routes/detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))



function App() {

  // let obj = {name : 'kim'}
  // localStorage.setItem('data',JSON.stringify(obj))
  // let storage = localStorage.getItem('data')
  // console.log(JSON.parse(storage).name);\

  useEffect(() => {

    let check = localStorage.getItem('watched');

    if (check == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  let [shoes, setShoes] = useState(data);
  let [count, upCount] = useState(0);
  let [load, setLoad] = useState(true);
  let navigate = useNavigate();

  let result = useQuery('name', () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    }), { staleTime: 2000 }
  )




  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Treasure Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && 'Load'}
            {result.error && 'Error'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">Home page</Link>
      <Link to="/detail">Detail page</Link> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<>
            <div className='main-bg'></div>
            <div>
              <Container>
                <Row>
                  <Show shoes={shoes} navigate={navigate} />
                </Row>
              </Container>
            </div>
          </>} />
          <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />



          <Route path='/about' element={<About />} >
            <Route path='member' element={<div>Member</div>} />
            <Route path='location' element={<div>Location</div>} />
          </Route>

          <Route path='/event' element={<Event />} >
            <Route path='first' element={<div>First Order</div>} />
            <Route path='birth' element={<div>Birthday Coupon</div>} />
          </Route>

          <Route path='*' element={<div>Don't Access</div>} />
        </Routes>
      </Suspense>
      {
        load == true ? null : <Loading />
      }
      {/* <p>{count}</p> */}
      <button onClick={() => {
        setLoad(false);
        if (count == 0) {
          axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((rs) => {
              let copy = [...shoes, ...rs.data];
              upCount(count + 1);
              setShoes(copy);
              setLoad(true);
            })
            .catch(() => {
              alert('Failed')
            })
        } else if (count == 1) {
          axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((rs) => {
              let copy = [...shoes, ...rs.data];
              upCount(count + 1);
              setShoes(copy);
              setLoad(true);
            })
            .catch(() => {
              alert('Failed')
            })
        } else {
          setLoad(true);
          alert('We dont have more shoes');
        }

        // axios.post('/asdad',{name : 'kim'})
        // Promise.all([axios.get('/url1'),axios.get('/url2')])
        // .then(()=>{})

        // fetch('/url').then(rs=>rs.json()).then(data=>{})
      }}>More</button>

    </div>

  );
}


function Loading() {
  return (
    <div>
      <Card>
        <Card.Body><h4>Load...</h4></Card.Body>
      </Card>
    </div>
  )
}






function About() {
  return (
    <div>
      <h4>Company Information</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Show(props) {
  return (
    props.shoes.map(function (a, i) {
      let s = i + 1;
      let url = "https://codingapple1.github.io/shop/shoes" + s + ".jpg";
      return (
        <Col sm>
          {/* <img src={process.env.PUBLIC_URL + '/logo192.png'}/> */}
          <img onClick={() => { props.navigate('/detail/' + i + '') }} src={url} width="80%" />
          <h4>{props.shoes[i].title}</h4>
          <p>{props.shoes[i].content}</p>
        </Col>
      )
    })
  )
}

export default App;
