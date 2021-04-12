import React from 'react';
import './signin-register.styles.scss';
import SignIn from '../signin/signin.component';
import SignUp from '../signup/signup.component';

const SignInSignUp = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp/>
    </div>

    )
export default SignInSignUp;