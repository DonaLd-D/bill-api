'use strict';

const Service = require('egg').Service;

class BillService extends Service{
  async add(params){
    const {app}=this
    try{
      const result=await app.mysql.insert('bill',params)
      return result
    }catch(err){
      return null
    }
  }
  async list(id){
    const {app}=this
    const QUERY_STR='id,pay_type,amount,date,type_id,type_name,remark'
    let sql=`select ${QUERY_STR} from bill where user_id=${id}`
    try{
      const result=await app.mysql.query(sql)
      return result
    }catch(err){
      console.log(err)
      return null
    }
  }

  async detail(id,user_id){
    const {app}=this
    try{
      const result=await app.mysql.get('bill',{id,user_id})
      return result
    }catch(err){
      console.log(err)
      return null
    }
  }

  async update(params){
    const {app}=this
    try{
      const result=await app.mysql.update('bill',params,{id:params.id,user_id:params.user_id})
      return result
    }catch(err){
      console.log(err)
      return null
    }
  }
  
}

module.exports=BillService