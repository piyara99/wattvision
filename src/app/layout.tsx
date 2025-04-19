import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Google Fonts
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Page metadata
export const metadata: Metadata = {
  title: 'Wattvision Dashboard',
  description: 'Energy monitoring made simple',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-[#0F0F11] text-white font-sans">
        <Toaster richColors position="top-right" />
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-20 bg-[#18181B] flex flex-col items-center py-6 space-y-10">
            <div className="flex flex-col items-center space-y-8">
              <div className="text-2xl font-bold">⚡</div>
              <nav className="flex flex-col gap-8">
                <a href="#" className="text-white hover:text-purple-400">
                  🏠
                </a>
                <a href="#" className="text-white hover:text-purple-400">
                  🛰️
                </a>
                <a href="#" className="text-white hover:text-purple-400">
                  📜
                </a>
                <a href="#" className="text-white hover:text-purple-400">
                  ⚙️
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#E4DBF9] text-black p-6 rounded-2xl shadow">
                <div className="text-4xl font-bold">1.2 KWh</div>
                <div className="text-gray-700 mt-2">Used today</div>
              </div>
              <div className="bg-[#6C4DBF] text-white p-6 rounded-2xl shadow flex flex-col justify-between">
                <div className="text-4xl font-bold">120 W</div>
                <div className="flex items-center mt-2 gap-2">
                  ⚡ <span>Power being used</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-600 mb-8" />

            {/* Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sensor 1 */}
              <div className="bg-[#E4DBF9] text-black p-4 rounded-2xl flex flex-col gap-4 shadow">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">60 W</div>
                  <div className="text-sm text-gray-600">240V 0.25A</div>
                </div>
                <div className="text-lg">Kitchen Power</div>
                {/* Graph Placeholder - replace this with <EnergyChart /> if ready */}
                <div className="h-24 bg-[#D6C8F0] rounded-lg flex items-center justify-center text-xs text-gray-600">
                  Graph showing usage
                </div>
              </div>

              {/* Sensor 2 */}
              <div className="bg-[#E4DBF9] text-black p-4 rounded-2xl flex flex-col gap-4 shadow">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">60 W</div>
                  <div className="text-sm text-gray-600">240V 0.25A</div>
                </div>
                <div className="text-lg">Living Room</div>
                {/* Graph Placeholder */}
                <div className="h-24 bg-[#D6C8F0] rounded-lg flex items-center justify-center text-xs text-gray-600">
                  Graph showing usage
                </div>
              </div>
            </div>

            {/* Dynamic Page Content */}
            <div className="mt-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
