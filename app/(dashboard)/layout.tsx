import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { AIChatbot } from '@/components/AIChatbot';
import { NeighborhoodBackground } from '@/components/neighborhood';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Quiet ambient pulse field — much subtler than landing */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50">
        <NeighborhoodBackground mode="ambient" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
      <AIChatbot />
    </div>
  );
}
