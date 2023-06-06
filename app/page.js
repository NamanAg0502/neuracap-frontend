'use client';

import { useViewportSize } from '@mantine/hooks';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import HomePage from './pages/home/page';
import CreateQuestion from './pages/questions/create/page';
import Questions from './pages/questions/page';
import { Grid } from '@mantine/core';

const Home = () => {
  const [content, setContent] = useState(1);
  const { height, width } = useViewportSize();

  return (
    <div className="flex justify-end items-start bg-white">
      <Sidebar
        height={height}
        width={{ sm: width * 0.2 }}
        setContent={setContent}
      />
      <Grid
        grow
        className={`bg-white min-h-screen flex justify-center w-5/6 p-10`}
      >
        <Grid.Col span={2} className="flex justify-end" />
        <Grid.Col span={10}>
          <div className="w-3/4 flex justify-center">
            {content === 1 && <HomePage />}
            {content === 2 && <CreateQuestion />}
            {content === 3 && <Questions />}
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Home;
