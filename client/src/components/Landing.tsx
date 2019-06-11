import React, { Component } from 'react'
import Table from './Table';

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