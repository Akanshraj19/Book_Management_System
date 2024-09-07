const BMModel = require("../model/BM.js");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

module.exports = {
  create: async (req, res) => {
    const { BookTitle, Author, genre, publicationYear, image } = req.body;
    try {
      const newItem = new BMModel({
        BookTitle,
        Author,
        genre,
        publicationYear,
        image,
      });
      const item = await newItem.save();
      res.json(item);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  },
  read: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 3;
      const totaLPosts = await BMModel.countDocuments();
      const totaLPages = Math.ceil(totaLPosts / perPage);

      if (page > totaLPages) {
        return res.status(404).json({ message: "Page not found" });
      }

      const posts = await BMModel.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      res.status(200).json({ posts, totaLPages, page });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  },
  // find: async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const item = await BMModel.findById(id);

  //     if (!item) {
  //       return res.status(404).send({ error: "Item not found" });
  //     }
  //     res.json(item);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).send(error);
  //   }
  // },
  find: async (req, res) => {
    try {
      let item_data = {};
      if (req.body.Author) item_data = { BookTitle: req.body.Author };
      const item = await BMModel.find(item_data);

      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { BookTitle, Author, genre, publicationYear, image } = req.body;
    try {
      const item = await BMModel.findByIdAndUpdate(
        id,
        {
          BookTitle,
          Author,
          genre,
          publicationYear,
          image,
        },
        { new: true }
      ).lean();
      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await BMModel.findById(id);

      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }
      await BMModel.deleteOne({ _id: id });
      res.json({ message: "Item deleted" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  // upload: async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);

  //   const storage = multer.diskStorage({
  //     destination: function (req, file, cb) {
  //       return cb(null, "uplaod");
  //     },
  //     filename: function (req, file, cb) {
  //       return cb(null, `${Date.now()}-${file.filename}`);
  //     },
  //   });
  //   const upload = multer({ storage });

  //   return res.send("File uploaded");
  // },
};
