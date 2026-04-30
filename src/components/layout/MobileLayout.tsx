import { Outlet } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import BottomNavBar from './BottomNavBar';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex justify-center w-full">
      <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl overflow-x-hidden">
        <TopAppBar />
        <div className="pt-16 pb-24 h-full relative z-10">
          <Outlet />
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
}
