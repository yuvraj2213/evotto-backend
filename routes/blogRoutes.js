const express = require("express");
const {getAllBlogs} = require("../controllers/blogsController");

const router = express.Router();

router.get('/getAllBlogs',getAllBlogs)

module.exports=router;