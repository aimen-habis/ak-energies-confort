"use client";

import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITE } from "@/lib/content";

const akIcon = L.divIcon({
  className: "",
  html: `<div style="
      width:34px;height:34px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:linear-gradient(135deg,#ff4d2e,#ffb347 50%,#38bdf8);
      box-shadow:0 8px 24px -4px rgba(255,77,46,0.6);
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);color:#0a0a0f;font-weight:800;font-size:11px;font-family:sans-serif;">AK</span>
    </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

/** Carte de la zone desservie avec un rayon d'intervention de 30 km. */
export default function ZonesMapInner() {
  const center: [number, number] = [SITE.coords.lat, SITE.coords.lng];
  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      className="h-full w-full"
      style={{ minHeight: 320 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle
        center={center}
        radius={30000}
        pathOptions={{
          color: "#ff4d2e",
          weight: 1.5,
          fillColor: "#ff4d2e",
          fillOpacity: 0.08,
        }}
      />
      <Marker position={center} icon={akIcon} />
    </MapContainer>
  );
}
