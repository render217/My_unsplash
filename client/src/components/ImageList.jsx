import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCard from "./ImageCard";
// const images = [
//   "https://images.unsplash.com/photo-1461533278846-61f54cf9c4b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1348&q=80",
//   "https://images.unsplash.com/photo-1455315199916-560fe73c898e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
//   "https://images.unsplash.com/photo-1459198271347-f4579bf73dac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
//   "https://images.unsplash.com/photo-1482364686255-be52310ff475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
//   "https://plus.unsplash.com/premium_photo-1675756583749-37f678357945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//   "https://images.unsplash.com/photo-1642599870105-a7a6d4ee09a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=927&q=80",
// ];

const ImageList = ({images, reloadImages}) => {
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
        <Masonry gutter="20px">
          {images.map((image, i) => (
            <ImageCard key={i} image={image} reloadImages={reloadImages}/>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default ImageList;
