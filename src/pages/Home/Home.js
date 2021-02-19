import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
// import './Home.css';
import RenderedCards from '../../components/RenderedCards/RenderedCards'
import axios from 'axios';

const Home = () => {
  const [results, setResults] = useState(null);
  const [noData, setNoData] = useState(null);
  const [sentQuery, setSentQuery] = useState(false);
  const [stringQuery, setStringQuery] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const api = 'https://rickandmortyapi.com/api/character/';

  // Requests the first 20 results of the entire Rick and Morty character list.
  useEffect(() => {
    setResults(getCharacters(api));
  }, []);

  const getCharacters = endpoint => {
    fetch(endpoint)
    // axios.get(endpoint)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error:', data.error);
          setNoData(true);
          setResults('');
        } else {
          console.log('Success:', data);
          setNoData(false);
          setResults(data);
          console.log(noData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setNoData(true);
      });
  };

  const onSubmit = data => {
    if (!data.characterName && !data.status && !data.gender) {
      setSentQuery(false);
    } else {
      setSentQuery(true);
    }
    // Creates the api query string to make the request
    const query = `${api}?name=${data.characterName}&status=${data.status}&gender=${data.gender}`;
    setResults(getCharacters(query));
    // Creates the query results info to render on the dom.
    const templateQuery = `${data.characterName} ${data.status} ${data.gender}`;
    setStringQuery(templateQuery);
    // Resets the form
    reset();
  };

  return (
    <section>
      <section>
        <div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input
              type='search'
              placeholder='Search for a character'
              name='characterName'
              ref={register}></input>
            <label className='form-label'>Status</label>
            <select
              type='dropdown'
              name='status'
              ref={register}>
              <option value=''>None</option>
              <option value='alive'>Alive</option>
              <option value='dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
            <label className='form-label'>Gender</label>
            <select
              type='dropdown'
              name='gender'
              ref={register}>
              <option value=''>None</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='genderless'>Genderless</option>
              <option value='unknown'>Unknown</option>
            </select>    
            <input
              type='submit'
              value='Submit'></input>
          </form>
        </div>
      </section>
      {sentQuery ? (
        <div className='search-status'>
          <h3 className='search-status--query'>Searched for: {stringQuery}</h3>
        </div>
      ) : (
        ''
      )}
      {noData ? (
        <div className='search-status'>
          <h3 className='search-status--message'>No search results. Try again!</h3>
        </div>
      ) : (
        ''
      )}
      {results ? <RenderedCards results={results} /> : ''}
    </section>
  );
};

export default Home;








// import React, {useState, useEffect} from 'react';
// import RenderedCards from '../../components/RenderedCards/RenderedCards'
// import axios from 'axios';

// function Home() {
//   const [results, setResults] = useState(null);
//   const [noData, setNoData] = useState(null);

//   const api = 'https://rickandmortyapi.com/api/character/';

//   const getCharacters = endpoint => {
//     fetch(endpoint)
//     .then(res => res.json())
//     .then(data => {
//       if(data.error) {
//         console.error('Error:', data.error);
//         setNoData(true);
//         setResults('')
//       }else{
//         console.log('Success:', data);
//         setNoData(false);
//         setResults(data);
//         console.log(noData)
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setNoData(true)
//     })
//   }

//   useEffect(() => {
//     setResults(getCharacters(api))
//   }, [])

//   return (
//     <div>
//       {noData ? 
//         <h3>No results.</h3>
//       : ''}
//       <div>
//         {results ? <RenderedCards results={results} /> : ''}
//       </div>
//     </div>
//   )
// }

// export default Home

