import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
  // adminRoute===false: anyone can reach
  // option===true: logged in user can reach
  // option===false: logged in user can't reach


  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // componentDidMount
    useEffect(() => {
      dispatch(authenticateUser()).then(response => {
        console.log('response', response)
        // not logged in
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } else {
          // if non-Admin user access adminRoute
          if (adminRoute && !response.payload.isAdmin) {
            console.log('non admin + no access for non-admin user');
            props.history.push('/');
          } else {
            if (option === false) {
              console.log('non admin + no access for logged in user?');
              // if non adminRoute page + no access for logged-in user
              props.history.push('/');
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent {...props} user={user} />
    )
  }

  return AuthenticationCheck
}
