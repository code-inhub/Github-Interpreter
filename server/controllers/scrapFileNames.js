const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 }); // TTL: 30 minutes, check period: 5 minutes

// Function to fetch the contents of a directory
const fetchDataForDirectory = async (directoryUrl) => {
  try {
    const response = await fetch(directoryUrl);
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      throw new Error("c hec 2Error fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Function to process files and extract file names, handling both files and directories recursively
const processFilesForNames = async (files) => {
  const excludedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gfg",
    "gif",
    "ico",
    "svg",
  ];

  let fileNames = [];

  for (const item of files) {
    const fileExtension = item.name.split(".").pop().toLowerCase();
    if (
      item.name !== "package-lock.json" &&
      !excludedExtensions.includes(fileExtension)
    ) {
      if (item.type === "file") {
        fileNames.push(item.name);
      } else if (item.type === "dir") {
        const subRepoUrl = item.url;
        const subFiles = await fetchDataForDirectory(subRepoUrl); // Wait for subdirectory data
        const subDirFileNames = await processFilesForNames(subFiles); // Recursively get file names
        fileNames = fileNames.concat(subDirFileNames); // Add the subdirectory's file names to the main list
      }
    }
  }

  return fileNames;
};

// Main function to get all file names from the repository
const getFileNames = async (repo_url) => {
  console.log("Repository URL: ", repo_url);

  // Check if the result is already cached
  let cachedData = cache.get(repo_url);
  if (cachedData) {
    console.log("Returning cached result");
    return cachedData;
  }

  // Pattern to extract username and repository name from GitHub URL
  const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
  const match = repo_url.match(pattern);
  let url = "";

  console.log("URL Match: ", match);

  if (match) {
    const username = match[1];
    const repo = match[2];
    url = `https://api.github.com/repos/${username}/${repo}/contents`; // GitHub API endpoint
  } else {
    return Promise.reject("Invalid URL");
  }

  try {
    console.log(url);
    const response = await fetch(url);
    if (response.ok) {
      const jsonData = await response.json(); // Get the initial directory content
      const fileNames = await processFilesForNames(jsonData); // Extract file names recursively
      const result = { fileNames };
      cache.set(repo_url, result); // Cache the result
      return result; // Return the list of file names
    } else {
      throw new Error("Error 5 fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = { getFileNames };