const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 }); // TTL: 1 hour

const processFiles = async (files) => {
  const fetchFileData = async (dataUrl) => {
    try {
      const response = await fetch(dataUrl);
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("Error fetching data from the API.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const excludedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gfg",
    "gif",
    "ico",
    "svg",
    "md",
    "txt",
    "css",
  ];

  let allData = "";

  for (const item of files) {
    const fileExtension = item.name.split(".").pop().toLowerCase();
    if (
      item.name !== ".gitignore" &&
      item.name !== "package-lock.json" &&
      !excludedExtensions.includes(fileExtension)
    ) {
      if (item.type === "file") {
        const dataUrl = item.download_url;
        try {
          const data = await fetchFileData(dataUrl);
          allData += ` File path : ${item.path}    ${data}`;
        } catch (err) {
          console.log(err);
        }
      } else if (item.type === "dir") {
        const subRepoUrl = item.url;
        allData += await fetchDataForDirectory(subRepoUrl);
      }
    }
  }

  return allData;
};

const fetchDataForDirectory = async (directoryUrl) => {
  try {
    const response = await fetch(directoryUrl);
    if (response.ok) {
      const jsonData = await response.json();
      const data = await processFiles(jsonData);
      return data;
    } else {
      throw new Error("Error fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
  }
};

const getGithubCode = async (repo_url) => {
  // Check if data is already cached
  let cachedData = cache.get(repo_url);
  if (cachedData) {
    console.log("Returning cached data");
    return cachedData;
  }

  const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
  const match = repo_url.match(pattern);
  let url = "";
  if (match) {
    const username = match[1];
    const repo = match[2];
    url = `https://api.github.com/repos/${username}/${repo}/contents`;
  } else {
    return Promise.reject("Invalid URL");
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonData = await response.json();
      const data = await processFiles(jsonData);
      // Cache the fetched data
      cache.set(repo_url, data);
      return data;
    } else {
      throw new Error("Error fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = { getGithubCode };
