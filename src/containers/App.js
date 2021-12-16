import React, { useState, useEffect, useMemo } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App () {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => setRobots(users));  
  }, []);

  const onSearchChange = event => setSearchfield(event.target.value);

  const filteredRobots = useMemo(
    () => robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase())), 
    [robots.length, searchfield]
  );

  if (!robots.length) return <h1>Loading</h1>;
  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchfield={searchfield} searchChange={onSearchChange}/>
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  )
}

export default App;