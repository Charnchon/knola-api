'use strict'

const Hash = use('Hash')

const UserHook = exports = module.exports = {}

UserHook.hashPassword = async (user) => {
  user.user_password = await Hash.make(user.user_password)
}