import React from 'react';

function UserProfile(user) {
  const { login, id, avatar_url, html_url } = user;
  return (
    <div key={id} className='userContainer'>
      <img src={avatar_url} alt='user' />
      <h4>{login}</h4>
      <a href={html_url}>profile</a>
    </div>
  );
}

export default UserProfile;
