import { configureStore, createSlice } from "@reduxjs/toolkit";  // npm i @reduxjs/toolkit react-redux

const pageName = createSlice({
    name : 'pageName',
    initialState : 'ShoeShop'
});

const user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeName(state) {
            return state + " dong young";
        }
    }
});

const cartData = createSlice({
    name : 'cartData',
    initialState : [
       /* { id: 0, name : 'White and Black', count: 2},
        { id: 1, name : 'Grey Yordan', count: 3},
        { id: 2, name : 'Black Sniker', count: 1}*/
    ],
    reducers : {
        plusCount(state, actions) {
            const idx = state.findIndex((element, index, arr) => element.id === actions.payload.id);
            state[idx].count = state[idx].count + 1;
            return state;
        },
        minusCount(state, actions) {
            const idx = state.findIndex((element, index, arr) => element.id === actions.payload.id);
            if(state[idx].count > 0) {
                state[idx].count = state[idx].count - 1;
            }
            return state;
        },
        addCartData(state, actions) {
            const item = actions.payload;
            state.push(item);
            return state;
        },
        deleteCartData(state, actions) {
            return state.filter((item) => item.id !== actions.payload.id);
        }
    }
});

const recentItem = createSlice({
    name : 'recentItem',
    initialState : localStorage.getItem("recentItems"),
    reducers : {
        setRecentItem(state, actions) {
            let storageItems = localStorage.getItem("recentItems");
        
            if(validateItems(storageItems)) {
                storageItems = JSON.parse(storageItems);
                let filtered = storageItems.filter((id) => parseInt(id) !== parseInt(actions.payload));
                if(filtered.length > 2) {  // 최근 3개만 저장할거임
                    filtered.splice(filtered.length - 1, 1);
                }
                filtered.unshift(actions.payload);
                localStorage.setItem("recentItems", JSON.stringify(filtered));
            } else {
                const arr = [];
                arr.push(actions.payload);
                localStorage.setItem("recentItems", JSON.stringify(arr));
            }

            return state;
        }
    }
});

const validateItems = (items) => {
    if(items != null && items !== undefined) {
        return true;
    } else {
        return false;
    }
}

export const { plusCount, minusCount, addCartData, deleteCartData } = cartData.actions;
export const { selectRecentItems, setRecentItem } = recentItem.actions;

export default configureStore({
    reducer: {
        pageName : pageName.reducer,
        cartData : cartData.reducer,
        user : user.reducer,
        recentItem : recentItem.reducer
    }
});