import { LoadingOverlay } from "@mantine/core";

export function Loading() {
  return (
    <LoadingOverlay
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
      overlayBlur={2}
    />
  );
}
