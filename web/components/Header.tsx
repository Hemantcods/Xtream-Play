import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/" className="text-xl font-semibold text-gray-800">
                Tournament Hub
              </Link>
            </div>
            <div className="flex h-full content-center">
              <div className="ml-10 flex items-center space-x-4 ">
                <Link href="/" className="px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/dashboard" className="px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/dashboard/create" className="px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  Create Tournament
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-full items-center">
            <div className="ml-4 flex h-10 items-centre md:ml-6 ">
              <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}