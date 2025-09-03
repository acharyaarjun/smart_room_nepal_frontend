import { FaPhoneAlt, FaEnvelope, FaStar, FaShieldAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";

interface Props {
  name: string;
  phone: string;
  email: string;
  verified?: boolean;
  responseTime?: string;
  properties?: number;
  joinedDate?: string;
  avatar?: string;
  rating?: number;
}

export default function RoomOwnerCard({
  name,
  phone,
  email,
  verified = false,
  responseTime = "Usually within 24 hours",
  properties = 0,
  joinedDate = "2023",
  avatar,
  rating = 4.5,
}: Props) {
  return (
    <div className="bg-white dark:bg-dropdown rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Property Owner
      </h3>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={60}
              height={60}
              className="w-15 h-15 rounded-full object-cover"
            />
          ) : (
            <div className="w-15 h-15 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-xl">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {verified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <FaCircleCheck className="text-white text-xs" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            {verified && (
              <FaShieldAlt
                className="text-green-500 text-sm"
                title="Verified Owner"
              />
            )}
          </div>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-xs ${
                  i < Math.floor(rating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {rating}
            </span>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>{properties} properties listed</p>
            <p>Member since {joinedDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaPhoneAlt className="text-primary text-sm" />
          <span className="text-sm">{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaEnvelope className="text-primary text-sm" />
          <span className="text-sm">{email}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Response time:</span> {responseTime}
        </div>
      </div>
    </div>
  );
}
