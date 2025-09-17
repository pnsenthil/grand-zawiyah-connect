import React from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CommunityHub } from '@/components/community/CommunityHub';

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CommunityHub />
      <Footer />
    </div>
  );
}