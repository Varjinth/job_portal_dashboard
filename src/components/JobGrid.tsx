'use client';

import { Box, SimpleGrid, Paper, Text, Button, Image, rem, Flex } from '@mantine/core';
import { IconStack2 } from '@tabler/icons-react';
import { BiUserPlus } from "react-icons/bi";
import { JobPost } from '@/app/page';

type JobGridProps = {
  jobPosts: JobPost[];
};

export function JobGrid({ jobPosts }: JobGridProps) {

  return (
    <Box
      p={{ base: 20, sm: 60 }}
      style={{ backgroundColor: '#FBFBFF' }}
    >
      <SimpleGrid spacing="lg"
        cols={{ base: 1, sm: 2, lg: 3, xs: 1, md: 3, xl: 4 }}>
        {jobPosts.length > 0 ? (jobPosts.map((job) => (
          <div key={job.id}>
            <Paper
              radius={12}
              p="md"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 0px 14px 0px rgba(211, 211, 211, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Flex justify="space-between" align="center" mb="xs" w="100%">
                <Box
                  w={84}
                  h={82}
                  p="sm"
                  style={{
                    background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)',
                    border: '1px solid #FFFFFF',
                    boxShadow: '0px 0px 10.25px 0px rgba(148, 148, 148, 0.25)',
                    borderRadius: 13,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={job.companyLogo ? job.companyLogo : "./company.jpg"}
                    width={65}
                    height={65}
                    alt="Company logo"
                    fit="contain"
                    radius="50%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                <Text
                  size="xs"
                  fw={600}
                  style={{
                    padding: '7px 10px',
                    borderRadius: '10px',
                    backgroundColor: '#B0D9FF',
                    color: '#000000',
                    width: 'fit-content',
                    height: 'fit-content',
                  }}
                >
                  {job.postedAt}
                </Text>
              </Flex>
              <Text fw={700} size="20px" mb={20}>{job.jobTitle}</Text>
              <Flex justify="space-between" mb="xs" c="dimmed" fz="sm">
                <Flex align="center" gap={2}>
                  <BiUserPlus size={"20px"} style={{ color: '#5a5a5a' }} />
                  <Text fw={500} size='16px' c={"#5a5a5a"}>{job.experience}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Image src="/building.svg" alt="building icon" width={19} height={20} />
                  <Text fw={500} size='16px' c={"#5a5a5a"}>{job.location}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <IconStack2 size={"20px"} style={{ color: '#5a5a5a' }} />
                  <Text fw={500} size='16px' c={"#5a5a5a"}>{job.salaryTo}</Text>
                </Flex>
              </Flex>
              <ul style={{ fontSize: "14px", fontWeight: "500", paddingLeft: rem(16), marginBottom: "12px", color: "#555555" }}>
                {job.description?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Button
                variant="filled"
                color="#00AAFF"
                style={{ borderRadius: rem(8), height: "46px", border: "1px solid #00AAFF", padding: "12px 10px" }}
              >
                Apply Now
              </Button>
            </Paper>
          </div>
        ))) : null}
      </SimpleGrid>
    </Box>
  );
}
