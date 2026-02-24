import multer from "multer"

//Store files on disk (server folder)
const storage = multer.diskStorage({
    //Defines where files will be stored.
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    //Defines how file name will be saved.
    filename: function (req, file, cb) {
        //Why Date.now() is Used Prevents duplicate files.

        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName)
    }
})
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },//5 mb limit limits restrict file size for security.

})