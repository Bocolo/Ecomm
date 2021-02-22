import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-drop.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDrop = ({ cartItems,history }) => (
    <div className='cart-dropdown'>

        <div className='cart-items' >
            
            
            {
                cartItems.length ?
                    (
                cartItems.map(cartItem => (
                    <CartItem Key={cartItem.id} item={cartItem}/>
                ))
                ) : (
                        <span className='empty-message'>YOU HAVE NO ITEMS</span>
            )
            }
        </div>
        <CustomButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
        
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDrop));