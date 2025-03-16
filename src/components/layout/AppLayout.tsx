import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import SearchBar from "../search/SearchBar";

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl mr-8">
              MRI Safety DB
            </Link>
            <div className="hidden md:flex space-x-1">
              <Link to="/devices">
                <Button variant="ghost" size="sm">
                  Devices
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="ghost" size="sm">
                  Categories
                </Button>
              </Link>
              <Link to="/manufacturers">
                <Button variant="ghost" size="sm">
                  Manufacturers
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchBar
              placeholder="Search for a device..."
              onSearch={handleSearch}
            />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 hover:cursor-pointer">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt={user.email || ""}
                    />
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl border-none shadow-lg"
                >
                  <DropdownMenuLabel className="text-xs text-gray-500">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => signOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden border-t border-gray-100 px-4 py-3">
          <SearchBar
            placeholder="Search for a device..."
            onSearch={handleSearch}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">
                MRI Safety Database
              </h4>
              <p className="text-gray-600 mb-4">
                A resource for healthcare professionals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/devices" className="hover:underline">
                    All Devices
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/manufacturers" className="hover:underline">
                    Manufacturers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:underline">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link to="/about/data" className="hover:underline">
                    Data Sources
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="hover:underline">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 text-center text-xs">
            <p>
              © 2024 MRI Safety Database. All information should be verified
              with official manufacturer documentation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
