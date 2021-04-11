import workorderService from '../services/workorderService'

const initialState = []

const workorderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.data

        default:
            return state
    }
}

// actions

export const initializeWorkOrders = () => {
    return async (dispatch) => {
        const workorders = await workorderService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: workorders,
        })
    }
}

export default workorderReducer
