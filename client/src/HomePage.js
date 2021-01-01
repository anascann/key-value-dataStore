import React,{useState} from 'react'
import {Navbar,NavbarBrand,  Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle , Row, Col, Label,Input, FormGroup, Form} from "reactstrap"

import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {

    const [CreateKey, setCreateKey]=useState(' ');
    const [ReadKey, setReadKey]=useState(' ');
    const [DeleteKey, setDeleteKey]=useState(' ');
    const [Value, setValue]=useState(' ');

    const [Createmsg, setCreatemsg]=useState(' ');
    const [Readmsg, setReadmsg]=useState(' ');
    const [Deletemsg, setDeletemsg]=useState(' ');

    const [DisplayValue, setDisplayValue]=useState(' ');


    const handleCreateSubmit=async(e)=>{
        e.preventDefault();

        const form={
            "id": CreateKey,
            "value": Value
        }

        if(CreateKey===" " || Value===" "){
            alert('Please Enter any value before File Creation');
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/create',
            data:form
        }).then(response=>{
            console.log(response);
            setCreatemsg(response.data.msg)
            
           
            
    

        }).catch(err=>{
            console.log(err.response.status)
            
            if(err.response.status===409){
                setCreatemsg('File Already Exists');
            }else if(err.response.status===500){
                setCreatemsg('File Creation Failed. Please try Again.')
            }
            
        
        })

    }

    const handleReadSubmit=async(e)=>
    {
        e.preventDefault();

        axios({
          method:'post',
          url: 'http://localhost:5000/read',
          data:{
            "id": ReadKey
          }
        }).then(response=>{
          console.log(response);
          console.log(response.status)
          
          if(response.status===200){
            setDisplayValue(response.data.value)
          }

          setReadmsg(`Value Fetched For ${ReadKey}.json!!`)



        }).catch(err=>{
          console.log(err);
          console.log(err.response.status);

          if(err.response.status===404){
            setReadmsg('File not found');
          }
          setDisplayValue(' ')
        })





        
    }

    const handleDeleteSubmit=async(e)=>{
        e.preventDefault();

        axios({
            url:'http://localhost:5000/delete',
            method:'post',
            data:{
                "id": DeleteKey
            }
        }).then(response=>{
            console.log(response);
            

            if(response.status===200){
                setDeletemsg(response.data.msg);
            }

        }).catch(err=>{
            console.log(err);
            console.log(err.response.status)

            if(err.response.status===404){
                setDeletemsg('File Not Found');
            }else{
                setDeletemsg('Error occured');
            }

        })
    }

    
    

    return (
        <div>
        <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">Key Value Data store</NavbarBrand>
      
      </Navbar>
        <br/>
        <br/>
      <Row>
      <Col>
      
      <Card>
      <CardHeader tag="h3">Create</CardHeader>
      <CardBody>
        <CardTitle tag="h5">Enter the Key/ID & Value to be stored: </CardTitle>
        
        <Form onSubmit={handleCreateSubmit} >
        
        <FormGroup>
        <Label for="exampleEmail">Key/ID</Label>
        <Input  type="text" name="id" id="key" placeholder="Enter Key/ID" onChange={(e)=> setCreateKey(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Value</Label>
        <Input  type="text" name="value" id="examplePassword" onChange={(e)=> setValue(e.target.value)} placeholder="Enter your Value" />
      </FormGroup>

      

        <Button>Submit</Button>
        </Form>
      </CardBody>
      <CardFooter className="text-muted">Message : <h6 style={{color:'green'}}>{Createmsg}</h6> </CardFooter>
    </Card>

      </Col>

      <Col>
      
      <Card>
      <CardHeader tag="h3">Read</CardHeader>
      <CardBody>
        <CardTitle tag="h5">Enter the ID/Key To fetch Your Value: </CardTitle>
        
        <Form onSubmit={handleReadSubmit} >
        
        <FormGroup>
        <Label for="exampleEmail">Key/ID</Label>
        <Input type="text" onChange={(e)=>setReadKey(e.target.value)} name="id" id="key" placeholder="Enter Key/ID" />
      </FormGroup>
      
        <h6>Value is : {DisplayValue} </h6>
        <br/>
      
      <Button>Fetch</Button>
      </Form>
      </CardBody>
      <CardFooter className="text-muted">Message: {Readmsg} </CardFooter>
    </Card>

      </Col>

      <Col>
      
      <Card>
      <CardHeader tag="h3">Delete</CardHeader>
      <CardBody>
        <CardTitle tag="h5">Enter the Key/ID to be Deleted: </CardTitle>
      
        <Form onSubmit={handleDeleteSubmit} >
        
        <FormGroup>
        <Label for="exampleEmail">Key/ID</Label>
        <Input type="text" name="id" id="key" onChange={(e)=>setDeleteKey(e.target.value)} placeholder="Enter Key/ID" />
      </FormGroup>
      
        
              
      <Button style={{backgroundColor:'red'}}>Delete</Button>
      </Form>
        
      
      </CardBody>
      <CardFooter className="text-muted">Message : {Deletemsg} </CardFooter>
    </Card>

      </Col>
      </Row>
        </div>
    )
}
