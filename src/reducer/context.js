export const defaultState = {
    title: ''
}
export function reducer(state, action) {
    switch(action.type) {
        case 'ADD_TITLE':
            state.title = action.title;
            return { value: state.title };
        // case 'REDUCE_TITLE':
        //     return { ...state, value: state.value - 1 };
        default:
            throw new Error();
    }
}