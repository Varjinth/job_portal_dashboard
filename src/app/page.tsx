'use client';

import { useState } from 'react';
import { TopNavbar } from '../components/Navbar';
import { SearchFilters } from '@/components/SearchFilters';
import {JobGrid} from '@/components/JobGrid';
import './globals.css';
import '@mantine/dates/styles.css';

export default function HomePage() {
  const [jobPosts, setJobPosts] = useState<any[]>([]);

  return (
    <>
      <TopNavbar />
      <SearchFilters setJobPosts={setJobPosts}/>
      <JobGrid jobPosts={jobPosts}/>
    </>
  );
}
