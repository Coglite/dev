import { connect, Dispatch } from 'react-redux'
import { State } from '../reducers'
import Router from '../components/Router'

const mapStateToProps = (state: State) => ({
  routing: state.routing
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

})

export type MappedProps =
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>


export default connect(mapStateToProps, mapDispatchToProps)(Router)
