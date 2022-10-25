import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

    const location = useLocation();
    const categoryLocation = location.pathname.split('/')[2];
    

    const [filter, setFilters] = useState({});
    const [sort, setSort] = useState('newest');

    const handleFilters = (e) => {
        const selectValue = e.target.value;
        setFilters({
            ...filter, // enables you to maintain an already selected filter and and a new one to have multiple
            [e.target.name]: selectValue
        })
    };

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>Dresses</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select name='color' onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option>Black</Option>
                        <Option>Brown</Option>
                        <Option>White</Option>
                        <Option>Blue</Option>
                        <Option>Red</Option>
                        <Option>Green</Option>
                        <Option>Yellow</Option>
                        <Option>Baige</Option>
                        <Option>Teal</Option>
                    </Select>
                    <Select name='size' onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter> 
                <Filter>
                    <FilterText>Sort Products: </FilterText>                    
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option selected value='newest'>Newest</Option>
                        <Option value='asc'>Price (Asc)</Option>
                        <Option value='desc'>Price (Desc)</Option> 
                    </Select>
                </Filter> 
            </FilterContainer>
            <Products cat={categoryLocation} filterResults={filter} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList