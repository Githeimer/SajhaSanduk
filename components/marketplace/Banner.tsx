export default function Banner() {
  return (
    <div className="relative w-full h-24 sm:h-32 md:h-40 bg-muted mb-6 rounded-lg overflow-hidden">
      <img
        src="./bannerrr.jpg"
        alt="Marketplace banner"
        className="w-full h-full object-cover" // Changed from object-fit to object-cover
      />
      {/* Optional overlay to ensure text readability if needed */}
      <div className="absolute inset-0" /> 
    </div>
  );
}