import Footer from '@/components/client/Footer'
import NavbarClient from '@/components/client/NavbarClient'
import Typer from '@/components/client/Typer';
import React from 'react'

const Main = ({ children }) => {
  return (
    <>
    
      <div className="flex flex-col min-h-screen">
        <NavbarClient />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Main;
