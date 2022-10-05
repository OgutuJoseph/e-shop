import React from 'react';
import styled from 'styled-components';

/** import components */
import Announcement from '../../components/announcement/Announcement';
import Navbar from '../../components/navbar/Navbar';
import Slider from '../../components/slider/Slider';
import Categories from '../../components/categories/Categories';
import Products from '../../components/products/Products';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';

/** styled components */
const Container = styled.div``

const Home = () => {
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Home;