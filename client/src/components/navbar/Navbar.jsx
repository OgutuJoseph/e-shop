import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/** import material components */
import { Badge } from '@mui/material';

/** import css different media types */
import { mobile } from '../../responsive';

/** import material icons */
import SearchIcon from '@mui/icons-material/Search';
// import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

/** styled components */
const Container = styled.div`
    height: 60px;

    ${mobile({ height: '50px' })}    
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    
    ${mobile({ padding: '10px 0px' })} 
`
const Left  = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;

    ${mobile({ display: 'none' })} 
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px
`
const Input = styled.input`
    border: none;

    ${mobile({ width: '50px' })} 
`
const Center  = styled.div`
    flex: 1;    
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;

    ${mobile({ fontSize: '14px' })} 
`
const Right  = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${mobile({ flex: '2' })} 

    ${mobile({ justifyContent: 'center' })} 
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    
    ${mobile({ fontSize: '12px', marginLeft: '10px' })} 
`

const Navbar = () => {

    const cart = useSelector(state => state.cart);
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log('cart: ', cart); 

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <SearchIcon style={{ color: 'gray', fontSize: 16  }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>E-Shop</Logo>
                </Center>
                <Right>
                    <Link to='/register' style={{ color: 'black', textDecoration: 'none' }}><MenuItem>Register</MenuItem></Link>
                    <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}><MenuItem>Login</MenuItem></Link>
                    {/* <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <MailIcon color="action" />
                        </Badge>
                    </MenuItem> */}
                    <Link to='/cart' style={{ color: 'black' }}>
                        <MenuItem>
                            <Badge badgeContent={cartItems} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;