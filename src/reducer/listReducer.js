let initState = {
    item : ''
};
export const listReducer = (state = initState , action) => {
    switch (action.type) {
        case 'item':
            console.log("item ===> "+action);
            return state.item = action.item;
        default : state.item = '';
    }
}
