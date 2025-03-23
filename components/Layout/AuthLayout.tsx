import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Gradient */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 text-slate-900/[0.07]">
        <div 
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: "url('/bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        {/* Logo */}
        <img
          src="/ai-logo.png"
          alt="AI Logo"
          className="mx-auto mb-16 h-12 w-auto"
        />

        {/* Content */}
        <div className="w-full max-w-sm">{children}</div>
      </div>

      {/* Footer */}
      <footer className="relative shrink-0 hidden">
        <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 hidden">
          <p className="text-center sm:text-left">{"Don't have an account?"}</p>
          <a
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
            href="/all-access"
          >
            <span>
              Get access <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </footer>
    </main>
  );
}

export default AuthLayout;
