'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register(){
    const {ctx}=this
    const {username,password}=ctx.request.body
    if(!username||!password){
      ctx.body={
        code:500,
        msg:'账号或密码为空',
        data:null
      }
      return
    }

    const userInfo=await ctx.service.user.getUserByName(username)
    if(userInfo&&userInfo.id){
      ctx.body={
        code:500,
        msg:'该账户已注册',
        data:null
      }
      return
    }

    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
    const result=await ctx.service.user.register({
      username,
      password,
      ctime:new Date(),
      signature:'经济发展',
      avatar:defaultAvatar
    })
    if(result){
      ctx.body={
        code:200,
        msg:'注册成功',
        data:null
      }
    }else{
      ctx.body={
        code:500,
        msg:'注册失败',
        data:null
      }
    }
  }
}

module.exports = UserController;
