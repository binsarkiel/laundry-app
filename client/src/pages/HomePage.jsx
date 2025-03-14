import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Menu, X, WashingMachine as Washing, Calendar, Clock, Star, Shield } from 'lucide-react';


function HomePage() {
    const { user } = useAuth(); // Cek status login
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Jika user sudah login, redirect ke /dashboard (atau halaman lain yang Anda inginkan)
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Tambahkan flex flex-col */}
            {/* Hero Section */}
            <div className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Streamline Your Laundry Business Operations
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Manage transactions, track orders, and grow your laundry business with our comprehensive management system. Perfect for laundromats and dry cleaning services.
                            </p>
                              {/* Gunakan Link untuk navigasi internal */}
                            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</Link>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80"  // Ganti dengan URL gambar atau import dari assets
                                alt="Laundry Service"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

           {/* Features Section */}
            <div id="features" className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose LaundryPro?</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                         <div className="text-center p-6">
                            <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Order Management</h3>
                            <p className="text-gray-600">Track and manage all customer orders efficiently</p>
                        </div>
                        <div className="text-center p-6">
                            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                            <p className="text-gray-600">Monitor order status and progress instantly</p>
                        </div>
                        <div className="text-center p-6">
                            <Star className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Financial Tracking</h3>
                            <p className="text-gray-600">Manage transactions and generate reports</p>
                        </div>
                        <div className="text-center p-6">
                            <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Secure System</h3>
                            <p className="text-gray-600">Keep your business data safe and protected</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div id="pricing" className="bg-blue-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to modernize your laundry business?</h2>
                    <p className="text-xl mb-8">Join successful laundry businesses that trust LaundryPro</p>
                    <Link to="/register" className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded">Contact Us</Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Washing className="h-8 w-8 text-blue-500" />
                    <span className="ml-2 text-xl font-bold">LaundryPro</span>
                  </div>
                  <p className="text-gray-400">Complete laundry business management solution</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Order Management</li>
                    <li>Transaction Tracking</li>
                    <li>Customer Database</li>
                    <li>Financial Reports</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Careers</li>
                    <li>Blog</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>1-800-LAUNDRY</li>
                    <li>support@laundrypro.com</li>
                    <li>123 Wash Street</li>
                    <li>New York, NY 10001</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 LaundryPro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
    );
}

export default HomePage;