import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotHome extends Component{
    render(){
        return(
            <div>
                Ini bukan home
                <Link to='/' className='btn btn-outline-secondary'>
                   home
                </Link>
            </div>
        )
    }
}

export default NotHome