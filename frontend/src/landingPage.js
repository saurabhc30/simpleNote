import React from "react";
import Navbar from './Navbar'
import {Link} from 'react-router-dom';
import { Apple, Monitor, Smartphone, Laptop, Download } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col" style={{ backgroundColor: "#1f2123" }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">The simplest way to keep notes</h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-6">
          All your notes, synced on all your devices. Get NoteApp now for iOS,
          Android, Mac, Windows, Linux, or in your browser.
        </p>
        <Link to="/signup">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-lg">
            Sign up now
          </button>
        </Link>
      </section>

      {/* Features */}
      <section className="bg-gray-800 py-16 px-8 text-center border-t border-gray-700" style={{ backgroundColor: "#1f2123" }}>
        <h3 className="text-2xl font-bold mb-10">
          Comprehensive underneath, simple on the surface
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
            <h4 className="font-semibold text-lg">Use it everywhere</h4>
            <p className="text-gray-300 text-sm mt-2">
              Notes stay updated across all your devices, automatically and in real time.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
            <h4 className="font-semibold text-lg">Stay organized</h4>
            <p className="text-gray-300 text-sm mt-2">
              Add tags to find notes quickly with instant searching.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
            <h4 className="font-semibold text-lg">Markdown support</h4>
            <p className="text-gray-300 text-sm mt-2">
              Write, preview, and publish your notes in Markdown format.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 text-center border-t border-gray-700" >
        <h3 className="text-2xl font-bold mb-10">What people are saying</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <blockquote className="bg-gray-800 p-6 rounded-2xl">
            <p className="italic">
              "If you're not using NoteApp, you're missing out."
            </p>
            <footer className="text-gray-400 mt-2">— TechCrunch</footer>
          </blockquote>
          <blockquote className="bg-gray-800 p-6 rounded-2xl">
            <p className="italic">
              "A cross-platform tool with just enough frills."
            </p>
            <footer className="text-gray-400 mt-2">— MacWorld</footer>
          </blockquote>
          <blockquote className="bg-gray-800 p-6 rounded-2xl">
            <p className="italic">
              "Distraction-free environment for all note needs."
            </p>
            <footer className="text-gray-400 mt-2">— Zapier</footer>
          </blockquote>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-gray-800 py-16 px-8 text-center border-t border-gray-700" style={{ backgroundColor: "#1f2123" }}>
        <h3 className="text-2xl font-bold mb-6">Available on all your devices</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <button className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 py-3 rounded-xl">
            <Apple /> App Store
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 py-3 rounded-xl">
            <Smartphone /> Play Store
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 py-3 rounded-xl">
            <Monitor /> Windows
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 py-3 rounded-xl">
            <Laptop /> Mac
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 py-3 rounded-xl">
            <Download /> Linux
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm border-t border-gray-700" style={{ backgroundColor: "#1f2123" }}>
        <p>© {new Date().getFullYear()} NoteApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
