import React from 'react';
import styled from 'styled-components';

/** import components */
import Product from './Product';

/** import datasource */
import { popularProducts } from '../../data';

/** styled components */
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;

`

const Products = () => {
    return (
        <Container>
            {popularProducts.map(item => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Products;