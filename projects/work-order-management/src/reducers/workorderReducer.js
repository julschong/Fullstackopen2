const initialState = []

const workorderReducer = (state = initialState, action) => {
    switch (action.type) {
    case "INITIALIZE":
        return action.data

    default:
        return state
    }
}

// actions

export default workorderReducer