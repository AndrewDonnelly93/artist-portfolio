import Link from 'next/link';

const Header = () => (
  <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
    <h1 className="text-3xl font-serif font-bold text-primary mb-4 sm:mb-0">
      <Link href="/">Artist Portfolio</Link>
    </h1>
    <nav aria-label="Primary" className="space-x-6 text-lg font-semibold text-primary">
      <Link href="/gallery/landscapes">
        <a className="hover:underline focus:underline focus:outline-none">Landscapes</a>
      </Link>
      <Link href="/gallery/seascapes">
        <a className="hover:underline focus:underline focus:outline-none">Seascapes</a>
      </Link>
      <Link href="/gallery/portraits">
        <a className="hover:underline focus:underline focus:outline-none">Portraits</a>
      </Link>
      <Link href="/order">
        <a className="hover:underline focus:underline focus:outline-none">Order Custom Painting</a>
      </Link>
    </nav>
  </header>
);

export default Header;