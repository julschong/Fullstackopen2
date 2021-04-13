import registerUserService from '../services/registerUserService'
const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {

    case 'GET_USER':
        return action.data

    default:
        return state
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        const users = await registerUserService.getAll()
        dispatch({
            type: 'GET_USER',
            data: users
        })
    }
}
