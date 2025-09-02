export default function RoomDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Description</h2>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
