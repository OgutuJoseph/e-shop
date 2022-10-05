import React from 'react';
import styled from 'styled-components';

/** import components */
import CategoryItem from './CategoryItem';

/** import css different media types */
import { mobile } from '../../responsive';

/** import datasource */
import { categories } from '../../data';

/** styled components */
const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({ padding: '0px', flexDirection: 'column' })}  
`

const Categories = () => {
    return (
        <Container>
            {categories.map(item => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Categories;