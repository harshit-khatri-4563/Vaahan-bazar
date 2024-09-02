import multer from "multer";

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =Math.round(Math.random() * 1E9);
        cb(null, file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only specific file types, adjust as per your requirement
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});