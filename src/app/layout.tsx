import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import EnergyChart from '@/components/EnergyChart'

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
                {["🏠", "🛰️", "📜", "⚙️"].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-white text-2xl hover:text-purple-400 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#E4DBF9] text-black p-6 rounded-2xl shadow-md">
                <div className="text-4xl font-bold">1.2 kWh</div>
                <div className="text-gray-700 mt-2 text-sm">Used today</div>
              </div>
              <div className="bg-[#6C4DBF] text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
                <div className="text-4xl font-bold">120 W</div>
                <div className="flex items-center mt-2 gap-2 text-sm">
                  ⚡ <span>Power being used</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-700 mb-8" />

            {/* Sensor Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sensor 1 */}
              <div className="bg-[#1E1E2D] p-4 rounded-2xl shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">60 W</div>
                  <div className="text-sm text-gray-400">240V 0.25A</div>
                </div>
                <div className="text-lg font-semibold text-white">Kitchen Power</div>
                {/* Energy Chart */}
                <EnergyChart energyData={[
                  { time: '1AM', value: 55 },
                  { time: '2AM', value: 60 },
                  { time: '3AM', value: 58 },
                  { time: '4AM', value: 63 },
                  { time: '5AM', value: 59 },
                ]} />
              </div>

              {/* Sensor 2 */}
              <div className="bg-[#1E1E2D] p-4 rounded-2xl shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">45 W</div>
                  <div className="text-sm text-gray-400">230V 0.20A</div>
                </div>
                <div className="text-lg font-semibold text-white">Living Room</div>
                {/* Energy Chart */}
                <EnergyChart energyData={[
                  { time: '1AM', value: 40 },
                  { time: '2AM', value: 42 },
                  { time: '3AM', value: 45 },
                  { time: '4AM', value: 43 },
                  { time: '5AM', value: 46 },
                ]} />
              </div>
            </div>

            {/* Page Children */}
            <div className="mt-8">
              {children}
            </div>

          </main>
        </div>
      </body>
    </html>
  );
}
