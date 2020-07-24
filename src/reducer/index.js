let initState = {
    token : ''
};
let nowToken = '';
let bookData = [];
export const reducer = (state = initState , action) => {
    switch (action.type) {
        case 'setSession':
            state.token = '123';
            nowToken = '123';
            console.log(nowToken);
        default : state.token = '';
    }
}
export const tokenStatus = nowToken;
