import React from 'react';
import styled from 'styled-components';

/** import css different media types */
import { mobile } from '../../responsive';

/** styled components */
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${mobile({ height: '30vh' })} 
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Img src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>Discover More</Button>
            </Info>
        </Container>
    )
}

export default CategoryItem;