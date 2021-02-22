import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser} from '../../redux/user/user.selectors.js';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crownlogo.svg';
import { auth } from '../../firebase/firebase.utils.js';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDrop from '../cart-drop/cart-drop.component';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser,hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>


            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>
                    SIGN IN</Link>
            }
           
            <CartIcon />
           
        </div>
        { 
            hidden ?
                null 
                :
                <CartDrop />
        }
    </div>
);
//synta for destructing nested value instead of"= state =>"
// and ' currentUser : state.user.currentUser'
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);