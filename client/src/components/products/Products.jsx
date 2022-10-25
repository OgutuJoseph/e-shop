import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Products = ({ cat, filterResults, sort }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                    ?
                    `http://localhost:5000/api/products/byParams?category=${cat}`
                    :
                    `http://localhost:5000/api/products`
                );
                setProducts(res.data);
            } catch (error) {
                
            }
        };
        getProducts();
    }, [cat])

    console.log('products: ', products);

    /** to handle filter */
    useEffect(() => {
        cat && setFilteredProducts(
            products.filter((item) => 
                Object.entries(filterResults).every(([key, value]) => 
                    item[key].includes(value)
                )
            )
        )
    }, [products, cat, filterResults]);

    /** to handle sort */
    useEffect(() => {
        if (sort === 'newest'){
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => a.createdAt - b.createdAt)
            )
        } else if (sort === 'asc'){
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => a.price - b.price)
            )
        } else if (sort === 'desc'){
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => b.price - a.price)
            )
        }
    }, [sort]);

    return (
        <Container>
            {
                cat
                ?
                filteredProducts.map(item => (
                    <Product item={item} key={item.id} />
                ))
                :
                products.slice(0,8).map(item => (
                    <Product item={item} key={item.id} />
                ))
            }
        </Container>
    )
}

export default Products;