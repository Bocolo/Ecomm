import React, { useEffect } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component.jsx';
import SignInSignUp from './components/signin-and-register/signin-register.component';


import { selectCurrentUser } from './redux/user/user.selectors';
import {checkUserSession } from './redux/user/user.actions';
import './App.css';
//import { GlobalStyle } from './global.styles';




const App = ({ checkUserSession, currentUser }) => {

    useEffect(() => {
        checkUserSession();

    }, [checkUserSession])
   /* unsubscribeFromAuth = null; 
   
    componentWillUnmount() {
        this.unsubscribeFromAuth();
        
        
    }*/
    
        return (
            <div>
                
                <Header  />
                <Switch>

                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route exact path='/signin'
                        render={() =>
                            currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInSignUp />
                        )
                    }
                    />
                </Switch>

            </div>
        );
    
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatchToProps=dispatch=>({
    checkUserSession: ()=>dispatch(checkUserSession())
})


export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
