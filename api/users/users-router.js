const express = require('express');
const { 
  logger,
  validateUserId,
  validateUser,
  validatePost, } = require('../middleware/middleware')

const User = require("./users-model.js")
const Post = require('../posts/posts-model')


const router = express.Router();
router.use(logger);

router.get('/', (req, res, next) => {
  User.get()
    .then(user => {

      res.status(200).json(user)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next);
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  User.update(req.params.id, req.body)
    .then(user => {
      User.getById(req.params.id)
      res.status(200).json(user);
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  User.remove(req.params.id)
    .then(()=>{
      res.status(200).json(req.user)
    })
    .catch(next);

});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);

});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Post.insert({
    user_id: req.params.id,
    text: req.text,
  })
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)

});

// do not forget to export the router
module.exports = router;