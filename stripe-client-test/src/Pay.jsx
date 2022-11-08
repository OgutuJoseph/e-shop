import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/** set stripeKey as referenced in the 'StripeCheckout' component, not as a variable as below */
// const KEY = 'pk_test_K3fAJjIy6oyB13hrJhD17wdA00JkJdD0Pm';

const Pay = () => {

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    /** to log what is the response (as token) from the client */
    // const onToken = (token) => {
    //     console.log('token: ', token);
    // };

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:5000/api/checkout/payment', 
                    {
                        tokenId: stripeToken.id,
                        amount: 400
                    }
                )
                // console.log('dataa: ', res.data);
                navigate('/success');
            } catch (error) {
                console.log('error: ', error);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, navigate]);

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
            {
                stripeToken 
                ? 
                (<span>Processing. Please wait...</span>) 
                : 
                (
                    <StripeCheckout
                        name='E - Shop'
                        image='/images/logos/product-logo.jpg'
                        billingAddress
                        shippingAddress
                        description='Your total is $400'
                        amount={400}
                        token={onToken}
                        stripeKey='pk_test_K3fAJjIy6oyB13hrJhD17wdA00JkJdD0Pm'
                    >
                        <button style={{ border: 'none', width: 120, borderRadius: 5, padding: '20px', backgroundColor: 'black', color: 'white', fontWeight: 600, cursor: 'pointer' }} >
                            Pay
                        </button>
                    </StripeCheckout>
                )
            }
            {/* <StripeCheckout
                name='E - Shop'
                image='/images/logos/product-logo.jpg'
                billingAddress
                shippingAddress
                description='Your total is $400'
                amount={400}
                token={onToken}
                stripeKey='pk_test_K3fAJjIy6oyB13hrJhD17wdA00JkJdD0Pm'
            >
                <button style={{ border: 'none', width: 120, borderRadius: 5, padding: '20px', backgroundColor: 'black', color: 'white', fontWeight: 600, cursor: 'pointer' }} >
                    Pay
                </button>
            </StripeCheckout> */}
        </div>
        
    )
}

export default Pay;