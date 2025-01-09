const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My Student API",
    description: "An Api that shows students data.",
  },
  host: "swaggerapi.onrender.com",
  schemes: ["https"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./server/routes/main.js"];

// Run to
swaggerAutogen(outputfile, endpointFiles, doc);

// Generate the swagger.json file
swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
  await import("./server.js");
});
