import React from 'react';
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

// https://api.github.com/users/john-smilga/followers?per_page=100
function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
}

function FetchAPI() {
  function handleOnClick(e) {
    setCurrentPage(Number(e.target.innerText) - 1);
    e.target.className = 'selected';
  }
  const api = 'https://api.github.com/users/john-smilga/followers?per_page=100';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const usersPerPage = 15;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(chunkArray(result, usersPerPage));
          // setPageCount(data.length);
          // console.log(pageCount)
          setIsLoading(false);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      );
  }, [api]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='user'>
          {data && data[currentPage].map((item) => UserProfile(item))}
        </div>
      )}
      <div className='pageNumbers'>
        {data &&
          data.map((item, index) => {
            if (currentPage === index) {
              return (
                <button
                  key={index}
                  onClick={handleOnClick}
                  className='btn selected'
                >
                  {index + 1}
                </button>
              );
            } else {
              return (
                <button key={index} onClick={handleOnClick} className='btn'>
                  {index + 1}
                </button>
              );
            }
          })}
      </div>
    </>
  );
}

export default FetchAPI;
