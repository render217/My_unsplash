import React, { useCallback, useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from './components/Modal';
import Header from './components/Header';
import Main from './components/Main';
import { getImages,axiosFetch } from './api';


const App = () => {
  const [images,setImages] = useState([])
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('')
  const fetchImage = useCallback(async (searchVal)=>{
      setLoading(true);
      setError('');
      try {
        const {data} = await getImages(searchVal);
        setImages(data.images)
       
      } catch (error) {
        setError(error.response.data.msg);
      }finally{
        setLoading(false);
      }
  },[])

  useEffect(()=>{
     fetchImage();
     console.log(images)
  },[])
 
  return (
    <div className='font-NotoSansJP max-w-screen-xl max-xl:px-5 mx-auto'>
        <Header reloadImages = {fetchImage}/>
        <Main images={images} loading={loading} error={error} reloadImages = {fetchImage}/>
    </div>
  )
}

export default App
