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

  async login(){
    const {ctx,app}=this
    const {username,password}=ctx.request.body
    const userInfo=await ctx.service.user.getUserByName(username)
    if(!userInfo||!userInfo.id){
      ctx.body={
        code:500,
        msg:'该账户不存在',
        data:null
      }
      return
    }
    if(userInfo&&userInfo.password!=password){
      ctx.body={
        code:500,
        msg:'密码错误',
        data:null
      }
      return
    }

    const token=app.jwt.sign({
      id:userInfo.id,
      username:userInfo.username,
      exp:Math.floor(Date.now()/1000)+(24*60*60)
    },app.config.jwt.secret)

    ctx.body={
      code:200,
      msg:'登录成功',
      data:{
        token
      }
    }
  }

  async getUserInfo(){
    const {ctx,app}=this
    const token=ctx.request.header.authorization
    const decode=await app.jwt.verify(token,app.config.jwt.secret)
    const userInfo=await ctx.service.user.getUserByName(decode.username)

    const defaultAvatar='http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

    ctx.body={
      code:200,
      msg:'请求成功',
      data:{
        id:userInfo.id,
        username:userInfo.username,
        signature:userInfo.signature||'',
        avatar:userInfo.avatar||defaultAvatar
      }
    }
  }

  async editUserInfo(){
    const {ctx,app}=this
    const {signature='',avatar=''}=ctx.request.body

    try{
      const token=ctx.request.header.authorization
      const decode=await app.jwt.verify(token,app.config.jwt.secret)
      if(!decode) return
      let user_id=decode.id
      const userInfo=await ctx.service.user.getUserByName(decode.username)
      const result=await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar
      })

      ctx.body={
        code:200,
        msg:'请求成功',
        data:{
          id:user_id,
          signature,
          avatar,
          username:userInfo.username
        }
      }
    }catch(err){

    }
  }
}

module.exports = UserController;
