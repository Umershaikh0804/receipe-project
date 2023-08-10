import './App.css';
import React, { useEffect, useState } from 'react';
import Recipe from './Reciepe';

const App = () => {
  const APP_ID="d1c010e3";
  const APP_KEY="0f48c6a7cdf1c99f46ddec1f8f6423a3";

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken");

  const updateSearch = (event) =>{
    setSearch(event.target.value);
  }

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async  () =>{
      const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data=await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
  }

   const getSearch = (event) =>{
         event.preventDefault();
         setQuery(search);
         setSearch('');
   }   
  
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" onChange={updateSearch} value={search} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {
      recipes.map((item,ind) =>(
        <Recipe
        key={item.recipe.label}
        title={item.recipe.label} 
        calories={item.recipe.calories} 
        image={item.recipe.image} 
        ingredients={item.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
