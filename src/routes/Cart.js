import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount } from "../store";

function Cart() {

    let state = useSelector((state) => state);
    let dispatch = useDispatch();
    console.log(state.buyItem);

    return (
        <div>
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