import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Smart Market", headerShown: false }} />
    </Stack>
  );
}
