// Global Components
import { Table, Modal } from "@mantine/core";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
// Local Components
import { EmptyState } from "./components";
// Hooks
import { useState, useEffect } from "react";
import { useDB } from "../../../../../hooks/db.hook";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

export default function AuthorsPage() {
  const db = useDB();
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      family: "",
    },

    validate: {
      name: (value) => (!value.trim().length ? "Name is required" : null),
      family: (value) => (!value.trim().length ? "Family is required" : null),
    },
  });

  useEffect(() => {
    prepare();
  }, []);

  function prepare() {
    (async () => {
      const $authors = await db.getAuthors();

      if ($authors.length) {
        setAuthors($authors);
      }
    })();
  }

  function handleAddAuthor() {
    open();
  }

  function handleAddAuthorEntity(values) {
    (async () => {
      try {
        setIsLoading(true);
        await db.addAuthor(values);
        await prepare();
        form.reset();
        close();
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <>
      <Modal
        size="xs"
        opened={opened}
        onClose={close}
        title="Add Author"
        centered
      >
        <Box maw={300} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => handleAddAuthorEntity(values))}
          >
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Author name"
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Family"
              placeholder="Author family"
              {...form.getInputProps("family")}
            />
            <Group position="right" mt="md">
              <Button type="submit" loading={isLoading}>
                Add
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      {!authors.length ? (
        <EmptyState onClick={handleAddAuthor} />
      ) : (
        <>
          <Button type="button" onClick={handleAddAuthor}>
            Add Author
          </Button>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Family</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.id}>
                  <td>{index + 1}</td>
                  <td>{author.name}</td>
                  <td>{author.family}</td>
                  <td>{author.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
