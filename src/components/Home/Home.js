import React,{Component} from 'react';
import axios from 'axios';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.js';
import '../../../node_modules/swiper/dist/css/swiper.css';
import { Carousel,WingBlank ,Grid,Tabs,WhiteSpace } from 'antd-mobile';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch
   } from '@fortawesome/free-solid-svg-icons';
  library.add(
    faSearch
  )

class Home extends Component{
    constructor(){
        super();
        this.state = {
            oy: [
                '1130/ea558143431d4c6c9068907b00091d4e',
                '1203/3086ba888b684d71aa546a3bd8ec3f74',
                '1203/cdace0e2d61d44ec8cc73b51f2a7289e',
                '1110/a7ea08ee1a294506ae17df2bf57cca3b',
                '1129/4ba50188cdaf4c858e653c6031eb3b12',
                '1129/ea27ad9b6f4b47f1b6e5d803ad0ea78e'
            ],
            imgHeight: 176,
            goodslists:[
                '0713/34c90a46f767478897208adca7681ae4',
                '0713/3f257a2d80cb49e5a1e65340201329f0',
                '0713/a8da83fed83c44f2a7a9f64862cd6489',
                '0713/229cbdd4a909417ba6218c7e21b48131',
                '0801/8bf04e420aa64ccfbb9ae530f82ddd7d',
                '0713/b0041913b9844e519782312fa1c66118',
                '0713/07223d7582de4438875efedac3d9cd90',
                '0713/c7ee25ce88144ebe9f1c743c64df2000',
                '0801/8fccd4a2c00947869641bd32c0a4c42f',
                '0801/a4b34eda8bc24782994a4d86cd2528ce'
                
            ],
            ss:[],
            dd:[],
            bool:false,
            hours: '00',
            minutes: '00',
            seconds: '00',
            tt:[
                '1203/0d04fd2799ec442a994777cac5f1bc5d',
                '1203/2e5677df8b6d476da87b60ac341e3a9d'
                
            ],
            yy:[
                '1203/4ca318641f844acfbb58e6fb7ea46b74',
                '1201/9645a1287b8845d2b24f5c9c1ae20f7f',
                '1201/56fc75840c554e1e97c0293ee5f7ec0e'
            ],
            zz:[
                '1203/20433014a0044dcc8c7c55ca5ead622c',
                '1201/e1963721ea2f4358be87e70b83f076d5'
            ],
            bb:[
                {
                    ico:'./images/quality.png',
                    name:'正品保证'
                },
                {
                    ico:'./images/cargo.png',
                    name:'开箱验货'
                },
                {
                    ico:'./images/loss_ration.png',
                    name:'赔付保障'
                }
            ],
            tabs:[
                { title: '精选' },
                { title: '白酒' },
                { title: '葡萄酒' },
                { title: '清酒洋酒' },
                { title: '黄酒啤酒' },
                { title: '年份老酒' },
            ],
            aa:[

            ]
           
          }
        
    }
    
    
    componentWillMount(){
       
        axios.get('/api/GetHomePageImg',{
            params:{
                
            }
        }).then(res=>{
            let data = res;
         
                this.setState({
                    // goodslists:data
            
                });
        });
        axios.get('/api/GethomeProductByhot',{
            params:{
                seriesid:0,
                pageindex:1,
                pagesize:20
            }
        }).then(res=>{
            let tab = res;
            console.log(tab)
            this.setState({
                aa:tab.data.data
            })

        })
       
 
    }
    componentDidMount(){
        var mySwiper  = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
          this.start()
   
    }
    
    async start() {
        this.timer && clearTimeout(this.timer) // 先清除一遍定时器，避免被调用多次
        // 发起任意一个服务器请求， 然后从headers 里获取服务器时间
        let leftTime = await axios.get('/api/SeckillList',{
            params:{
                userid:0
            }
        }).then(response => {
            let datalist = response;
            this.setState({
                ss:datalist.data.data[0].AppSeckill.AppSeckillProList,
                dd:datalist.data.data[0].AppSeckill
            })     
          return new Date(response.data.data[0].AppSeckill.EndTime).getTime() - new Date(response.data.data[0].AppSeckill.CurrTime).getTime() // 服务器与倒计时的 时间差
    
        }).catch(error => {
          console.log(error)
          return 0 // 这里发送的服务器请求失败 设为0
        })
      

        // 倒计时
        this.timer = setInterval(() => {
          leftTime = leftTime - 1000
          let { bool, hours = '00', minutes = '00', seconds = '00' } = this.countdown(leftTime)
          if (bool) { // 结束倒计时
            clearTimeout(this.timer)
          }
          this.setState({
            bool,
            hours,
            minutes,
            seconds
          })
        }, 1000)

      }
    
