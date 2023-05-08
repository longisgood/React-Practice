import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";


let buyItem = createSlice({
    name: 'buyItem',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        addCount(state, action) {
            let change = state.find((item) => {
                return item.id === action.payload;
            });
            change.count += 1;
        },
        addItem(state, action) {
            let temp = { id: action.payload.id, name: action.payload.title, count: 1 }
            state.push(temp);
        }
    }
})

export let { addCount, addItem } = buyItem.actions



export default configureStore({
    reducer: {
        user: user.reducer,
        buyItem: buyItem.reducer
    }
})

