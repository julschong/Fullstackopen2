import loginService from '../services/loginService'
const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {

    case 'SET_USERFILE':
        return action.data

    default:
        return state
    }
}

export const setUserFile = (setAppState) => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setAppState('LOGGED_IN')
        return {
            type: 'SET_USERFILE',
            data: user
        }
    }
    return {
        type: 'NO_USERFILE',
        action: null
    }
}

export const login = (userInfo) => {
    return async (dispatch) => {
        const credential = await loginService.login(userInfo)
        window.localStorage.setItem(
            'token',
            JSON.stringify(credential)
        )
        dispatch({
            type: 'SET_USERFILE',
            data: credential
        })
    }
}

export const logout = () => {
    return {
        type: 'SET_USERFILE',
        data: null
    }
}