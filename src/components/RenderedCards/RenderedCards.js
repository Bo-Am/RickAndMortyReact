import React, { useState } from 'react';
import Card from '../Card/Card';
// import './RenderedCards.css'
import axios from 'axios';

const RenderedCards = ({ results }) => {
  // number of results
  const count = results.info.count;
  // next url
  const [next, setNext] = useState(results.info.next);
  // the result items to render
  const [items, setItems] = useState(results.results);
  // controls loading
  const [loading, setLoading] = useState(false);
  // no data to load
  const [noData, setNoData] = useState(false);

  // INFINITE SCROLL
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (next != null) {
        getNextCharacters(next);
      } else {
        setNoData(true);
      }
    }
  };



  const getNextCharacters = endpoint => {
    setLoading(true);
    fetch(endpoint)
    // axios.get(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const newItems = items.concat(data.results);
        setItems(newItems);
        setNext(data.info.next);
        if (data.length === 0) setNoData(true);
        if (data.results.length < 20) setNoData(true);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <div>
        <h3>Number of Results: {count}</h3>
      </div>
      <div className='rendered-cards'>
        {items.map((character, index) => {
          return (
            <Card
              key={index.toString()}
              id={index + 1}
              imgSrc={character.image}
              imgAlt={character.name}
              name={character.name}
              status={character.status}
              species={character.species}
              location={character.location.name}
            />
          );
        })}
      </div>
      <div>
        {loading ? <h3>loading data ...</h3> : ''}
        {noData | items.length < 20 ? <h3>No results.</h3> : ''}
      </div>
    </section>
  );
};

export default RenderedCards;

