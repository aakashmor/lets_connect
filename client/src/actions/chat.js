export const updateChat=currChat=> async dispatch =>{
    dispatch({
        type:'UPDATE_CHAT',
        payload:currChat
    })
}