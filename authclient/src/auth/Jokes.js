import React, {Component} from 'react';

import axios from 'axios';
import Jokes from './Jokes';




    
`



class Jokes extends Component {
   
        state = {
            jokes: [],
            username: '',
            loggedIn: false
         }
    }

componentDidMount() {
    this.getJokes();
}

getJokes =  () => {
    const token = localStorage.getItem('token');
    if (!token){
        this.props.history.replace('/api/login');
    }

    try {
        const response =  axios({
            method: 'get',
            url: 'http://localhost:3300/api/jokes',
            headers: { authorization: token }
        });

    
    } catch (error) {
        console.log(error, error.message);
        this.setState({loggedIn: false})
    }
}


onClick = () => {
    localStorage.removeItem('token');
    this.props.history.push('/api/login');
    this.setState({loggedIn: false})
    
}

    render() { 
        return ( 
            <jokes>
            <Button onClick = {this.onClick}>Logout</Button>
                    {this.state.jokes.map((joke, index) => 

                        <Joke 
                            key={index}
                            type={joke.type}
                            setup={joke.setup}
                            punchline={joke.punchline}
                        />
                    )
                    }
            </jokes>
         );
    }
}
 
export default Jokes;
