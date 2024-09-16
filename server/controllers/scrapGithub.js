const NodeCache = require("node-cache");
const Chat = require("../models/chatModel");
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 }); // TTL: 1 hour

const processFiles = async (files, includeFiles) => {
  const fetchFileData = async (dataUrl) => {
    try {
      const response = await fetch(dataUrl);
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("check 1Error fetching data from the API.");
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
  ];

  let allData = "";

  for (const item of files) {
    const fileExtension = item.name.split(".").pop().toLowerCase();
    console.log(item.name);
    if (
      !excludedExtensions.includes(fileExtension)
    ) {
      if (item.type === "file" && includeFiles.includes(item.name) ) {
        const dataUrl = item.download_url;
        try {
          const data = await fetchFileData(dataUrl);
          allData += ` File path : ${item.path}    ${data}`;
        } catch (err) {
          console.log(err);
        }
      } else if (item.type === "dir") {
        const subRepoUrl = item.url;
        allData += await fetchDataForDirectory(subRepoUrl, includeFiles);
      }
    }
  } 

  return allData;
};
 
const fetchDataForDirectory = async (directoryUrl, includeFiles) => {
  try {
    const response = await fetch(directoryUrl);
    if (response.ok) {
      const jsonData = await response.json();
      const data = await processFiles(jsonData, includeFiles);
      return data;
    } else {
      throw new Error(" check 3Error fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
  }
};

const getGithubCode = async (repo_url, chatId) => {
  // Check if data is already cached
  console.log(repo_url);
  let cachedData = cache.get(chatId);
  if (cachedData) {
    console.log("Returning cached data");
    console.log(cachedData);
    return cachedData;
  }
 
  let chat;
  try {
    chat = await Chat.findById(chatId);
    if (!chat) {
      return next(new errorResponse("Chat not found", 404));
    }
  } catch (err) {
    return next(new errorResponse("Chat not found", 404));
  }
 
  const includeFiles = chat.filesSelected;

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
      const data = await processFiles(jsonData, includeFiles); // Pass includeFiles to processFiles
      // Cache the fetched data
      cache.set(chatId, data);
      console.log(data)
      return data;
    } else {
      throw new Error("Error 4 fetching data from the API.");
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = { getGithubCode };