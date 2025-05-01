import DashboardNavbar from '@/components/DashboardNavbar';

export default function WorkoutPage() {
  return (
    <div className="container mx-auto p-4">
      <DashboardNavbar />
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-6 shadow-lg">
        <h1 className="text-3xl font-bold">Workout</h1>
      </div>
    </div>
  );
}