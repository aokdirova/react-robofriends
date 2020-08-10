import React, { Component } from "react";
import CardList from "./components/Cardlist/Cardlist";
import SearchBox from "./components/Serarchbox/SearchBox";
import Scroll from './components/Scroll/Scroll';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import "./App.css";

class App extends Component {
  state = {
    robots: [],
    searchField: "",
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
      const {robots, searchField} = this.state;
    const filteredRobot = robots.filter((robot) => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });

    if(!robots.length) {
        return <h1 className="tc f1" >Loading...</h1>
    } else {
        return (
            <div className="tc">
              <h1 className="f1">RoboFriends</h1>
              <SearchBox searchChange={this.onSearchChange} />
              <Scroll>
                <ErrorBoundary>
              <CardList robots={filteredRobot} />
              </ErrorBoundary>
              </Scroll>
            </div>
          );
    }
   
  }
}

export default App;
