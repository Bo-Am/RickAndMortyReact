import React, {useState, useEffect} from 'react';
import RenderedCards from '../../components/RenderedCards/RenderedCards'
import axios from 'axios';

function Home() {
  const [results, setResults] = useState(null);
  const [noData, setNoData] = useState(null);

  const api = 'https://rickandmortyapi.com/api/character/';

  const getCharacters = endpoint => {
    axios.get(endpoint)
    .then(data => {
      if(data.error) {
        console.error('Error:', data.error);
        setNoData(true);
        setResults('')
      }else{
        console.log('Success:', data);
        setNoData(false);
        setResults(data);
        console.log(noData)
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setNoData(true)
    })
  }

  useEffect(() => {
    setResults(getCharacters(api))
  }, [])

  return (
    <div>
      {noData ? 
        <h3>No results.</h3>
      : ''}
      <div>
        {results ? <RenderedCards results={results}/> : ''}
      </div>
    </div>
  )
}

export default Home

