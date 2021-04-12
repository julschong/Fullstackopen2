import blogService from '../services/blogService'

const initialState = []


export default (state = initialState, action) => {
    switch (action.type) {

    case 'ADD_BLOG':
        return [action.data, ...state]

    case 'INITIALIZE_BLOGS':
        return action.data

    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.data)

    case 'LIKE_BLOG':
        return state.filter(blog => blog.id!==action.data.id).concat(action.data)
    default:
        return state
    }
}

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (newBlog, userFile) => {
    return async(dispatch) => {
        const blog = await blogService.createOne(
            newBlog,
            userFile.token
        )
        console.log(blog)

        dispatch(
            {
                type: 'ADD_BLOG',
                data: blog
            }
        )
    }


}

export const deleteBlog = (blog, userFile) => {
    return async(dispatch) => {
        try {
            if (window.confirm(`Delete blog: ${blog.title} ?`)) {
                await blogService.deleteOne(blog, userFile.token)
            }
        } catch (e) {
            console.log(e)
        }

        dispatch({ type: 'DELETE_BLOG',
            data: blog.id })
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            blog.likes = blog.likes + 1
            await blogService.updateOne(blog)
        } catch (e) {
            console.log(e)
        }
        dispatch({
            type: 'LIKE_BLOG',
            data: blog
        })
    }
}
