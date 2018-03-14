/**
 * Created by guofei on 2018/1/13.
 */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount() {
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname //当前的路由
        if(publicList.indexOf(pathname)>-1) {
            return null
        }

        //获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status == 200) {
                console.log(res)
                if(res.data.code==0) {
                    //有登录信息的
                    this.props.loadData(res.data.data)
                }else {
                    //console.log(this.props.history)
                    this.props.history.push('/login')
                }
                //console.log(res.data)
            }
        })
        //是否登录
        //现在的url地址 login是不是需要跳转的
        //用户的type 身份是boss还是牛人
        //用户是否完善信息（选择头像 个人简介）
    }

    render() {
        return null
    }
}

export default AuthRoute