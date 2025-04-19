
import NavBarAdmin from '@/components/admin/NavBarAdmin';

import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarAdmin />

      <main className="flex-grow">
        {children}
      </main>

    
    </div>
  );
};

export default AdminLayout;
