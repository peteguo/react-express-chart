
import React from 'react'
import ReactDom from 'react-dom'
//        中间件                          组合
import {createStore, applyMiddleware, compose} from 'redux'
//异步中间件
import thunk from 'redux-thunk'
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

//连接
import { Provider } from 'react-redux'

import App from './config'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './conponent/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './conponent/dashboard/dashboard'
import Chat from './conponent/chat/chat'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

function Boss() {
    return <h2>Boss页面</h2>
}

/*function Dashboard() {
    return <h2>Dashboard</h2>
}*/
/*1.存在Switch 没有路由地址path的<Route component={Dashboard}></Route> 在不存在路由的url中存在 可做404页面
* 2.不存在Switch <Route component={Dashboard}></Route>可在每个存在url或不存在的url中显示 可做页面相同部分 如一样的头部
* */
    ReactDom.render(
    /*登录验证*/
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)