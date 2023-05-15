const addImage = (req, res) => {
  const { file, body } = req;
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log("addImage", file, body);
};

module.exports = {
  addImage,
};
