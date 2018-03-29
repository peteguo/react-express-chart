import React from 'react'
import Logo from '../../conponent/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocFrom from '../../conponent/imooc-form/imooc-form'

@connect(
    state => state.user,
    {login}
)
@imoocFrom
class Login extends React.Component{

    constructor(props) {
        super(props);
        /*this.state = {
            user:'',
            pwd:''
        }*/

        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        console.log(this.props)
       this.props.history.push('/register')
    }

    /*handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }*/
    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {

       // console.log(this.props)

        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!='/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null }
                        <InputItem
                            onChange={v => this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.props.handleChange('pwd',v)}
                            type="password"
                        >密码</InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login