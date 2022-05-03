import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector((state => state.filter))
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const newFilter = event.target.value
    dispatch(setFilter(newFilter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

export default Filter