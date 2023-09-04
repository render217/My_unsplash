import React, { useState } from "react";
import Modal from "./Modal";
import { uploadImage } from "../api";
import { sleep } from "../utils";

const Header = ({ reloadImages }) => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle"); // idle pending succeeded
  const [formData, setFormData] = useState({
    label: "",
    imageUrl: "",
    key: "",
  });
  const handleSearch = () => {
    reloadImages(searchVal);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const openAddModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setError("");
    setIsOpenModal(false);
    // setRequestStatus("idle");
  };
  const canSave =
    [formData.imageUrl, formData.label, formData.key].every(Boolean) &&
    requestStatus === "idle";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setError("");
        setRequestStatus("pending");
        const {data} = await uploadImage(formData)
        // console.log(data)
        reloadImages();
        closeModal();
      } catch (error) {
        // console.log(error)
        setError(error.response.data.msg);
      } finally {
        setRequestStatus("idle");
      }
      setFormData({
        imageUrl: "",
        key: "",
        label: "",
      });
    }
  };
  return (
    <>
      <div className="py-4 px-2 flex gap-4 items-center flex-wrap ">
        <img
          className="max-sm:mx-auto sm:mx-0"
          src="my_unsplash_logo.svg"
          alt=""
        />
        <div className="border border-gray-500 rounded-full ps-4  text-sm flex items-center gap-2 max-sm:w-full  sm:max-w-[200px]">
          <i
            className="fa-solid fa-magnifying-glass text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={handleSearch}
          ></i>
          <input
            onKeyUp={(e) => (e.key === "Enter" ? handleSearch() : "")}
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full outline-0 border-0 py-2 rounded-e-full px-2 text-gray-500"
          />
        </div>
        <button
          onClick={openAddModal}
          className="max-sm:mx-auto sm:ml-auto outline-0 text-sm px-3 py-2 rounded-md duration-300 bg-green-600 hover:bg-green-700 text-white"
        >
          Add Photo
        </button>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="grid place-items-center h-[80vh] z-30">
            <div
              className="bg-white  max-lg:min-w-[60%] lg:w-[600px] px-5 py-5 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-normal">Add a new photo</h2>
                <label
                  htmlFor=""
                  className="text-red-600 font-semibold text-sm block mb-1"
                >
                  {error}
                </label>
                <div className="my-3">
                  <label
                    className="text-gray-700 text-sm block mb-1"
                    htmlFor=""
                  >
                    Label
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="border w-full border-gray-400 outline-gray-600 rounded-lg px-2 py-2"
                  />
                </div>
                <div className="my-3">
                  <label
                    className="text-gray-700 text-sm block mb-1"
                    htmlFor=""
                  >
                    Image url
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="border w-full border-gray-400 outline-gray-600 rounded-lg px-2 py-2"
                  />
                </div>
                <div className="my-3">
                  <label
                    className="text-gray-700 text-sm block mb-1"
                    htmlFor=""
                  >
                    Key
                  </label>
                  <input
                    type="text"
                    name="key"
                    value={formData.key}
                    onChange={handleInputChange}
                    className="border w-full border-gray-400 outline-gray-600 rounded-lg px-2 py-2"
                  />
                  <label className="text-xs text-gray-500 ">
                    Keep the key safe for future image deletion
                  </label>
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
                    disabled={!canSave}
                    className={` outline-0 cursor-pointer text-sm w-20 px-3 py-2 rounded-md duration-300 ${
                      ![formData.imageUrl, formData.key, formData.label].every(
                        Boolean
                      )
                        ? "bg-gray-400 hover:cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-800"
                    }  text-white`}
                  >
                    {requestStatus === "pending" && (
                      <span className="loader"></span>
                    )}
                    {(requestStatus === "idle" ||
                      requestStatus === "succeeded") &&
                      "Submit"}
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

export default Header;
