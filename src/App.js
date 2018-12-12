import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import axios from 'axios';
import {TabBar} from 'antd-mobile';

//引入ant-design-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';
import './styles/main.scss';

import {Home} from './components/Home/Home';
import {List} from './components/List';
import {Goods} from './components/Goods';
import {Cart} from './components/Cart';
import {My} from './components/My';
// import {NotFound} from './components/NotFound';

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faListUl,
  faAssistiveListeningSystems,
  faShoppingCart,
  faUser} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faListUl,
  faAssistiveListeningSystems,
  faShoppingCart,
  faUser
)

//配置baseUrl
axios.defaults.baseURL = 'http://localhost:3004';
class App extends Component {
    constructor(){
      super();
      this.state = {
        tabs:[
          {
            title:'首页',
            path:'/home',
            icon:'home'
          },
          {
            title:'分类',
            path:'/list',
            icon:'list-ul'
          },
          {
            title:'专享福利',
            path:'/goods',
            icon:'assistive-listening-systems'
          },
          {
            title:'购物车',
            path:'/cart',
            icon:'shopping-cart'
          },
          {
            title:'我的',
            path:'/my',
            icon:'user'
          }
        ],
        currentTab:0
      }
    }
    handlerClick(idx,path){
      this.setState({
        currentTab:idx
      });
      //编程式导航
      //获取history的方式
      //* 通过Route渲染App
      //* 利用wethRouter高阶组件实现
      this.props.history.push(path);
    }
    componentWillMount(){
      //获取hash值
      let hash =window.location.hash.slice(1);

      //找出对应索引值
      let currentTab = 0
      this.state.tabs.some((item,idx)=>{
        currentTab = idx;
        return item.path === hash
      });
      this.setState({
        currentTab
      });
      // console.log('app props:',this.props)
    }
    render(){
      return <div className="container">
            <div className="content">
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/list" component={List}/>
                    <Route path="/goods" exact component={Goods}/>
                    <Route path="/goods/:id" component={Goods}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/my" component={My}/>
                    <Redirect from="/" to="/home" exact/>
                    {/* <Redirect to="/404"/> */}
                </Switch>
            </div>

            <TabBar 
                tintColor="#f00"
                noRenderContent={true}
                >
                {
                  this.state.tabs.map((tab,idx)=>{
                    return   <TabBar.Item
                    title={tab.title}
                    key={tab.path}
                    icon={<FontAwesomeIcon icon={tab.icon}/>}
                    selectedIcon={<FontAwesomeIcon icon={tab.icon}/>}
                    selected={this.state.currentTab === idx}
                    // badge={tab.path==='/cart' ? this.props.cartQty :null}
                    onPress={this.handlerClick.bind(this,idx,tab.path)}
                    >
                    {tab.title}
                  </TabBar.Item>
                  })
                }
            </TabBar>
        </div>
        

    }
 
}


// let mapStateToProps = state=>{
//   //此处必须返回一个对象
//   console.log(state)
//   return {
//       //把state.commonReducer.tabbarStatus映射到props
//       tabbarStatus : state.commonReducer.tabbarStatus,
//       cartQty : state.cartReducer.goodslist.length
//     } 
// }

// App = connect(mapStateToProps)(App);

App = withRouter(App);

export default App;
