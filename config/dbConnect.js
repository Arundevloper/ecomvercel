import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://arunsharma96025:8N5fNZzIIUIUeL3p@pdfeditor.lu4uirh.mongodb.net/?retryWrites=true&w=majority&appName=PdfEditor"
    );
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
