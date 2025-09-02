import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaShieldAlt,
} from "react-icons/fa";

const amenitiesList = [
  { label: "WiFi", icon: <FaWifi /> },
  { label: "Parking", icon: <FaCar /> },
  { label: "AC", icon: <FaSnowflake /> },
  { label: "Kitchen", icon: <FaUtensils /> },
  { label: "TV", icon: <FaTv /> },
  { label: "Security", icon: <FaShieldAlt /> },
];

export default function RoomAmenities() {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenitiesList.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-700">
            <span className="text-primary">{a.icon}</span>
            <span>{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
