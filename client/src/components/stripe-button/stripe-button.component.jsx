import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IO58OG24MYc92Ie9q5DvaWPEAgiyKEhcpdZuTDltn9BPjB34oAFVmQb531gmGuEssIlB41HXSCSsq7J20ogBmFi00Qt4h19az";
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error :  ',error);
            alert('There was an issue with your payment.  Please make sure you use the provided Credit Card.');
        }); 
    }
    return (
        <StripeCheckout
            labeL='Pay Now'
            name='Crown Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price} Euro`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            currency="EUR"
        />
    )
};



export default StripeCheckoutButton;