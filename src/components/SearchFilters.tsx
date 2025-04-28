'use client';

import {
  Text,
  Box,
  TextInput,
  Select,
  RangeSlider,
  Image,
  Divider,
  rem,
  Flex
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconChevronDown,

} from '@tabler/icons-react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from "lodash";
import { JobPost } from '@/app/page';

type SearchFiltersProps = {
  setJobPosts: React.Dispatch<React.SetStateAction<JobPost[]>>;
};

export type SearchFiltersType = {
  jobTitle?: string;
  location?: string;
  jobType?: string;
  salaryRange?: string; 
};

export const fetchJobPosts = async (filters: SearchFiltersType) => {
  const response = await axios.get('http://localhost:3000/job-posts', {
    params: filters,
  });

  return response.data;
};


export function SearchFilters({ setJobPosts }: SearchFiltersProps) {
  const [range, setRange] = useState<[number, number]>([10, 100]);
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryRange: '',
  });




  const fetchJobs = useCallback(
    debounce(async (filters: SearchFiltersType) => {
      const jobs = await fetchJobPosts(filters);
      setJobPosts(jobs);
    }, 500),
    []
  );

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  const handleInputChange = (field: string, value: string | number | null) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (value: [number, number]) => {
    setRange(value);
    handleInputChange('salaryRange', `${value[0] * 1000},${value[1] * 1000}`);
  };

  return (
    <Box
      style={{
        padding: rem(24),
        borderRadius: rem(16),
        backgroundColor: '#fff',
        boxShadow: '0px 4px 14px 0px rgba(198, 191, 191, 0.25)',
      }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap="lg" justify="space-around" style={{ justifyContent: "space-around" }}>
        <Flex direction={{ base: 'column', sm: 'row' }} gap="lg" justify="space-evenly" style={{ flex: 1 }}>

          <TextInput
            variant="unstyled"
            placeholder="Search By Job Title, Role"
            leftSection={<IconSearch size={16} color='#686868' />}
            style={{ height: rem(48) }}
            styles={{
              input: {
                color: "#686868",
                fontWeight: 500,
              },
            }}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />

          <Divider orientation="vertical" color="#E0E0E0" style={{ height: "48px" }} visibleFrom='md' />

          <Select
            variant="unstyled"
            placeholder="Preferred Location"
            data={['Chennai', 'Bangalore', 'Hyderabad', 'Remote']}
            leftSection={<IconMapPin size={16} color='#686868' />}
            rightSection={<IconChevronDown size={16} color='#686868' />}
            style={{ height: rem(48) }}
            styles={{
              input: {
                color: '#686868',
                fontWeight: 500,
              }
            }}
            onChange={(value: string | null) => handleInputChange('location', value??"")}
          />
        </Flex>
        <Divider orientation="vertical" color="#E0E0E0" style={{ height: rem(48) }} visibleFrom='md' />
        <Flex direction={{ base: 'column', sm: 'row' }} gap="lg" justify="space-evenly" style={{ flex: 1 }}>

          <Select
            variant="unstyled"
            placeholder="Job type"
            data={['Full-Time', 'Part-Time', 'Contract', 'Internship']}
            leftSection={
              <Image src="/voice.svg" alt="voice icon" width={16} height={16} />
            }
            rightSection={<IconChevronDown size={16} color='#686868' />}
            style={{ height: rem(48) }}
            styles={{
              input: {
                color: '#686868',
                fontWeight: 500,
              }
            }}
            onChange={(value: string | null) => handleInputChange('jobType', value??"")}
          />

          <Divider orientation="vertical" color="#E0E0E0" style={{ height: rem(48) }} visibleFrom='md' />

          <Box >
            <Flex gap="md" justify="space-between" align="center" mb="xs" w="100%">
              <Text fw={500} size="sm" c="#222222">
                Salary Per Month
              </Text>
              <Text fw={500} size="sm" c="#222222">
                ₹{range[0].toLocaleString()}k - ₹{range[1].toLocaleString()}k
              </Text>
            </Flex>

            <RangeSlider
              className='custom-slider'
              min={10}
              max={100}
              step={10}
              value={range}
              onChange={handleRangeChange}
              label={null}
              minRange={5}
              styles={() => ({
                track: {
                  backgroundColor: '#CCC2C2',
                  height: '4px',
                },
                bar: {
                  backgroundColor: '#222222',
                  height: '4px',
                },
                thumb: {
                  borderColor: '#000000',
                  backgroundColor: '#FFFFFF',
                  borderWidth: '5px',
                  padding: '3px',
                },
              })}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
