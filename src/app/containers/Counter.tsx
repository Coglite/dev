import { connect, Dispatch } from 'react-redux'
import { State } from '../reducers'
import Counter from '../components/Counter'
import { increment, decrement } from '../actions/counter'

const mapStateToProps = (state: State) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})

export type MappedProps =
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>


export default connect(mapStateToProps, mapDispatchToProps)(Counter)
