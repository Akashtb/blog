export const LoginStart =(userCredentials)=>({
    type:"LOGIN_START"
});

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const LoginFaliure = () =>({
    type:"LOGIN_FALIURE"
})

export const LogOut = () =>({
    type:"LOGOUT"
})

export const UpdateStart =(userCredentials)=>({
    type:"UPDATE_START"
});

export const UpdateSuccess = (user)=>({
    type:"UPDATE_SUCCESS",
    payload:user
})

export const UpdateFaliure = () =>({
    type:"UPDATE_FALIURE"
})