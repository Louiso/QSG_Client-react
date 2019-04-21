import React, { Component } from 'react';
import { Query } from 'react-apollo';
import holaMundo from './graphql/queries/default.gql'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Query
          query = {holaMundo}
          >
          {({loading,error, data: { holaMundo }}) => {
            if(loading || error) return '...loading'
            return (
              <div>
                {holaMundo}
              </div>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default App;
