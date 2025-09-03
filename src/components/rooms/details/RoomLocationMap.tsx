export default function RoomLocationMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  return (
    <div className="rounded-xl overflow-hidden border shadow-sm h-72">
      <iframe
        src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
}
