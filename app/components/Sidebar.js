import { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Text,
} from '@mantine/core';
import {
  IconSwitchHorizontal,
  IconLogout,
  IconHome2,
  IconPlus,
  IconList,
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[3],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.dark[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colors.teal[4],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colors.dark[5],
      color: theme.colors.teal[6],
      [`& .${getStylesRef('icon')}`]: {
        color: theme.colors.teal[6],
      },
    },
  },
}));

const data = [
  { id: 1, label: 'Home', icon: IconHome2 },
  { id: 2, label: 'Add Question', icon: IconPlus },
  { id: 3, label: 'All Questions', icon: IconList },
];

export function Sidebar({ height, width, setContent }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');

  const router = useRouter();

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setContent(item.id);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const handleLogout = () => {
    Cookies.remove('token');
    router.replace('/pages/auth/login/');
  };

  return (
    <Navbar
      height={height}
      width={width}
      p="md"
      className="bg-appBlack"
      pos="fixed"
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text size="xl" weight={700} color="white">
            Neuracap
          </Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout
            className={`${classes.linkIcon} hover:cursor-pointer`}
            stroke={1.5}
          />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
