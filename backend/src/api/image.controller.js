const Image = require("../api/image.model");
const { BadRequestError, NotFoundError } = require("../error/errors");
const cloudinary = require("../middlewares/cloudinary");

exports.getAllImages = async (req, res, next) => {
  // console.log("clientquery" , req.query);
  const { search } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.label = { $regex: search, $options: "i" };

  }
  

  // console.log("queryObject", queryObject);
  let images = await Image.find(queryObject);
  const total = await Image.countDocuments();
  return res.status(200).json({ total, images });
};

exports.uploadImage = async (req, res, next) => {
  const { label, key, imageUrl } = req.body;
  if (!label || !key || !imageUrl) {
    throw new BadRequestError("Please provide all fields");
  }

  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "unsplash",
  });
  const newImage = await Image.create({
    label: label,
    image: result.secure_url,
    cloudinaryId: result.public_id,
    key: key,
  });
  // console.log(newImage, "dsfsdddd");
  res.status(201).json({ image: newImage });
};

exports.removeImage = async (req, res, next) => {
  // console.log(req.body)
  const {
    params: { id },
    body: { key },
  } = req;

  const image = await Image.findById(id);
  if (!image) {
    throw new NotFoundError("Image not found");
  }
  // console.log('image.key',image.key)
  // console.log('key',key)
  if (image.key !== key) {
    throw new BadRequestError("Wrong Key value");
  }
  const dbResult = await Image.findByIdAndRemove(id);
  const cloudResult = await cloudinary.uploader.destroy(image.cloudinaryId);
  // console.log(dbResult, cloudResult);
  res.status(204).send();
};
