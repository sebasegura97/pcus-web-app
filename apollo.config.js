const env = process.env.NODE_ENV;
const url =
  env === "production"
    ? "https://pcus.try-it.tech/graphql"
    : "http://localhost:4000/graphql";
// const url = "http://localhost:8000"
console.log("url", url);

module.exports = {
  client: {
    name: "Software pcus",
    service: "pcus",
    url,
  },
};
