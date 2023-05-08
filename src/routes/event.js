import { Outlet } from "react-router-dom";

function Event(){
    return(
        <div>
            <h4>Today's Event</h4>
            <Outlet></Outlet>
        </div>
    )
}

export default Event;