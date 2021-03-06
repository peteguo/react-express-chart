/**
 * Created by guofei on 2018/1/13.
 */
const express = require('express')
const utils = require('utility')  //md5加密
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}

Router.get('/list', function (req,res) {
    const { type } = req.query
    //User.remove({}, function (e,d) {})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

Router.get('/getmsglist', function (req,res) {
    const user = req.cookies.user
    //{'$or':[{from:user,to:user}]}

    User.find({}, function (e,userDoc) {
        let users = {}
        console.log(userDoc)
        userDoc.forEach(v => {
            users[v._id] = {name: v.user,avatar: v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]}, function (err,doc) {
            if (!err) {
                console.log(doc)
                return res.json({code:0,msgs:doc,users:users})
            }
        })

      /*  exployee.find({}).populate.exec(function () {

        })*/
    })


})


Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc) {
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){

    const {user,pwd,type} = req.body
    User.findOne({user},function(err,doc){

        if(doc) {
            return res.json({code:1,msg:'用户名重复',doc:doc})
        }
        const userModel = new User({user,type, pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e) {
                return res.json({code:1,msg:'后端出错了',e:e})
            }
            const {user,type,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
        //User.create({user,type, pwd:md5Pwd(pwd)},function(e,d) {
        //    if(e) {
        //        return res.json({code:1,msg:'后端出错了'})
        //    }
        //    return res.json({code:0,reqs:req.body,d:d})
        //})
    })
})

Router.get('/info',function(req,res){
    const {userid} = req.cookies     //{"optimizelyEndUserId":"oeu1506500685437r0.8741103153509606","_ga":"GA1.1.1306572418.1496205179","userid":"5a600ead3e610c2fd0a7f654"}
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc) {
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'imooc_is_good_15817x8yax3!@#DSWFA~!'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router