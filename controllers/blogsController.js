const Blog=require('../models/blogs-model.js')

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 }); 
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs", error });
    }
  };

module.exports={getAllBlogs};