import React, { useEffect, useState } from "react";
import "./App.css";
import { BsSearchHeartFill } from "react-icons/bs";

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);

  let apiKey = "o69TBwO9n8alhcatROf2wfNl5nGKZVxdJ_qia_pO_8o";
  let photo_Url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30`;

  async function searchImage() {
    let search_url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30&query=${search}`;

    await fetch(search_url)
      .then((res) => res.json())
      .then((data) => setImages(data));
    setSearch("");
  }

  function showPopUp(item) {
    let popup = document.getElementById("popup");
    let downloadbtn = document.getElementById("downloadbtn");
    let imagepp = document.getElementById("imagepp");

    popup.classList.remove("hide");
    downloadbtn.setAttribute("href", `${item.links.html}`);
    imagepp.src = item.urls.regular;
  }
  function colosePopup() {
    let popup = document.getElementById("popup");
    popup.classList.add("hide");
  }

  useEffect(() => {
    async function fetchImages() {
      await fetch(photo_Url)
        .then((res) => res.json())
        .then((data) => setImages(data));
    }
    fetchImages();
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="logo">Random Images</h1>
          <p className="sub_line">View and Download the images Below</p>
          <input
            className="input"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={searchImage}
            className="search"
            style={{
              fontSize: "20px",
              cursor: "pointer",
            }}>
            <BsSearchHeartFill
              style={{
                color: "red",
              }}
            />
          </button>
        </div>
      </div>
      {/* Image Popup */}
      <div className="img-popup hide" id="popup">
        <button className="close" id="closebtn" onClick={colosePopup}>
          X
        </button>
        <a className="download" id="downloadbtn" target="_blank">
          Download
        </a>
        <img className="largr_img" alt="" id="imagepp" />
      </div>
      {/* Gallery */}
      <section className="gallery" id="mainGalleryt">
        {images.map((item, index) => (
          <img
            key={index}
            className="gallery_img"
            src={item.urls.regular}
            alt={`Image ${index}`}
            onClick={() => showPopUp(item)}
          />
        ))}
      </section>
    </>
  );
}

export default App;
