import { createStyles, Container, Title, Text, Button, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: 'relative',
  },

  content: {
    paddingTop: rem(220),
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export function EmptyState(props) {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>No Author to see</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            You may want to create an Author
          </Text>
          <Group position="center">
            <Button size="md" onClick={props.onClick}>Create Author</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}