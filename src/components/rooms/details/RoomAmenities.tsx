import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaShieldAlt,
  FaWater,
  FaBolt,
  FaCouch,
  FaDumbbell,
  FaSwimmingPool,
  FaTshirt,
} from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";
import { IconComponent } from "@/components/common";

interface RoomAmenitiesProps {
  amenities?: {
    id: number;
    description: string | null;
    amenity: {
      id: number;
      name: string;
      icon: string;
      description: string | null;
    };
  }[];
}

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  // If amenities are provided from API, use them
  if (amenities && amenities.length > 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Amenities & Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 bg-white dark:bg-dropdown rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <IconComponent
                    icon={item.amenity.icon}
                    className="text-primary"
                    size="lg"
                  />
                </div>
                <span className="font-semibold text-lg">
                  {item.amenity.name}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
                  {item.description}
                </p>
              )}
              {item.amenity.description && !item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
                  {item.amenity.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0 mt-0.5">
              <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-sm" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                Verified Amenities
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                All listed amenities have been verified by our team during
                property inspection. If any amenity is missing or not as
                described, we guarantee a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to default amenities if none provided
  const amenitiesCategories = [
    {
      title: "Basic Amenities",
      items: [
        { label: "High-Speed WiFi", icon: <FaWifi /> },
        { label: "24/7 Electricity", icon: <FaBolt /> },
        { label: "Water Supply", icon: <FaWater /> },
        { label: "Furnished", icon: <FaCouch /> },
      ],
    },
    {
      title: "Kitchen & Dining",
      items: [
        { label: "Modern Kitchen", icon: <FaUtensils /> },
        { label: "Cable TV", icon: <FaTv /> },
        { label: "Laundry Service", icon: <FaTshirt /> },
      ],
    },
    {
      title: "Building Features",
      items: [
        { label: "Parking Space", icon: <FaCar /> },
        { label: "24/7 Security", icon: <FaShieldAlt /> },
        { label: "Elevator Access", icon: <FaElevator /> },
        { label: "Air Conditioning", icon: <FaSnowflake /> },
      ],
    },
    {
      title: "Premium Features",
      items: [
        { label: "Gym Access", icon: <FaDumbbell /> },
        { label: "Swimming Pool", icon: <FaSwimmingPool /> },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Amenities & Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenitiesCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white dark:bg-dropdown rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.items.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <span className="text-primary text-sm">{amenity.icon}</span>
                  </div>
                  <span className="font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0 mt-0.5">
            <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-sm" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              Verified Amenities
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              All listed amenities have been verified by our team during
              property inspection. If any amenity is missing or not as
              described, we guarantee a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
