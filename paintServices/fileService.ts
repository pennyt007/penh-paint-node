// Create a separate module for file-related functions

// fileUtils.js
import fs from "fs";
import { Readable, pipeline } from "stream";
import { promisify } from "util";

const filePipeline = promisify(pipeline);

export const saveFileToServer = async (
  readStream: Readable,
  filePath: string
) => {
  try {
    await filePipeline(readStream, fs.createWriteStream(filePath));
    return "file successfully saved to server.";
  } catch (error) {
    return null;
  }
};

export const readFileFromServer = async (filePath: string) => {
  try {
    return await fs.promises.readFile(filePath);
  } catch (error) {
    return null;
  }
};
