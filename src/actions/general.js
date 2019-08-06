
export function addMath(math) {
    return ( dispatch ) => {
        dispatch({ type: "ADD_MATH", math: math });
    }
}