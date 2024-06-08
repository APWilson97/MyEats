import React, { useEffect, useReducer } from 'react'
import { getAll, search } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch(action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { foods } = state;
  // Returns object of key/value pairs of dynamic params from current URL matched by <Route path>, in this case it would be :searchTerm in /search/:searchTerm
  const { searchTerm } = useParams();

  useEffect( () => {
    const loadFoods = searchTerm ? search(searchTerm) : getAll();

    loadFoods.then(foods => dispatch({ type: "FOODS_LOADED", payload: foods }));
  }, [searchTerm])

  return (
    <>
      <Search />
      <Thumbnails foods={foods} />
    </>
  )
}
