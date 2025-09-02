import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface Props {
  name: string;
  phone: string;
  email: string;
}

export default function RoomOwnerCard({ name, phone, email }: Props) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3">Owner Information</h2>
      <p className="font-medium">{name}</p>
      <div className="flex items-center gap-2 text-gray-700 mt-2">
        <FaPhoneAlt className="text-primary" /> {phone}
      </div>
      <div className="flex items-center gap-2 text-gray-700 mt-1">
        <FaEnvelope className="text-primary" /> {email}
      </div>
    </div>
  );
}
