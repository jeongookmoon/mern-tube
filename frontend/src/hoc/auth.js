import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../_actions/user_actions';
import Loading from '../items/Loading';

export default function (SpecificComponent, option, adminRoute = null) {
  // adminRoute===false: anyone can reach
  // option===true: logged in user can reach
  // option===false: logged in user can't reach

  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    // componentDidMount
    useEffect(() => {
      if (user.userData) return;

      dispatch(authenticateUser()).then(async response => {
        // not logged in
        if (await !response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } else {
          // if non-Admin user access adminRoute
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (option === false) {
              // if non adminRoute page + no access for logged-in user
              props.history.push('/');
            }
          }
        }
      })
    }, [dispatch, props.history, user.userData])

    if (user.userData) {
      return (
        <SpecificComponent {...props} user={user} />
      )
    }
    return (<Loading />);
  }

  return AuthenticationCheck
}
