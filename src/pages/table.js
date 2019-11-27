import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Kartu from '../components/card'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col, Table,
  Form, FormGroup, ButtonToggle,
  InputGroup, InputGroupAddon, InputGroupText, Input, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { thisExpression } from '@babel/types';

class TableBox extends Component{
    state={
        data:[],
        selectedId:null,
        dropdownOpen:false
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users')
        .then((res) => {
            this.setState({data:res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderTable=()=>{
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>last Name</th>
                            <th>Username</th>
                            <th>action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
    renderUserTable = () => {
        return this.state.data.map((val, index)=>{
            if (this.state.selectedId === val.id) {
                return(
                    <tr key={val.id}>
                        <td></td>
                        <td><Input type='text' placeholder='Nama Depan' innerRef={(editNamaDepan)=>
                        this.editNamaDepan = editNamaDepan}/></td>
                        <td><Input type='text' placeholder='Nama Belakang' innerRef={(editNamaBelakang)=>
                        this.editNamaBelakang = editNamaBelakang}/></td>
                        <td><Input type='text' placeholder='Email' innerRef={(editEmail)=>
                        this.editEmail = editEmail}/></td>
                        <td><Button color="success" onClick={()=> this.editYes(val.id)}>Yes</Button></td>
                        <td><Button color="danger" onClick={()=> this.editNo(val.id)}>No</Button></td>
                        
                    </tr>
                )
            } else {
                return(
                    <tr key={val.id}>
                        <td scope='row'>{index+1}</td>
                        <td>{val.first_name}</td>
                        <td>{val.last_name}</td>
                        <td>{val.email}</td>
                        <td><Button color="success" onClick={()=> this.editData(val.id)}>Edit</Button></td>
                        <td><Button color="danger" onClick={()=> this.deleteData(val.id)}>Delete</Button> </td>
                    </tr>
                )
            }
        })
    }
    editData = (id) =>{
        this.setState({selectedId: id})
        console.log(this.state.selectedId)
    }
    editYes = (id) => {
        var EdtnamaDepan = this.editNamaDepan.value
        var EdtnamaBelakang = this.editNamaBelakang.value
        var Edtemail = this.editEmail.value
        console.log(EdtnamaDepan)
        console.log(EdtnamaBelakang)
        console.log(Edtemail)
        Axios.put(`http://localhost:2000/users/${id}`, {
            first_name: EdtnamaDepan,
            last_name: EdtnamaBelakang,
            email: Edtemail
        })
        .then(() => {
            Axios.get('http://localhost:2000/users')
            .then((res)=>{
                console.log(res.data)
                this.setState({data: res.data, selectedId:null})
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    editNo=(id)=>{
        this.setState({selectedId:null})
    }

    deleteData = (id) =>{
        Axios.delete(`http://localhost:2000/users/${id}`)
        .then(()=>{
            Axios.get(`http://localhost:2000/users`)
            .then((res)=>{
                console.log(res.data)
                this.setState({data: res.data})
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    submitData = () => {
        var namaDepan = this.namaDepan.value
        var namaBelakang = this.namaBelakang.value
        var email = this.email.value
        console.log(namaDepan)
        console.log(namaBelakang)
        console.log(email)
        Axios.post('http://localhost:2000/users', {
            first_name: namaDepan,
            last_name: namaBelakang,
            email: email
        })
        .then((res) => {
            this.componentDidMount()
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    renderCard = () => {
        return this.state.data.map((val) => {
            return(
                <DropdownItem>{val.first_name}</DropdownItem>
            )
        })
    }

    render(){
        return(
            <div>
                Ini Table
                <Link to='/' className='btn btn-outline-secondary'>
                   Home
                </Link>
                <Kartu contoh={this.renderCard()} />
                {this.renderTable()}
                <Table dark>
                    <tr>
                        <th>
                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" className='form-control' innerRef={(namaDepan)=>
                                    this.namaDepan = namaDepan} placeholder='Nama Depan'/>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" className='form-control' innerRef={(namaBelakang)=>
                                    this.namaBelakang = namaBelakang} placeholder='Nama Belakang'/>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" className='form-control' innerRef={(email)=>
                                    this.email = email} placeholder='Email'/>
                                </FormGroup>
                                    <Button color='primary' onClick={this.submitData}>Submit</Button>
                            </Form>
                        </th>
                    </tr>
                </Table>
            </div>
        )
    }
}

export default TableBox