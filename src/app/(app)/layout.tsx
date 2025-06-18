"use client";

import { useEffect } from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//code.jivosite.com/widget/lV5610P173';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return children
}

export default Layout