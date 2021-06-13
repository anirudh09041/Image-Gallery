import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import { ImageSearch } from "./components/ImageSearch";

function App() {
  const [images, setimages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=21962310-404b9e7f8a61f34a5f94ad2b2&q=${term}s&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setimages(data.hits);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchtext={(text) => setTerm(text)} />
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
