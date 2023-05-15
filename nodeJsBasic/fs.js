const fs = require("fs");

fs.readFile("./nodeJsBasic/test.txt", "utf8", (error, data) => {
  // async
  console.log('data', data);
  console.log('error', error);

  fs.mkdir("./nodeJsBasic/folder1", () => {
    fs.writeFile("./nodeJsBasic/folder1/test2.txt", data, (error, data) => {
      console.log(error);
    });
  });
});

setTimeout(() => {
  if (fs.existsSync("./nodeJsBasic/folder1/test2.txt")) {
    fs.unlink("./nodeJsBasic/folder1/test2.txt", () => {});
  }
}, 2000);

setTimeout(() => {
  fs.rmdir("./nodeJsBasic/folder1", () => {});
}, 4000);
