import React from 'react'
import { Helmet } from 'react-helmet';

export default function LogOut() {
  return (
    <div className='logout'>
      <Helmet>
        <title>Logout Page</title>
      </Helmet>
      <p>LogOut</p>
    </div>
  );
}
