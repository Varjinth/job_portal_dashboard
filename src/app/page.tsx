'use client';

import { useState } from 'react';
import { TopNavbar } from '../components/Navbar';
import { SearchFilters } from '@/components/SearchFilters';
import {JobGrid} from '@/components/JobGrid';
import './globals.css';
import '@mantine/dates/styles.css';

export type JobPost = {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryFrom: number;
  salaryTo: number;
  deadline: string;
  description: string[];
  requirements: string;
  responsibilities: string;
  experience: string;
  postedAt: string;
  companyLogo?: string;
};

export default function HomePage() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  return (
    <>
      <TopNavbar setJobPosts={setJobPosts} />
      <SearchFilters setJobPosts={setJobPosts}/>
      <JobGrid jobPosts={jobPosts}/>
    </>
  );
}
