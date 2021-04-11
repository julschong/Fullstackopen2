import Navigation from './components/Navigation'
import WorkorderList from './components/WorkorderList'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeWorkOrders } from './reducers/workorderReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeWorkOrders())
    }, [dispatch])
    return (
        <div className="App">
            <Navigation />
            <WorkorderList />
        </div>
    )
}

export default App
