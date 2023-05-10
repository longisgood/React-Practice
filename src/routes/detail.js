import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { InputGroup, Form, Nav, Card } from 'react-bootstrap';
import { addItem } from "../store";
import { useDispatch, useSelector } from "react-redux";

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
let Box = styled.div`
    background : grey;
    padding : 20px;
`




function Detail(props) {

    let dispatch = useDispatch();


    let [notice, setAlert] = useState(true);
    let [n, checkNum] = useState('');

    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false)
        }, 2000);
        return () => {
            clearTimeout(a);
        }
    }, [])

    useEffect(() => {
        if (isNaN(n) == true) {
            alert('Please write number')
        }
    }, [n])

    let [tab, setTab] = useState(0);

    let { id } = useParams();


    useEffect(() => {
        let lastest = localStorage.getItem('watched');
        lastest = JSON.parse(lastest);
        lastest.push(id);
        lastest = new Set(lastest);
        lastest = Array.from(lastest);
        localStorage.setItem('watched', JSON.stringify(lastest));
    }, []);

    let num = parseInt(id) + 1;
    let url = "https://codingapple1.github.io/shop/shoes" + num + ".jpg";
    let findId = props.shoes.find(function (a) {
        return a.id == id
    })



    return (
        <div className="container">

            {
                notice == true ?
                    <div className="alert alert-warning">
                        if you buy in 2 seconds, it's sale
                    </div>
                    : null
            }
            <Box>
                <YellowBtn bg="blue">Button</YellowBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src={url} width="100%" />
                </div>

                <div className="col-md-6">
                    <InputGroup onChange={(e) => { checkNum(e.target.value) }} className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Searching
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <h4 className="pt-5">{findId.title}</h4>
                    <p>{findId.content}</p>
                    <p>{findId.price}</p>
                    <button onClick={() => { dispatch(addItem(findId)) }} className="btn btn-danger">Order</button>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">button0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">button1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">button2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent shoes={props.shoes} tab={tab} />



        </div>
    )
}

function TabContent({ tab }) {

    let [fade, setFade] = useState('');

    useEffect(() => {

        let a = setTimeout(() => { setFade('end') }, 100)
        return () => {
            clearTimeout(a);
            setFade('')
        }
    }, [tab])

    return (
        <div className={`start ${fade}`}>
            {[<div>TextArea2</div>, <div>TextArea2</div>, <div>TextArea3</div>][tab]}
        </div>
    )
}



export default Detail;