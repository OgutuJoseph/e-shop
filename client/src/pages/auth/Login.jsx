import React, { useState } from 'react';
import styled from 'styled-components';
import { userLogin } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/** import css different media types */
import { mobile } from '../../responsive';

/** styled components */
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url('images/banners/login-banner.jpeg') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 25%; 
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
    flex-direction: column;
`
const Input = styled.input`
    flex 1;
    min-width: 40%;
    margin: 10px 0; 
    padding: 10px;
` 
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
`
const LinkItem = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const Error = styled.span`
    color: red
`

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Title>Sign In.</Title>
                <Form>
                    <Input placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} /> 
                    <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
                    {error && <Error>Something went wrong.</Error>}
                    <LinkItem>Forgot password?</LinkItem>
                    <Link to='/register' style={{ color: 'black', textDecoration: 'none' }}><LinkItem>Create a new account.</LinkItem></Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;