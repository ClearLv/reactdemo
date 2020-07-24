let initState = {
    data : []
};
export const bookReducer = (state = initState , action) => {
    switch (action.type) {
        case 'book':
            console.log("book ===> "+action);
            return state.data = action.data;
        default : state.data = [];
    }
}
