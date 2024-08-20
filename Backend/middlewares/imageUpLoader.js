const multer = require("multer")

const diskStorage = multer.diskStorage({
    destination: function (req,file,cb){
        console.log("file",file)
        cb(null,"./uploads")
    },
    filename: function (req,file,cb){
        const ext = file.mimetype.split("/")[1]
        const fileName = `image-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})
const fileFilter = (req,file,cb)=>{
    const imageType = file.mimetype.split("/")[0]
    if(imageType == "image"){
        cb(null,true)
    }else{
        cb(new appError("File must be an image",400),false)
    }
}
const upload = multer({storage:diskStorage,
    fileFilter
})
module.exports = upload