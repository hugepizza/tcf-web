import Link from 'next/link';

const AuthFooter = () => {
  return (
    <footer className="mt-8 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <span className="text-gray-500">Lens 2024</span>
            <Link href="/legal/lens.xyz-privacy-policy.pdf" target="_blank" rel="noreferrer noopener" className="text-gray-500 hover:text-gray-700">
              Privacy
            </Link>
            <Link href="/legal/lens.xyz-terms-and-conditions.pdf" target="_blank" rel="noreferrer noopener" className="text-gray-500 hover:text-gray-700">
              Terms
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/docs" className="text-gray-500 hover:text-gray-700">
              Developer Docs
            </Link>
            <Link href="https://twitter.com/lensprotocol" target="_blank" rel="noreferrer noopener" className="text-gray-500 hover:text-gray-700">
              X (Twitter)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;