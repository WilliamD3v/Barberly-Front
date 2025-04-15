"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  address: string;
}

export default function MapComponent({ address }: MapProps) {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        const data = await response.json();
        if (data.length > 0) {
          setLocation({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        }
      } catch (error) {
        console.error("Erro ao buscar localização:", error);
      }
    }
    fetchCoordinates();
  }, [address]);

  if (!location) return <p>Carregando mapa...</p>;

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  function UpdateMap() {
    const map = useMap();
    map.setView([location!.lat, location!.lon], 18);
    return null;
  }

  return (
    <MapContainer
      style={{ width: "100%", height: "400px" }}
      center={[location.lat, location.lon]}
      zoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <UpdateMap />
      <Marker position={[location.lat, location.lon]} icon={defaultIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
