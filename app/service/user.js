'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUserByName(username){
    const {app}=this
    try{
      let result=await app.mysql.get('user',{username})
      return result
    }catch(err){
      return null
    }
  }

  async register(params){
    const {app}=this
    try{
      let result=await app.mysql.insert('user',params)
      return result
    }catch(err){
      return null
    }
  }

}
module.exports = UserService;