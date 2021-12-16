import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { changeSearchFieldAction, getRobots } from '../store';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getRobots();
  }

  onSearchChange = (event) => {
    this.props.onSearchChange(event.target.value);
  }

  resetError = () => {
    this.props.getRobots();
  }

  render() {
    const { searchfield, robots, hasError, error, isPending} = this.props;

    const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));

    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>

        {isPending && <h1>Loading</h1>}

        {!isPending && hasError && (
          <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error}</pre>
            <button onClick={this.resetError}>Try again</button>
          </div>
        )} 
        
        {!isPending && !hasError && (
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        )} 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchfield: state.searchRobotReducer.searchfield,
    robots: state.robotsReducer.robots,
    isPending: state.robotsReducer.isPending,
    hasError: state.robotsReducer.error !== null,
    error: state.robotsReducer.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (...args) => changeSearchFieldAction(dispatch, ...args),
    getRobots: (...args) => getRobots(dispatch, ...args),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);