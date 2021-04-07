import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer } from './header.styles.jsx';
import { ReactComponent as Logo } from '../../assets/crownlogo.svg';
import { signOutStart } from '../../redux/user/user.actions';
import { auth } from '../../firebase/firebase.utils.js';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDrop from '../cart-drop/cart-drop.component';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer >
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {currentUser ?
                <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
                :
                <OptionLink to='/signin'>
                    SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { 
            hidden ?
                null 
                :
                <CartDrop />
        }
    </HeaderContainer>
);
//synta for destructing nested value instead of"= state =>"
// and ' currentUser : state.user.currentUser'
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
const mapDispatchToProps = dispatch => ({
    signOutStart: ()=> dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);