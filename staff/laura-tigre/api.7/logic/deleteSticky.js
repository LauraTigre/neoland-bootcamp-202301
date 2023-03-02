const { User, Sticky } = require('../data/models')
const {Types:{ ObjectId} }= require('mongoose')
const { validateUserId, validateStickyId } = require('com')

function deleteSticky( userId, stickyId){
  validateUserId(userId)
  validateStickyId(stickyId)
  
  return User.findById((userId))
  .then(user => {
    if (!user) throw new Error(`user with id ${userId} not found`)

    return Sticky.findById((stickyId))
})
.then(sticky => {
    if (!sticky) throw new Error(`sticky with id ${stickyId} not found`)

    if (sticky.user.toString() !== userId) throw new Error(`sticky with id ${stickyId} does not belong to user with id ${userId}`)

    return Sticky.deleteOne({ _id: new ObjectId(stickyId) })
})
   }

   module.exports = deleteSticky


