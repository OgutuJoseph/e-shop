import React from 'react';
import styled from 'styled-components';

/** import css different media types */
import { mobile } from '../../responsive';

/** import components */
import Announcement from '../../components/announcement/Announcement';
import Navbar from '../../components/navbar/Navbar';
import Products from '../../components/products/Products';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';

/** styled components */
const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;

    ${mobile({ margin: '0px 20px', display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

    ${mobile({ fontSize: '14px' })}
`
const Select = styled.select`
    padding: 10px;
    margin: 20px;

    ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option`

`

const ProductList = () => {
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>Dresses</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select>
                        <Option disabled selected>Color</Option>
                        <Option>White</Option>
                        <Option>Balck</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select>
                        <Option disabled selected>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter> 
                <Filter>
                    <FilterText>Sort Products: </FilterText>                    
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (Asc)</Option>
                        <Option>Price (Desc)</Option> 
                    </Select>
                </Filter> 
            </FilterContainer>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList