import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const filter = props.filter

  const handleChange = (event) => {
    const newFilter = event.target.value
    props.setFilter(newFilter)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  { setFilter }
)(Filter)

export default ConnectedFilter