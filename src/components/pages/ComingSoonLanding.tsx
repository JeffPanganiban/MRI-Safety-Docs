import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Mail,
  Search,
  Shield,
  Clock,
  TriangleAlert,
} from "lucide-react";

export default function ComingSoonLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ger early access");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // In a real app, you would send this to your backend
    console.log("Email submitted:", email);
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      {/* Navigation */}
      <nav className="w-full py-6 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/80 fixed top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MRI Safety Docs
            </span>
          </div>
          <div className="hidden md:flex items-center">
            <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-300 hover:shadow-lg">
              <span className="flex items-center font-medium">
                Join Waitlist
              </span>
            </Button>
          </div>
          <Button variant="ghost" className="md:hidden" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex-grow flex items-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow-sm"
              >
                <span className="animate-pulse mr-2">●</span>
                <span>Coming Soon</span>
                <div className="w-1 h-1 rounded-full bg-blue-800 mx-2"></div>
                <span>Join the Waitlist</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              >
                Stop{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  wasting time
                </span>{" "}
                searching for MRI safety information
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-lg leading-relaxed"
              >
                No more sifting through binders and confusing manufacturer
                websites. Find the MRI safety details you need in seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-6 mt-2"
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600">
                    <Search size={18} />
                  </div>
                  <span className="text-gray-700">Instant search</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600">
                    <Shield size={18} />
                  </div>
                  <span className="text-gray-700">Verified data</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600">
                    <Clock size={18} />
                  </div>
                  <span className="text-gray-700">Save time</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4"
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md"
                >
                  <div className="flex-grow relative">
                    <Input
                      type="email"
                      placeholder="Enter your email for early access"
                      className={`h-14 pl-4 pr-4 rounded-full text-base shadow-sm border-blue-100 ${error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-blue-500"}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={submitted}
                    />

                    {error && (
                      <p className="text-red-500 text-sm mt-1 ml-4">{error}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-14 rounded-full px-8 font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-300 hover:shadow-lg"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <span className="flex items-center">
                        <Check className="mr-2 h-5 w-5" />
                        Subscribed
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Join Waitlist
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 mt-2 ml-4 font-medium"
                  >
                    Thank you! We'll notify you when we launch.
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
                <div className="p-3">
                  <img
                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
                    alt="MRI Safety App Interface"
                    className="rounded-2xl w-full h-auto shadow-sm"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
              >
                Beta
              </motion.div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -left-10 top-1/4 bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3 border border-blue-100"
              >
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                  <TriangleAlert size={16} />
                </div>
                <span className="text-sm font-medium">MR Conditional</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -right-6 bottom-1/3 bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3 border border-blue-100"
              >
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <Check size={16} />
                </div>
                <span className="text-sm font-medium">MR Safe</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
