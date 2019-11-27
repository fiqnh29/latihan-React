import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col, Table,
  Form, FormGroup
} from 'reactstrap';

class Home extends Component{
    state={
        data:[]
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users')
        .then((res) => {
            this.setState({data:res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    renderUserData = () => {
        return this.state.data.map((val)=>{
            return(
                <Row>
                    <Col sm='6'>
                        <Card body>
                            <CardTitle>{val.first_name}</CardTitle>
                            <CardSubtitle>{val.last_name}</CardSubtitle>
                            <Button>{val.email}</Button>
                        </Card>
                    </Col>
                </Row>
            )
        })
    }

   

    render(){
        return(
            <div>
                Ini Home
                <Link to='/not-home' className='btn btn-outline-danger' >
                    not home
                </Link>
                <Link to='/Table' className='btn btn-outline-danger' >
                    Table
                </Link>
                
                {this.renderUserData()}
                
            </div>
        )
    }

}

export default Home