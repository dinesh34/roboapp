import React, {Component} from 'react';
// import {robots} from'./robots';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import './containers/App.css';
import Scroll from './components/Scroll';
import ErrorBoundry from './components/ErrorBoundry';


class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield :""
        }
    }

    //A lifecycle function to check if the component is mounted
    componentDidMount(){
        //if the component did mount we can do something here
        //this.setState({robots : robots}); -- so this updates everytime we refresh
        
        //fetching data through url
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));
    ;
    }

    //created to check the SearchBox if when an event happens
    //The below syntax for extra functions in react; arrow funcion
    onSearchChange = (event) =>{
        
        this.setState({searchfield : event.target.value});

    }

    render(){
        //To remove this.state.blah from code and generalize it by destructuring,
         const {robots, searchfield} = this.state;
        //Here we use searchfield state to get the event value from onSearchChange coming from SearchBox.js and filter the robots according to that event value
        const filterRobots = robots.filter(robot => 
            {                                         //before -- this.state.searchfield.toLowerCase()
            return  robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if(!robots.length){
            return <h1 className="tc">Loading...</h1>
        }else{
            return(
                <div className="tc">
                    <h1 className= "ma2 pa3 f1  ">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    {/* <CardList robots = {robots}/> */}
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filterRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                   
                </div>
            );
        } 
    }
}

export default App;