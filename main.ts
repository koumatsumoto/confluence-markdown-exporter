import { main } from "./src/main.ts";

try {
  await main(process.env);
  process.exit(0);
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}
