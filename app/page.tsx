import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-orange-600 min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Your App Name</h1>
        <nav className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-orange-200">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-orange-600 hover:bg-orange-50">Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4">Welcome to Our Amazing App</h2>
          <p className="text-lg text-orange-100 mb-8">
            Discover the power of our platform and unlock new possibilities.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 text-lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-orange-50 hover:text-orange-600 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 text-center text-white">
        <p>&copy; 2023 Your App. All rights reserved.</p>
      </footer>
    </div>
  )
}
