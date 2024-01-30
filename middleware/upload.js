const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        let extension = path.extname(file.originalname)
        cb(null, Date.now() + extension )
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ){
            callback(null,true);
        }else{
            console.log("only jpg or png files should be uploaded!");
            callback(null,false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = upload