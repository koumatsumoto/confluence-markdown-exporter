import * as fs from "node:fs/promises";

/**
 * Save HTML string to a file
 * @param filePath The path where the HTML file should be saved
 * @param textContent The HTML content to save
 * @throws Error if file cannot be written
 */
export async function saveTextFile(
  filePath: string,
  textContent: string,
): Promise<void> {
  try {
    await fs.writeFile(filePath, textContent, "utf-8");
  } catch (error) {
    throw new Error(`Failed to save text file to ${filePath}: ${error}`);
  }
}
