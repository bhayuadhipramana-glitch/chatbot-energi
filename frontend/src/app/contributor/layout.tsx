import React from 'react';

// Metadata spesifik untuk halaman ini (Opsional, tapi aman)
export const metadata = {
  title: "EnerNova - Contributor Area",
  description: "Dashboard khusus untuk kontributor jurnal.",
};

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-slate-50">
      {/* PENTING:
        Jangan import 'globals.css' atau 'fonts' disini.
        Semua gaya sudah otomatis turun dari src/app/layout.tsx
      */}
      {children}
    </section>
  );
}