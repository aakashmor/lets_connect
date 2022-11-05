const initialState = JSON.parse(localStorage.getItem("user")) || null

const userReducer=function(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case 'USER_LOADED_2':
            console.log('nice')
            return payload
        default:
            return state
    }
}

export default userReducer