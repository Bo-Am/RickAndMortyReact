import React, {useState} from 'react';
import Card from '../Card/Card';
import axios from 'axios';

function RenderedCards({results}) {

  const count = results.info.count;
  const [next, setNext] = useState(results.info.next)
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(results.results);


  const getNextCharacters = endpoint => {
    setLoading(true);
    axios.get(endpoint)
    .then(data => {
      console.log('Success:', data);
      const newItems = items.concat(data.results);
      setItems(newItems);
      setNext(data.info.next);
    })
    .catch(error => {
      console.error('Error:', error)
    })
    .finally(()=>{
      setLoading(false)
    })

  }

  window.onscroll = () => {
    if(
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ){
      if(next != null){
        getNextCharacters(next)
      }
    }
  }

  return (
    <div>
      {items.map((character, index) => {
        return (
          <Card key={index.toString()} 
                id={index+1}
                imgSrc={character.image}
                imgAlt={character.name}
                name={character.name}/>
        )
      })}
    </div>
  )
}

export default RenderedCards
