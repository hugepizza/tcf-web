import Link from "next/link";

function Unauthorized() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">
            Oops! You are not authorized
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            需要激活才能使用此功能
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/login"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Unauthorized;
