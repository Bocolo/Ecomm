import React from 'react';
import { connect } from 'react-redux';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-drop.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDrop = ({ cartItems }) => (
    <div className='cart-dropdown'>

        <div className='cart-items' >
            {
                cartItems.map(cartItem => (
                    <CartItem Key={cartItem.id} item={cartItem}/>
            ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
        
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});


export default connect(mapStateToProps)(CartDrop);