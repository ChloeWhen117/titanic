import React, { Component } from 'react'
import Table from './Table';

//TODO: chloen: search bar
//TODO: chloen: charts

class Landing extends Component {  
  render() {
    return (
      <div className='app'>
        <div className='app-body'>
          <main className='main'>
            <Table 
            />
          </main>
        </div>
      </div>
    )
  }
}

export default Landing;