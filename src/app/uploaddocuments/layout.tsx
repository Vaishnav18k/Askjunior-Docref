'use client'
import { EdgeStoreProvider } from "../lib/edgestore";

import { ConvexClientProvider } from "../ConvexClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConvexClientProvider>
      <EdgeStoreProvider>
    
    
    {children}</EdgeStoreProvider></ConvexClientProvider>;
}
