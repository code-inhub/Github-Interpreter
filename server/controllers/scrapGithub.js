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
  
  export const api = async (repo_url) => {
    const pattern = /github\.com\/([\w-]+)\/([\w-]+)/;
    const match = repo_url.match(pattern);
    let url = "";
    if (match) {
      const username = match[1];
      const repo = match[2];
      url = `https://api.github.com/repos/${username}/${repo}/contents`;
    } else return new Promise((resolve, reject) => reject("invalid url"));
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        const data = await processFiles(jsonData);
        return new Promise((resolve, reject) => resolve(data));
      } else {
        throw new Error("Error fetching data from the API.");
      }
    } catch (err) {
      console.log(err);
      return new Promise((resolve, reject) => reject(err));
    }
  };