import React, { useEffect, useReducer } from 'react'
import { getAll, getAllTags, search, getAllByTag } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';
import { useLoading } from '../../hooks/useLoading';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch(action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

export default function HomePage() {
  const { showLoading, hideLoading } = useLoading()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { foods, tags } = state;
  // Returns object of key/value pairs of dynamic params from current URL matched by <Route path>, in this case it would be :searchTerm in /search/:searchTerm
  const { searchTerm, tag } = useParams();

  useEffect( () => {
    getAllTags().then(tags => {
      showLoading()
      dispatch({ type: 'TAGS_LOADED', payload: tags })})
    const loadFoods =
    tag ?
    getAllByTag(tag) : 
    searchTerm ? 
    search(searchTerm) : 
    getAll();
    
    loadFoods.then(foods => {
      hideLoading()
      dispatch({ type: "FOODS_LOADED", payload: foods })});
  }, [searchTerm, tag])

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText='Reset Search' />}
      <Thumbnails foods={foods} />
    </>
  )
}
