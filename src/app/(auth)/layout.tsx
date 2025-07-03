import { Metadata } from 'next';
import Header from "./Components/MainHeader";
import NavLink from "./Nav-links";

// We Already defined html and css in root layout 
export const metadata: Metadata = {
  title: {
    template: 'Docref',
    default: 'Docref',
  },
  description: 'Document Reference System',
  metadataBase: new URL('https://askjunior-docref-eta.vercel.app'),
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white shadow-sm border-r border-gray-300 overflow-y-auto">
          <NavLink />
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}