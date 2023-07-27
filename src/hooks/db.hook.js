import { createClient } from "@supabase/supabase-js";

const db = createClient(
  "https://hzjbqynxqmxzxcdrunzp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6amJxeW54cW14enhjZHJ1bnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0MzY3MzEsImV4cCI6MjAwNjAxMjczMX0.rqbAMwRlMbmy2g1vKfp9_flEPwny7hOE3Y5QPMmZbiI"
);

export function useDB() {
  async function login(username, password) {
    const response = await db.auth.signInWithPassword({
      password,
      email: username,
    });
    const { session, user } = response.data;
    const { error_description } = response.error ?? {};

    if (error_description) {
      throw new Error(error_description);
    }

    return {
      session,
      user,
    };
  }

  async function getAuthors() {
    const res = await db.from("authors").select("id,created_at,name,family");

    return res.data;
  }

  async function addAuthor({ name, family }) {
    const res = await db.from("authors").insert([{ name, family }]);

    return res.data;
  }
  async function deleteAuthor({ id }) {
    const res = await db.from("authors").delete().eq("id", id);

    return res.data;
  }

  return {
    login,
    getAuthors,
    addAuthor,
    deleteAuthor,
  };
}
