import React, { useState } from "react";
import Modal from "./Modal";
import { sleep } from "../utils";
import { deleteImage } from "../api";


const ImageCard = ({ image ,reloadImages}) => {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [error,setError] = useState('')
  const [key,setKey] = useState('');
  const [requestStatus,setRequestStatus] = useState('idle') // idle pending succeeded

  const handleKeyChange = (e)=>{
    setKey(e.target.value)
  }
  const canDelete = key && requestStatus === 'idle'
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    if(canDelete){
      try {
        setError('')
        setRequestStatus('pending')
        
        const {data} = await deleteImage({key,id:image._id})
        reloadImages();
        closeModal();
        // console.log(data)
      } catch (error) {
        setError(error.response.data.msg)
      }finally{
        setRequestStatus('idle')
      }
 
      setKey('')
    }
  }
  const closeModal = ()=>{
    setError('')
    setIsModalOpen(false)
  }
  return (
    <>
      <div
        className={`relative cursor-pointer transition-opacity  ${
          isHover ? "" : ""
        }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    
      >
        <button
          onClick={()=>setIsModalOpen(true)}
          className={`${
            isHover ? "opacity-1" : "opacity-0"
          } absolute right-5 top-2 duration-500  border text-pink-500 border-pink-500  hover:border-red-200  hover:shadow-red-500 text-sm w-16 px-1 py-1 rounded-md `}
        >
          Delete
        </button>
        <img
          className={`${isHover? '':''} rounded-xl w-full block -z-10`}
          src={image.image}
          alt=""
        />
        <div
          className={`${
            isHover ? "opacity-1" : "opacity-0"
          } absolute  text-sm bottom-2 duration-500  text-black  overflow-hidden mx-2 rounded-md py-2 `}
        >
          <p>
            {image.label}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="grid place-items-center h-[80vh] z-30">
            <div
              className="bg-white  max-lg:min-w-[60%] lg:w-[600px] px-5 py-5 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-normal">Add you sure ? </h2>
                <div className="my-3">
                  <label
                    className="text-gray-700 text-sm block mb-1"
                    htmlFor=""
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="key"
                    value={key}
                    onChange={handleKeyChange}
                    className="border w-full border-gray-400 outline-gray-600 rounded-lg px-2 py-2"
                  />
                  <label htmlFor=""  className="text-red-600 font-semibold text-sm block mb-1">{error}</label>
                </div>

                
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={closeModal}
                    className="border border-gray-500 duration-300 hover:border-gray-900 text-sm w-20 px-3 py-2 rounded-md "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!canDelete}
                    className={` outline-0 cursor-pointer text-sm w-20 px-3 py-2 rounded-md duration-300 ${
                     !key
                        ? "bg-gray-400 hover:cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-800"
                    }  text-white`}
                  >
                    {requestStatus === "pending" && (
                      <span className="loader"></span>
                    )}
                    {(requestStatus === "idle" ||
                      requestStatus === "succeeded") &&
                      "Delete"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ImageCard;
