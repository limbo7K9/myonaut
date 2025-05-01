import DashboardNavbar from '@/components/DashboardNavbar';

export default function LogPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <DashboardNavbar />
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-6 shadow-lg">
        <h1 className="text-3xl font-bold">Log</h1>
      </div>
    </div>
  );
}