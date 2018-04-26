import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { integral, cubicRoot, pow } from './math.js';
import Loadable from 'react-loadable';
// import React, { Fragment } from 'react';

const appRoot = document.getElementById('root');

//All modules for rendering:
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="errorTab">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}>
            {this.state.error && this.state.error.toString()}
            <br/>
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick} className="counterBtn">{this.state.counter}</h1>
  }
}

function App() {
  return (
    <div>
      <p>This is an example of error boundaries in React 16. Click on the numbers to increase the counters. The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.</p>
      <hr/>
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr/>
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

//Mouse-tracking mini-application:
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove} className='mouse-area'>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

//Mouse-tracking mini-application with reusable components:
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} alt='img' />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTrackerCat extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

class MathCalculations extends React.Component {
  constructor(props) {
    super(props);
    this.integ = integral(8);
    this.cRoot = cubicRoot(525.53);
    this.powEl = pow(4, 8);
  }

  render() {
    return (
      <div className='math-answer'>
        <ul>
          <li>1) {this.integ} </li>
          <li>2) {this.cRoot} </li>
          <li>3) {this.powEl} </li>
        </ul>
      </div>
    );
  }
}

class InsertingLoadableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadComponent = Loadable({
      loader: () => import('./loadComponent'),
      loading: () => <div>Loading...</div>,
    });
  }

  render() {
    return (
      <div className="node-answer">{this.loadComponent}</div>
    );
  }
}

//Inserting all different elements in the React Fragment:
/*
function Gloassary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
*/

//Inserting all necessary modules to one DOM container:
let modules = (
  <div className='main-container'>
    <App />
    <MouseTracker />
    <MouseTrackerCat />
    <MathCalculations />
    <InsertingLoadableComponent />
  </div>
);

//Rendering all modules to the DOM:
ReactDOM.render(
  modules,
  appRoot,
);

registerServiceWorker();
