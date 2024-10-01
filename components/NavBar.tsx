import Link from 'next/link';
import { ModeToggle } from '@/components/ThemeToggler';
export default function Navbar() {
  return (
    <nav className="bg-gray-100  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          <h1 className="text-black">Date Recurrence</h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            {' '}
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
