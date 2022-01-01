'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,middleware } = app;
  const _jwt=middleware.jwtErr(app.config.jwt.secret)
  router.post('/api/user/register',controller.user.register)
  router.post('/api/user/login',controller.user.login)
  router.get('/api/user/get_userinfo',_jwt,controller.user.getUserInfo)
  router.post('/api/user/edit_userinfo',_jwt,controller.user.editUserInfo)
  router.post('/api/upload',controller.upload.upload)

  router.post('/api/bill/add',_jwt,controller.bill.add)
};