      /**
       * 倒计时
       * @param leftTime 要倒计时的时间戳
       */
      countdown(leftTime) {
        let bool = false
        if (leftTime <= 0) {
          bool = true
          return { bool }
        }
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10)
        if (hours < 10) {
          hours = '0' + hours
        }
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10)
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        var seconds = parseInt(leftTime / 1000 % 60, 10)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        return { bool,  hours, minutes, seconds }
      }
    
     //组件卸载取消倒计时
  componentWillUnmount(){
    clearTimeout(this.timer)

  }
    handlerGotoDetails(goods){
        console.log(goods)
        
    }
    
    render(){

        return <div className="home">
                    <div className="home-header">
                        <a href="">
                            <span><FontAwesomeIcon icon="search" /></span>
                            请输入商品名称
                        </a>
                        
                    </div>
                    <Carousel
                        autoplay={true}
                        infinite
                        >
                        {this.state.oy.map(val => (
                        <a
                        key={val}
                        href="#"
                        style={{ width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            alt=""
                            src={`http://img0.gjw.com/famous/2018/${val}.jpg`}
                            style={{ width: '100%',height:this.state.imgHeight, verticalAlign: 'top' }}
                            onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            }}
                        />
                        </a>
                        ))}
                    </Carousel>
                    <div className="home_class">
                        <div className="notice">
                                <div className="ico"><img src='./images/hot.png'/></div>
                                <WingBlank>
                                    <Carousel className="my-carousel"
                                    vertical
                                    dots={false}
                                    dragging={false}
                                    swiping={false}
                                    autoplay
                                    infinite
                                    >
                                        <div className="v-item"> <a href="#">古井贡酒 蓝花淡雅 清仓仅需59元</a></div>
                                        <div className="v-item"> <a href="#">古井贡酒 蓝花淡雅 清仓仅需59元</a></div>        
                                    </Carousel>
                                </WingBlank>
                        </div> 
                    </div>
                    <Grid 
                    data={this.state.goodslists} 
                    hasLine={false}
                    columnNum={5} 
                    renderItem={(goodslists) =>{
                        return (<img src= {`http://img0.gjw.com/famous/2018/${goodslists}.jpg`} 
                                style={{ width: '69px', height: '69px' }} 
                                alt="" />
                        )}}/>  
                    <div className="seconds">
                        <div className="van-cell-group">
                            <div className="van-cell">
                                <div className="van-cell__title">
                                    <b>掌上秒杀</b>
                                    <span className="fz"> 距结束 </span>
                                    <i>{this.state.hours}</i>：<i>{this.state.minutes}</i>：<i>{this.state.seconds}</i>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className='banner'>
                        <div className='swiper-container'>
                            <div className='swiper-wrapper'>
                                {
                                    this.state.ss.map((item,index)=>{   // this.state.bag是在state里面定义的数组为了循环数据
                                        return(                                    
                                            <div key={index} ref="myli" onClick={()=>this.getcommodity(index)} className=                            
                                                {this.state.Id === index?this.state.arr.join(' '):"swiper-slide"}
                                                >
                                                <div 
                                                className="show"
                                                style={{ width: '280px',height:'100px',padding:'10px' }}
                                                >
                                                <img 
                                                src={`http://img0.gjw.com/product/${item.imgUrl}`}
                                                style={{ width: '100px',height:'100px',padding:'5px' }}
                                                ></img>
                                                <div className="box">
                                                    <p>{item.ProductName}</p>
                                                    <span>￥{item.Price}</span>
                                                    <b>马上抢</b>
                                                </div>
                                               
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                        </div>
                    </div>
                </div>
                <div className="van-row">
                {this.state.tt.map((item,index)=>{
                    return(
                        <div key={index} className="van-col">
                            <a>
                                <img
                                src={`http://img0.gjw.com/famous/2018/${item}.jpg`}
                                ></img>
                            </a> 
                        </div>
                    )
                })}

                </div>
                <div className="container">
                    <div className="van-rows">
                            {this.state.yy.map((item,index)=>{
                            return(
                                <div key={index} className="van-cols">
                                    <a>
                                        <img
                                        src={`http://img0.gjw.com/famous/2018/${item}.jpg`}
                                        ></img>
                                    </a> 
                                </div>
                            )
                        })}
                    </div>
                    <div className="quality">
                        <div className="quality-ico">
                            {this.state.bb.map((item,index)=>{
                                return(
                                    <div key={index} className="quality-col">
                                        <img src={item.ico}></img>
                                        <span>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="hide">
                            {this.state.zz.map((item,index)=>{
                                return(
                                    <div key={index} className="hide-col">
                                        <a href="#">
                                            <img src={`http://img0.gjw.com/famous/2018/${item}.jpg`}/>
                                        </a>
                                    </div>
                                )
                            })}
                       
                    </div>
                    
                </div>
              
                <Tabs tabs={this.state.tabs}
                
                >
                    <div className="list-item">
                
                    {this.state.aa.map((item,index)=>{
                    return(
                        <div key={index} className="list-map">
                                <a href="#">
                                    <img src={`http://img0.gjw.com/product/${item.Pic}`}/>
                                    <i>{item.activityTitle.Ativityname  ? item.activityTitle.Ativityname : ''}</i>
                                </a>
                        </div>
                    )
                    })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    2
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    3
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    4
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    5
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                    6
                    </div>
                </Tabs>

            </div>
    }
}
export {Home};