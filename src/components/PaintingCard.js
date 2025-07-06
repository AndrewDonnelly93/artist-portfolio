import Image from 'next/image';

const PaintingCard = ({ painting }) => {
  const {
    title,
    dimensions,
    description,
    imageUrl,
    purchaseLink,
    printLink,
  } = painting;

  return (
    <article className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Image
          src={`https:${imageUrl}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          priority={true}
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold font-serif mb-2 text-gray-900">{title}</h2>
        <p className="text-sm italic text-gray-700 mb-3 line-clamp-3">{description}</p>
        <p className="text-sm text-gray-500 mb-4">{dimensions}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={purchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Buy Original
          </a>
          {printLink && (
            <a
              href={printLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-primary text-primary rounded-md shadow hover:bg-primary hover:text-white transition-colors"
            >
              Buy Print
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default PaintingCard;