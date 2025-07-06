import Link from 'next/link';
import Image from 'next/image';
import { fetchBio } from '../lib/contentful';

const Home = async () => {
  const bio = await fetchBio();

  if (!bio) {
    return <p className="p-6 text-center">Loading bio...</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-serif font-bold mb-6">{bio.name}</h1>
      {bio.photo && (
        <div className="w-48 h-48 mb-6 rounded-full overflow-hidden mx-auto sm:mx-0 sm:float-left sm:mr-6">
          <Image
            src={`https:${bio.photo.fields.file.url}`}
            alt={bio.name}
            width={192}
            height={192}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <p className="whitespace-pre-line text-lg leading-relaxed">{bio.description}</p>

      <nav className="mt-8 flex flex-wrap gap-6 text-blue-600 font-semibold text-lg">
        <Link href="/gallery/landscapes">Landscapes</Link>
        <Link href="/gallery/seascapes">Seascapes</Link>
        <Link href="/gallery/portraits">Portraits</Link>
        <Link href="/order">Order Custom Painting</Link>
      </nav>
    </main>
  );
};

export default Home;