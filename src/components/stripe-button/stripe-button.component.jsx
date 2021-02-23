import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IO58OG24MYc92Ie9q5DvaWPEAgiyKEhcpdZuTDltn9BPjB34oAFVmQb531gmGuEssIlB41HXSCSsq7J20ogBmFi00Qt4h19az";
    
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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