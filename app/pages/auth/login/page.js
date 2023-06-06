'use client';

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (val) =>
        val.length <= 3
          ? 'Username should include at least 3 characters'
          : null,

      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const router = useRouter();

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      form.validate();
      // Send a request to the backend to login the user
      axios
        .post(`${process.env.APP_URL}/auth/login/`, values)
        .then((response) => {
          const token = response.data.token;
          Cookies.set('token', token);
          setLoading(false);
          notifications.show({
            title: 'Success',
            message: 'Logged in successfully',
            color: 'teal',
            position: 'bottom-right',
          });
          router.replace('/');
        })
        .catch((error) => {
          notifications.show({
            title: 'Error',
            message: error.message,
            color: 'red',
            position: 'bottom-right',
          });
          setLoading(false);
        });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        position: 'bottom-right',
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-around">
      <Container size={420} my={40} className="w-full">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form action="" method="post" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Username or email"
              placeholder="you@mantine.dev or @username"
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Anchor component="button" size="sm" className="text-appBlue">
                Forgot password?
              </Anchor>
            </Group>
            <Button
              fullWidth
              type="submit"
              mt="xl"
              className="bg-appBlue hover:bg-opacity-90 hover:bg-appBlue"
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
