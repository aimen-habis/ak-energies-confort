"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITE } from "@/lib/content";

/** Custom gradient pin so we don't depend on Leaflet's default marker assets. */
const akIcon = L.divIcon({
  className: "",
  html: `<div style="
      width:38px;height:38px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:linear-gradient(135deg,#ff4d2e,#ffb347 50%,#38bdf8);
      box-shadow:0 8px 24px -4px rgba(255,77,46,0.6);
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);color:#0a0a0f;font-weight:800;font-size:13px;font-family:sans-serif;">AK</span>
    </div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -36],
});

export default function MapInner() {
  return (
    <MapContainer
      center={[SITE.coords.lat, SITE.coords.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: 320 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[SITE.coords.lat, SITE.coords.lng]} icon={akIcon}>
        <Popup>
          <strong>{SITE.name}</strong>
          <br />
          {SITE.city}, {SITE.region}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
