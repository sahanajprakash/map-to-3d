import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import BabylonScene from "./ReactBabylon";
import './MapComponent.css'
mapboxgl.accessToken =
  "your_access_token";
// console.log(process.env);
export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    console.log(map.current);
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      setImageURL(map.current.getCanvas().toDataURL());
    });
    map.current.on("load", () =>
      setImageURL(map.current.getCanvas().toDataURL())
    );
    console.log("before", map.current.getCanvas());
  });
  const handleOnClick = () => {
    console.log("after", map.current.getCanvas());

    if (map.current) {
      setImageURL(map.current.getCanvas().toDataURL());
      //  console.log(imageURL);
    }
  };

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <button className={"button"} onClick={handleOnClick}>Click to add texture</button>
      {imageURL && <BabylonScene capturedImageData={imageURL} />}
    </div>
  );
}
