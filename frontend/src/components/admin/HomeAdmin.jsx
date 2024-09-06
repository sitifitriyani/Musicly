import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { Music, Album, Users, ListMusic } from 'lucide-react'; // Ikon dari Lucide React

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomeAdmin() {
  const [stats, setStats] = useState({
    totalTracks: 50,
    totalAlbums: 10,
    totalArtists: 15,
    totalGenre: 5,
    totalHistory: 3,
  });

  // Data untuk chart
  const data = {
    labels: ['Tracks', 'Albums', 'Artists', 'Genres', 'History'],
    datasets: [
      {
        label: 'Total',
        data: [stats.totalTracks, stats.totalAlbums, stats.totalArtists, stats.totalGenre, stats.totalHistory],
        backgroundColor: ['#6B21A8', '#6B21A8', '#6B21A8', '#6B21A8', '#6B21A8'],
        borderColor: ['#4C1D95', '#4C1D95', '#4C1D95', '#4C1D95', '#4C1D95'],
        borderWidth: 1,
      },
    ],
  };

  // Konfigurasi chart
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Statistics Overview' },
    },
    scales: {
      y: {
        ticks: { color: '#A78BFA' }, // Warna ungu pada ticks
      },
      x: {
        ticks: { color: '#A78BFA' }, // Warna ungu pada ticks
      }
    }
  };

  return (
    <div>
      <NavbarAdmin user={{ fname: 'John', lname: 'Doe' }} />
      <div className="bg-gray-900 min-h-screen p-5 flex gap-5">
        <SidebarAdmin />
        <div className="flex flex-col flex-1 p-6 space-y-4">
          <div className="flex-1 bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <div className="uppercase text-sm text-purple-300">Tracks</div>
                  <div className="text-4xl font-bold text-purple-400">{stats.totalTracks}</div>
                </div>
                <Music className="w-12 h-12 text-purple-500" />
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <div className="uppercase text-sm text-purple-300">Albums</div>
                  <div className="text-4xl font-bold text-purple-400">{stats.totalAlbums}</div>
                </div>
                <Album className="w-12 h-12 text-purple-500" />
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <div className="uppercase text-sm text-purple-300">Artists</div>
                  <div className="text-4xl font-bold text-purple-400">{stats.totalArtists}</div>
                </div>
                <Users className="w-12 h-12 text-purple-500" />
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <div className="uppercase text-sm text-purple-300">Genres</div>
                  <div className="text-4xl font-bold text-purple-400">{stats.totalGenre}</div>
                </div>
                <ListMusic className="w-12 h-12 text-purple-500" />
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <div className="uppercase text-sm text-purple-300">History</div>
                  <div className="text-4xl font-bold text-purple-400">{stats.totalHistory}</div>
                </div>
                <ListMusic className="w-12 h-12 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Statistics Overview</h3>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
