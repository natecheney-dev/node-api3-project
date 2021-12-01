const User = require('../users/users-model')
const yup = require('yup')


function logger(req, res, next) {
  console.log(`Time: ${new Date().toLocaleTimeString()}`)
  console.log(`Method: ${req.method}`)
  console.log(`Url: ${req.url}`)
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    const user_id = await User.getById(id)
    if (user_id) {
      req.user = user_id
      next();
    }
    else {
      res.status(404).json({ message: `User by id number: ${id} not found` })
    }
  }
  catch (err) {
    next({ status: 422, message: err.message });
  }
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  }else {
    req.name = req.body.name
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body 
  if( !text){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else {
    req.text = text
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}