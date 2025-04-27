// src/components/Navbar.tsx
'use client';

import { Box, Text, Container, rem, Image, Center, Flex } from '@mantine/core';
import { IconChevronDown, IconChevronsDown, IconChevronsRight } from '@tabler/icons-react';
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  TextInput,
  Select,
  Group,
  Textarea,
  NumberInput,
  Menu
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IoCalendarClearOutline } from "react-icons/io5";
import axios from 'axios';

export function TopNavbar() {

  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/job-posts', data);
      console.log('Job Post Created:', response.data);
      close();
    } catch (error: any) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <>
      <Box
        component="header"
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          paddingTop: rem(20),
          paddingBottom: rem(20),
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container size="xl">
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fff',
              padding: `25px`,
              borderRadius: rem(100),
              boxShadow: '0px 0px 20px 0px rgba(127, 127, 127, 0.15)',
              minWidth: "890px",
              height: "80px",
            }}
            visibleFrom='md'
          >
            <Image
              src="/logo.png"
              alt="JobBoard Logo"
              width="44px"
              height="44.68px"
            />
            <Group gap="xl" style={{ width: "613px", height: "48px", display: "flex", justifyContent: "space-around" }} >
              <Text c="#303030" fw={500}>Home</Text>
              <Text c="#303030" fw={500}>Find Jobs</Text>
              <Text c="#303030" fw={500}>Find Talents</Text>
              <Text c="#303030" fw={500}>About</Text>
              <Text c="#303030" fw={500}>Testimonials</Text>
            </Group>

            <Button
              variant="filled"
              style={{ width: "123px", height: "38px", border: "none", borderRadius: "30px", background: "linear-gradient(45deg, #A128FF 0%, #6100AD 100%)", }}
              onClick={open}
            >
              Create Jobs
            </Button>
          </Box>

          <Box hiddenFrom="md" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
            padding: `25px`,
            borderRadius: rem(100),
            boxShadow: '0px 0px 20px 0px rgba(127, 127, 127, 0.15)',
            width: '80vw',
            minWidth: "320px",
            height: "80px",
          }}>

            <Image
              src="/logo.png"
              alt="JobBoard Logo"
              width="44px"
              height="44.68px"
            />
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text c="#303030" fw={500}>Home</Text>
              <Menu shadow="md" width={180}>
                <Menu.Target>
                  <IconChevronDown size={16} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Find Jobs</Menu.Item>
                  <Menu.Item>Find Talents</Menu.Item>
                  <Menu.Item>About</Menu.Item>
                  <Menu.Item>Testimonials</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            <Button
              variant="filled"
              style={{ width: "auto", height: "38px", border: "none", borderRadius: "30px", background: "linear-gradient(45deg, #A128FF 0%, #6100AD 100%)", }}
              onClick={open}
            >
              Create Jobs
            </Button>
          </Box>
        </Container>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size={"100%"}
        styles={{
          content: {
            width: "90%",
            maxWidth: "848px",
            borderRadius: "16px",
            padding: "10px 15px",
            maxHeight: '90vh',
            overflowY: 'auto',
            display: "block"
          },
        }}
      >
        <Center style={{ size: "24px", fontWeight: "700", color: "#222222" }} mb={20}>Create Job Opening</Center>
        <form onSubmit={handleSubmit(onSubmit)}   >
          <Flex direction={{ base: 'column', sm: 'row' }} mb="md" gap="12px" >
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              {...register("jobTitle", { required: true })}
              error={errors.jobTitle && "Job Title is required"}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Company Name"
              placeholder="Amazon, Microsoft, Swiggy"
              {...register("companyName", { required: true })}
              error={errors.companyName && "Company Name is required"}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              style={{ flex: 1 }}
            />
          </Flex>
          <Flex direction={{ base: 'column', sm: 'row' }} mb="md" gap="12px">
            <Select
              label="Location"
              placeholder="Choose Preferred Location"
              data={["Chennai", "Bangalore", "Hyderabad", "Remote"]}
              {...register("location", { required: true })}
              error={errors.location && "Location is required"}
              onChange={(value) => setValue("location", value)}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              rightSection={<IconChevronDown size={16} color='#222222' />}
              rightSectionWidth={70}
              style={{ flex: 1 }}
            />
            <Select
              label="Job Type"
              data={[
                "Full-Time",
                "Part-Time",
                "Contract",
                "Internship",
              ]}
              placeholder='FullTime'
              {...register("jobType")}
              onChange={(value) => setValue("jobType", value)}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              rightSection={<IconChevronDown size={16} color='#222222' />}
              rightSectionWidth={70}
              style={{ flex: 1 }}
            />
          </Flex>
          <Flex direction={{ base: 'column', sm: 'row' }} mb="md" gap="12px" >
            <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: '0px', sm: '10px' }} style={{ flex: 1 }}>
              <NumberInput
                label="Salary Range"
                prefix="₹"
                onChange={(value) => {
                  const numericValue = typeof value === 'string'
                    ? parseFloat(value.replace(/[^\d.]/g, ''))
                    : value;
                  setValue("salaryFrom", numericValue);
                }}
                hideControls
                classNames={{
                  input: 'custom-num-input',
                  label: 'custom-label'
                }}
                placeholder='⇵ ₹0'
                style={{ flex: 1 }}
              />
              <NumberInput
                label="Salary To"
                labelProps={{ style: { visibility: 'hidden' } }}
                prefix="₹"
                onChange={(value) => {
                  const numericValue = typeof value === 'string'
                    ? parseFloat(value.replace(/[^\d.]/g, ''))
                    : value;
                  console.log(numericValue)
                  setValue("salaryTo", numericValue);
                }}
                hideControls
                classNames={{
                  input: 'custom-num-input',
                  label: 'custom-num-label'
                }}
                placeholder='⇵ ₹12,00,000'
                style={{ flex: 1 }}
              />
            </Flex>
            <DatePickerInput
              label="Application Deadline"
              {...register("deadline")}
              onChange={(value) => setValue("deadline", value)}
              rightSection={<IoCalendarClearOutline size={16} color='#BCBCBC' />}
              rightSectionWidth={70}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              style={{ flex: 1 }}
            />
          </Flex>
          <Textarea
            label="Job Description"
            placeholder="Please share a description to let the candidate know more about the job role"
            resize="vertical"
            autosize
            minRows={2}
            {...register("description", { required: true })}
            error={errors.description && "Description is required"}
            mb="md"
            classNames={{
              input: 'custom-ph-input',
              label: 'custom-label'
            }}
          />
          <Flex direction={{ base: 'column', sm: 'row' }} mb="md" gap="12px">
            <Select
              label="Experience"
              placeholder="Choose Experience Level"
              data={['1-3 yrs Exp', '3-5 yrs Exp', '5-7 yrs Exp', '7-10 yrs Exp']}
              {...register("experience", { required: true })}
              error={errors.location && "Exp. level is required"}
              onChange={(value) => setValue("experience", value)}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              rightSection={<IconChevronDown size={16} color='#222222' />}
              rightSectionWidth={70}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Requirements"
              placeholder="Python, Javascript"
              {...register("requirements", { required: true })}
              classNames={{
                input: 'custom-input',
                label: 'custom-label'
              }}
              style={{ flex: 1 }}
            />
          </Flex>

          <Flex justify={{ base: 'center', sm: "space-between" }} direction={{ base: 'column', sm: 'row' }} mt="md"  >
            <Button mb="sm" variant="default" onClick={close} style={{ border: '1.5px solid #222222', borderRadius: "10px", size: "20px", fontWeight: "600", width: "auto", height: "59px", padding: "16px 60px" }} rightSection={<IconChevronsDown size={16} />}>
              Save Draft
            </Button>
            <Button type="submit" style={{ backgroundColor: "#00AAFF", borderRadius: "10px", size: "20px", fontWeight: "600", width: "auto", height: "59px", padding: "16px 60px" }} rightSection={<IconChevronsRight size={16} />}>Publish</Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

