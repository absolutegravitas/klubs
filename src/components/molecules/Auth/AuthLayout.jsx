export function AuthLayout({ children }) {
  return (
    <>
      <div className="relative flex justify-center min-h-full font-display md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-col px-8 pt-5 pb-10 bg-white flex-2 sm:justify-center md:flex-none">
          <div className="w-full max-w-md mx-auto sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
