import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';

/** import css different media types */
import { mobile } from '../../responsive';

/** import components */
import Announcement from '../../components/announcement/Announcement';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

/** import material ui icons */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const KEY = process.env.REACT_APP_STRIPE;


/** styled components */
const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === 'filled' && 'none'};
    background-color: ${(props) => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${(props) => props.type === 'filled' && 'white'}
`
const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`
const TopText = styled.span`
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        text-decoration: underline;
    }
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    jsutify-content: space-between;

    ${mobile({ flexDirection: 'column', paddingBottom: '20px' })}
`
const Hr = styled.hr`
    background-color: #eee;
    boder: none;
    height: 1px;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName  = styled.span`

`
const ProductId = styled.span`

`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color}
`
const ProductSize = styled.span`

`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({ margin: '5px 15px' })}
`
const ProductPrice = styled.span`
    font-size: 30px;
    font-weight: 200;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    // height: 50vh;

`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'};
    font-size: ${props => props.type === 'total' && '24px'}
    
`
const SummaryItemText  = styled.span`

`
const SummaryItemPrice = styled.span`

`
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const cartItems = useSelector(state => state.cart.cartItems);

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();


    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post(
                    'http://localhost:5000/api/checkout/payment', 
                    {
                        tokenId: stripeToken.id,
                        amount: cart.total * 100,
                    }
                )
                navigate('/success', {data: res.data});
            } catch (error) {
                console.log('error: ', error);
            }
        };
        stripeToken &&  cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, navigate])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag ({cartItems})</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type='filled'>Checkout</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <>
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.img} />
                                        <Details>
                                            <ProductName><b>Product : </b>{product.title}</ProductName>
                                            <ProductId><b>ID : </b>{product._id}</ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize><b>Size : </b>{product.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <AddIcon />
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <RemoveIcon />
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                    </PriceDetail> 
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryItem>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ 2.50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        
                        <StripeCheckout
                            name='E - Shop'
                            image='/images/logos/product-logo.jpg'
                            billingAddress
                            shippingAddress
                            description={`Your total is ${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <SummaryButton>Checkout</SummaryButton>
                    </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart;