'use client';
import { useState, useEffect, useRef } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Move setDefaults inside useEffect to run once
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY,
      language: 'en',
      region: 'us',
    });

    const fetchCords = async () => {
      try {
        const address = `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`;
        const res = await fromAddress(address);
        
        if (res.status !== 'OK' || res.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);

      } catch (error) {
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCords();
  }, [property]); // Add property as dependency
  
  useEffect(() => {
    if (lat === null || lng === null || map.current) return;
    
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", 
      center: [lng, lat],
      zoom: 14,
      attributionControl: false,
    });
    
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    
    // Add a custom pin
    const markerElement = document.createElement("div");
    markerElement.style.width = "30px";
    markerElement.style.height = "30px";
    markerElement.style.backgroundImage = `url(${pin.src})`;
    markerElement.style.backgroundSize = "contain";
    markerElement.style.backgroundRepeat = "no-repeat";
    
    new maplibregl.Marker({ element: markerElement })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng]);
  
  if (loading) return <Spinner />;
  if (geocodeError) return <div>Failed to load map.</div>;
  
  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", borderRadius: "8px" }}
    />
  );
};

export default PropertyMap;