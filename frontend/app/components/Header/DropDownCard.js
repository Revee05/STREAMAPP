import Image from 'next/image';

const DropDownCard = ({ posterUrl, title, description }) => {
  return (
    <div className="flex items-center gap-4 p-2 bg-[#141414] rounded-md shadow-lg max-w-xs hover:bg-[#333333] cursor-pointer transition-colors duration-300">
      {/* Poster Image */}
      <Image
        src={posterUrl}
        alt={title}
        className="object-cover rounded-sm"
        width={50}
        height={75}
      />

      {/* Text Section: Title and Description */}
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className="text-white text-sm font-semibold truncate">{title}</h4>
        <p className="text-gray-400 text-xs truncate">{description}</p>
      </div>
    </div>
  );
};

export default DropDownCard;
