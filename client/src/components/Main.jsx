import React from "react";
import ImageList from "./ImageList";
import ImageListSkeleton from "./ImageListSkeleton";

const Main = ({ images ,reloadImages ,loading,error}) => {
  
  let content;
  if(loading || images.length === 0){
    content = <ImageListSkeleton />
  }
  if(error){
    content = <h1 className="text-center text-2xl">{error}</h1>
    
  }
  if(images && images.length > 0){
    content = <ImageList reloadImages={reloadImages} images={images}/>
  }
  
  return (
    <div className="my-4">
      {content}
    </div>
  );
};

export default Main;
