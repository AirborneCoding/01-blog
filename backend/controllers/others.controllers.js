const User = require("../models/users.model")
const Post = require("../models/posts.model")
const Category = require("../models/categories.model")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose");
const CustomError = require("../errors")

/**-----------------------------------------------
 * @desc    get top 5 categories and hashtags
 * @route   /api/v1/top5
 * @method  GET
 * @access  public  
------------------------------------------------*/
const top5 = async (req, res) => {
    const topCategories = await Post.aggregate([
        {
            $match: { postStatus: 'published' }, // Add the condition for published posts
        },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'
        },
        {
            $project: {
                _id: 0,
                category: '$categoryDetails.name',
                count: 1
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 5
        }
    ]);

    const topHashtags = await Post.aggregate([
        {
            $match: { postStatus: 'published' },
        },
        {
            $unwind: '$hashtags'
        },
        {
            $group: {
                _id: '$hashtags',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 5
        }
    ]);

    res.status(StatusCodes.OK).json({
        topCategories,
        topHashtags
    });
};


/**-----------------------------------------------
 * @desc    search in the blog
 * @route   /api/v1/search
 * @method  GET
 * @access  public  
------------------------------------------------*/
const blogSearch = async (req, res) => {
    const searchTerm = req.query.q;
    const pageSize = Number(req.query.pageSize) || 10; // Adjust the pageSize as needed
    const page = Number(req.query.page) || 1;

    // Search in Posts
    const posts = await Post.find({
        $or: [
            {
                $and: [
                    {
                        $or: [
                            { title: { $regex: searchTerm, $options: 'i' } },
                            { content: { $regex: searchTerm, $options: 'i' } },
                            { hashtags: { $regex: searchTerm, $options: 'i' } },
                        ],
                    },
                    { postStatus: 'published' },
                ],
            },
            { categories: { $regex: searchTerm, $options: 'i' } },
            { authors: { $regex: searchTerm, $options: 'i' } },
        ],
    }).populate(
        {
            path: 'user category',
            select: 'username avatar.url name',
        }
    )
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    // Search in Categories
    const categories = await Category.find({
        name: { $regex: searchTerm, $options: 'i' },
    })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    // Search in Users
    const authors = await User.find({
        $or: [
            { username: { $regex: searchTerm, $options: 'i' } },
            { bio: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    const results = {
        posts: { count: posts.length, results: posts },
        categories: { count: categories.length, results: categories },
        authors: { count: authors.length, results: authors },
    };

    // Construct pagination object
    const pagination = {
        page,
        pageSize,
        pageCount: Math.ceil(Math.max(posts.length, categories.length, authors.length) / pageSize),
        total: Math.max(posts.length, categories.length, authors.length),
    };

    res.status(StatusCodes.OK).json({ count: results.length, ...results, pagination });
}


/**-----------------------------------------------
 * @desc    get User Post Views By Months
 * @route   /api/v1/user/userPosts
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getUserPostViewsByMonth = async (req, res) => {
    const userId = req.user.userId;

    const result = await Post.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                postStatus: 'published',
            },
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                totalViews: { $sum: '$viewsCount' },
            },
        },
        {
            $sort: { '_id.year': -1, '_id.month': -1 },
        },
    ]);

    const formattedResult = result.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        totalViews: item.totalViews,
    }));

    res.status(StatusCodes.OK).json(formattedResult);
};


/**-----------------------------------------------
 * @desc    total views count / posts / post views
 * @route   /api/v1/user/Totals
 * @method  GET
 * @access  public 
 * TODO : views count
------------------------------------------------*/
const totalData = async (req, res) => {
    const userId = req.user.userId;
    const postsCount = await Post.countDocuments({ user: userId });
    const totalViews = await Post.aggregate([
        {
            $match: { user: userId }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: '$viewsCount' }
            }
        }
    ]);
    const viewsPerMonth = totalViews.length > 0 ? totalViews[0].totalViews : 0;

    // Get the most viewed article
    const mostViewedArticle = await Post.findOne({ user: userId })
        .sort({ viewsCount: -1 })
        .select('_id title')
        .lean();


    res.status(StatusCodes.OK).json({ postsCount, viewsPerMonth, mostViewedArticle })
}

/**-----------------------------------------------
 * @desc    get top 5 authors
 * @route   /api/v1/user/userPosts
 * @method  GET
 * @access  public 
------------------------------------------------*/
const fetchAuthors = async (req, res) => {
    const authors = await User.aggregate([
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'user',
                as: 'posts',
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                postCount: { $size: '$posts' },
                avatar: 1
            },
        },
        {
            $sort: { postCount: -1 },
        },
        {
            $limit: 5,
        },
    ]);

    res.status(StatusCodes.OK).json(authors);
}

module.exports = {
    top5,
    blogSearch,
    getUserPostViewsByMonth,
    totalData,
    fetchAuthors
}