let initialState = {
    history: [],
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_MATH": {
            let { history } = state;

            history.push(action.math);

            return {
                ...state, history
            }
        }
        default:
            return state;
    }
}