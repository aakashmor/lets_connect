const initialState = {
	currChat:null,
	error: {}
};

const chatReducer=function(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case 'UPDATE_CHAT':
            return{ ...state,currChat:payload}
        default:
            return state
    }
}

export default chatReducer