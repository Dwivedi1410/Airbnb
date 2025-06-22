import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  // Defines a custom storage engine where files will be stored on disk

  destination: function (req, file, cb) {
    // destination: This function tells multer where to save the file.
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);
   

    const dest = path.join(__dirname, '..', '..', 'public', 'temp');
    // console.log(dest)
    
    

    cb(null, dest)
  },
  filename: function (req, file, cb) {
    // filename: This function tells multer how to name the uploaded file

    cb(null, file.originalname)
  }
})

export const upload = multer({ storage,})


// router.post('/upload', upload.single('file'), (req, res) => { ... })
