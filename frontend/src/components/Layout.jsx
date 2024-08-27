import { Outlet } from "react-router-dom"

const Layout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full py-4 bg-indigo-600 text-white text-center text-3xl font-bold">
        Code Quest
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="w-full py-4 bg-indigo-600 text-white text-center">
        © 2024 Code Quest
      </footer>
    </div>
  )
}

export default Layout