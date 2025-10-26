const getProxiedImageUrl = (url: string) => {
  if (url.includes("localhost:8080/uploads/")) {
    return url.replace("http://localhost:8080/uploads/", "/api/uploads/");
  }
  return url;
};

export default getProxiedImageUrl;
