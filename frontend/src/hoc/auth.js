import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../_actions/user_actions';

export default (SpecificComponent, option, adminRoute = null) => {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authenticateUser()).then(response => {
        console.log('response');
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}
