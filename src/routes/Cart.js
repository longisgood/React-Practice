import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount } from "../store";
import { useState, memo } from "react";

let Sample = memo(function () {
    return <div>Sample Check</div>
})

function Cart() {

    let state = useSelector((state) => state);
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);

    return (
        <div>
            <Sample count={count}></Sample>
            <button onClick={() => { setCount(count + 1) }}>+</button>
            <h6>{state.user.name}'s Box {state.user.age} old</h6>
            <button onClick={() => {
                dispatch(increase(7));
            }}>Button</button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.buyItem.map((a, i) =>
                            <tr key={i}>
                                <td>{state.buyItem[i].id}</td>
                                <td>{state.buyItem[i].name}</td>
                                <td>{state.buyItem[i].count}</td>
                                <tb>
                                    <button onClick={() => {
                                        dispatch(addCount(state.buyItem[i].id));
                                    }}
                                    >+</button>
                                </tb>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;