const initialState = ""

const filterReducer = (state = initialState, action) => {
    switch (action.type) {

    case "SET_FILTER":
        return action.data
    default:
        return state
    }
}

// action
export const setFilter = (filter = "") => {
    return {
        type: "SET_FILTER",
        data: filter
    }
}

export default filterReducer