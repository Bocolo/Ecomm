import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './cart-drop.styles.scss';

const CartDrop = () => (
    <div class='cart-dropdown'>

        <div className='cart-items' />
        <CustomButton>GO TO CHECKOUT</CustomButton>
        
    </div>
);

export default CartDrop;