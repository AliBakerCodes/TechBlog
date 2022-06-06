const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = postData.map((post) => post.get({ plain: true }));
    // const blogs = [
    //   {
    //     id: 1,
    //     title: "Title",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   },
    //   {
    //     id: 2,
    //     title: "Title2",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   },
    //   {
    //     id: 3,
    //     title: "Title1",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   }
    // ]
    // Pass serialized data and session flag into template
    console.log(blogs);
    res.render('homepage', { 
      blogs, 
      logged_in: true, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        }
      ],
    });

    const blog = postData.get({ plain: true });
    console.log(blog)
    res.render('blog-page', {
      ...blog,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    console.log('user', user)
    // const blogs = [
    //   {
    //     id: 1,
    //     title: "Title",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   },
    //   {
    //     id: 2,
    //     title: "Title2",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   },
    //   {
    //     id: 3,
    //     title: "Title1",
    //     content: "Content",
    //     author: "author",
    //     date: "1/17/2022",


    //   }
    // ]
    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create-blog', async (req, res) => {
try {

  res.render('create-blog', {
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit-blog', async (req, res) => {
  try {
    const blog = 
      {
        id: "id" ,
        title: "Title",
        content: "Content",
        author: "author",
        date: "1/17/2022",


      };
    
    res.render('edit-blog', {
        ...blog,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
