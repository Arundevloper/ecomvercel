const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://arunsharma96025:8N5fNZzIIUIUeL3p@pdfeditor.lu4uirh.mongodb.net/?retryWrites=true&w=majority&appName=PdfEditor"
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB conncetion FAILED", error);
    process.exit(1);
  }
};

module.exports = connectDB;
