import React from 'react'
import { ThemeProvider } from './theme-provider'
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './authProvider';
import { DataProvider } from './websiteProvider';
import { Toaster } from 'sonner';

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    
    <SessionProvider>
      <Toaster  />
      <AuthProvider>
<DataProvider>

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
        {children}
      </ThemeProvider>
          </DataProvider>
        </AuthProvider>
    </SessionProvider>
  );
}

export default Provider