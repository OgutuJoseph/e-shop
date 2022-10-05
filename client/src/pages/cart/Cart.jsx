import React from 'react';
import styled from 'styled-components';

/** import css different media types */
import { mobile } from '../../responsive';

/** import components */
import Announcement from '../../components/announcement/Announcement';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

/** import material ui icons */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type='filled'>Checkout</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        <Product>
                            <ProductDetail>
                                <Image src='/images/cart/cart-image.PNG' />
                                <Details>
                                    <ProductName><b>Product : </b>Jesse Thunder Shoes</ProductName>
                                    <ProductId><b>ID : </b>90058989</ProductId>
                                    <ProductColor color='black' />
                                    <ProductSize><b>Size : </b>37.5</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon />
                                    <ProductAmount>2</ProductAmount>
                                    <RemoveIcon />
                                </ProductAmountContainer>
                                <ProductPrice>$ 30</ProductPrice>
                            </PriceDetail> 
                        </Product>
                        <Hr />
                        <Product>
                            <ProductDetail>
                                <Image src='/images/cart/cart-image-2.PNG' />
                                <Details>
                                    <ProductName><b>Product : </b>Hakura T-Shirt</ProductName>
                                    <ProductId><b>ID : </b>678555903</ProductId>
                                    <ProductColor color='gray' />
                                    <ProductSize><b>Size : </b>M</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon />
                                    <ProductAmount>2</ProductAmount>
                                    <RemoveIcon />
                                </ProductAmountContainer>
                                <ProductPrice>$ 20</ProductPrice>
                            </PriceDetail> 
                        </Product>
                    </Info>
                    <Summary>
                        <SummaryItem>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ 80</SummaryItemPrice>
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
                            <SummaryItemPrice>$ 83.50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryButton>Checkout</SummaryButton>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart;