import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/** import css different media types */
import { mobile } from '../../responsive';

/** styled components */
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url('images/banners/registration-banner.jpeg') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%; 
    padding: 20px;
    background-color: white;

    ${mobile({ width: '75%' })}

`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px; 
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const LinkItem = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Create an Account.</Title>
                <Form>
                    <Input placeholder='First Name' />
                    <Input placeholder='Last Name' />
                    <Input placeholder='Username' />
                    <Input placeholder='Email' />
                    <Input placeholder='Password' />
                    <Input placeholder='Confirm Password' />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>Privay Policy.</b>
                    </Agreement>
                    <Button>Create</Button>
                </Form>
                <br />
                Already have an account? <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}><LinkItem>Login</LinkItem></Link>
            </Wrapper>
        </Container>
    )
}

export default Register;