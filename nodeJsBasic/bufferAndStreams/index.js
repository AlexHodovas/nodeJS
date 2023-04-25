const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("nodeJsBasic/test.txt");
const writeStream = fs.createWriteStream("nodeJsBasic/new-text.txt");
const compressSteam = zlib.createGzip();

// readStream.on("data", (chunk) => {
//   // console.log("------");
//   // console.log(chunk.toString());
//   writeStream.write(chunk);
// });

// writeStream.on("data", (chunk) => {
//   console.log("------");
//   console.log(chunk.toString());
// });

// readStream.pipe(writeStream);

const handleError = () => {
  console.log("Error");
  readStream.destroy();
  writeStream.end("Finished with error...");
};

readStream
  .on("error", handleError)
  .pipe(writeStream)
  .pipe(compressSteam)
  .on("error", handleError);
