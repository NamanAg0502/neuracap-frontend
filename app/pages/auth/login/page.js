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
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log(values);
    try {
      form.validate();
      // Send a request to the backend to login the user
      axios
        .post(`${process.env.APP_URL}/auth/login/`, values)
        .then((response) => {
          const token = response.data.token;
          Cookies.set('token', token);
          setLoading(false);
          router.replace('/');
        });
      form.clear();
    } catch (error) {
      setError(error);
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
      {/* <Notification title="Success" message="Logged in successfully" /> */}
      <div className="w-full flex justify-end px-5">
        {error && (
          <Notification
            title="Error"
            message={error.message}
            w={400}
            color="red"
          />
        )}
        {loading && (
          <Notification
            title="Success"
            color="teal"
            message="Logged in successfully"
            w={400}
            position="bottom-right"
          />
        )}
      </div>
    </div>
  );
}
