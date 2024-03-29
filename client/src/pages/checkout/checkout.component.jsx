import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const CheckoutPage = ({ cartItems,total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Products</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>

            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
        }
        <div className='total'>
            <span>Total: &#8364;{total}</span></div>
        <div className='test-warning'>
            *Please use the following test credit card for payments*
             
        <br />
            
            <br />
            Ireland: 4000 0037 2000 0005 CVC: 123 EXP: 10/23
            <br/>
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
);

const mapStateToProps = createStructuredSelector(
    {
        cartItems: selectCartItems,
        total: selectCartTotal
    }
);


export default connect(mapStateToProps)(CheckoutPage);