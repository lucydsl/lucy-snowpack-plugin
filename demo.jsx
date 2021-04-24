import ToggleMachine from './toggle.lucy';
import { interpret } from 'xstate';
import { Component, Fragment, h, render } from 'preact';

class App extends Component {
  state = {
    context: null,
    send: null,
    state: null
  }

  componentDidMount() {
    const service = this.service = interpret(ToggleMachine).onTransition(state => {
      this.setState({ state: state.value });
    });
    
    service.start();

    this.setState({
      context: service.context,
      send: service.send.bind(service),
      state: service.state.value
    });
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render({}, { state, send }) {


    return (
      <Fragment>
        <div>State: <strong>{ state }</strong></div>
        <button type="button" onClick={() => send('toggle')}>Toggle</button>
      </Fragment>
      
    )
  }
}

render(<App />, app);