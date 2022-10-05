import React from 'react';
import styled from 'styled-components';

/** import css different media types */
import { mobile } from '../../responsive';

/** import material icons */ 
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

/** styled components */
const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: 'column' })} 
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`

`
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px; 

`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ backgroundColor: '#fff8f8' })} 
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`

`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>E-Shop</Logo>
                <Desc>
                    There are many variations of Lorem Ipsum, but majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color='3b5999'><FacebookIcon /></SocialIcon>
                    <SocialIcon color='e4405f'><InstagramIcon /></SocialIcon>
                    <SocialIcon color='55acee'><TwitterIcon /></SocialIcon>
                    <SocialIcon color='e60023'><PinterestIcon /></SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Men's Fashion</ListItem>
                    <ListItem>Women's Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><RoomIcon style={{ marginRight: '10px' }} />306 West Ave, East Nairobi 60056</ContactItem>
                <ContactItem><PhoneIcon style={{ marginRight: '10px' }} />(+254)-719-338629</ContactItem>
                <ContactItem><MailOutlineIcon style={{ marginRight: '10px' }} />info@e-shop.co.ke</ContactItem>
                <Payment src='/images/logos/payment-logo.PNG' />
            </Right>
        </Container>
    )
}

export default Footer;