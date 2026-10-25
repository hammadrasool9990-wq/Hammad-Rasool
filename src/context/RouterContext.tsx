import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteMatch {
  name: 'home' | 'shop' | 'product' | 'cart' | 'about' | 'not-found';
  params: {
    slug?: string;
  };
}

interface RouterContextType {
  currentPath: string;
  route: RouteMatch;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseRoute(path: string): RouteMatch {
  // Normalize path
  const cleanPath = path.split('?')[0].split('#')[0] || '/';

  if (cleanPath === '' || cleanPath === '/') {
    return { name: 'home', params: {} };
  }
  if (cleanPath === '/shop' || cleanPath === '/collections') {
    return { name: 'shop', params: {} };
  }
  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '').replace(/\/$/, '');
    return { name: 'product', params: { slug } };
  }
  if (cleanPath === '/cart' || cleanPath === '/bag') {
    return { name: 'cart', params: {} };
  }
  if (cleanPath === '/about' || cleanPath === '/contact') {
    return { name: 'about', params: {} };
  }

  return { name: 'not-found', params: {} };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo(0, 0);
  };

  const route = parseRoute(currentPath);

  return (
    <RouterContext.Provider value={{ currentPath, route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
