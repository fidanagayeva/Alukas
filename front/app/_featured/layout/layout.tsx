"use client";
import React, { ReactNode } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Blog from '@/app/blog/blog';



export default function Layout() {
  return (
    <>
      <Header/>
        <Blog />
      <Footer/>
    </>
  );
}