import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
// Hooks
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Check your IQ!"),
    },
  });
  const [isLoggedIn, setLoggedIn] = useLocalStorage({
    key: "is-user-logged-in",
    defaultValue: false,
  });

  function handleOnSubmit({ email, password }) {
    if (email === "admin@jigar.com" && password === "12345678") {
      setLoggedIn(true);

      notifications.show({
        color: "green",
        title: "Well Done",
        message: "Successfully loggedIn",
      });

      return;
    }

    notifications.show({
      color: "red",
      title: "Failed",
      message: "Wrong Credentials",
    });
  }

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <TextInput
          withAsterisk
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="Enter your password..."
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
