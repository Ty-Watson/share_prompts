"use client";
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
       {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};



const Feed = () => {

  const [posts, setPosts] = useState([]);
  //search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return posts.filter((item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag)  ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) =>{
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    setPosts(data);
  }

  useEffect(() => {       
    fetchPosts();    
  }, []);
  
  

  return (
    <section className='feed'>
      <form className='w-full flex-center relative'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/*Check to see if there is searchText */}
      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
          />
      )}
      
    </section>
  )
}

export default Feed