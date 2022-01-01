'use strict'

const moment=require('moment')
const Controller=require('egg').Controller

class BillController extends Controller{
    async add(){
        const {ctx,app}=this

        const {amount,type_id,type_name,date,pay_type,remark=''}=ctx.request.body

        if(!amount||!type_id||!type_name||!date||!pay_type){
            cte.body={
                code:400,
                msg:'参数错误',
                date:null
            }
            return
        }

        try{
            let user_id
            let token=ctx.request.header.authorization
            const decode=await app.jwt.verify(token,app.config.jwt.secret)
            if(!decode) return
            user_id=decode.id

            const result=await ctx.service.bill.add({
                amount,
                type_id,
                type_name,
                date,
                pay_type,
                remark,
                user_id
            })
            ctx.body={
                code:200,
                msg:'请求成功',
                date:null
            }
        }catch(err){
            ctx.body={
                code:500,
                msg:'系统错误',
                data:null
            }
        }
    }
}

module.exports=BillController

