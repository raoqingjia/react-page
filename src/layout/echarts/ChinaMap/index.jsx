import React, { Component } from 'react';
import './index.less';
import * as echarts from 'echarts';
import 'echarts-gl'
import {chartDatas} from './options'
export default class ChinaMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // echarts实例存放
        this.chart = null;
        // ref节点实例存放
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        // http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5
        // echartInit('china' ,'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        this.chartInit('china', '/echarts/china.json');
        // 添加监听方法，当页面放大缩小时触发echarts重绘，以适配改变后的页面
        window.addEventListener("resize", () => {
            this.chart && this.chart.resize();
        });
    }

    // 组件销毁前卸载监听方法
    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.chart && this.chart.resize();
        });
    }

    getFetch = (url) => {
        return fetch(url).then(res => res.json());
    }

    chartInit = async (mapName, url) => {
        const chinaData = await this.getFetch(url);  //  获取当前地图json
        console.log(chinaData);
        echarts.registerMap(mapName, chinaData);
        console.log(this.chartRef);
        this.chart = echarts.init(this.chartRef.current);
        // 使用刚指定的配置项和数据显示图表。
        const  options = {
            tooltip: {
                formatter: function (params, ticket, callback) {
                    if (params.data.name == '台湾') {   // 因为业务没扩展到台湾
                        return ''; //不能返回是false，不然有bug
                    }
                    if (params.data.name == '河南') { 
                        console.log(ticket);
                        console.log(callback)
                    }               
                    return params.data.name + '：' + '<br />' + params.data.datas + '<br />' + params.data.value;
                }//数据格式化
            },
            geo3D: {
                show: true,
                map: mapName,
                viewControl: {  //  用于鼠标的旋转，缩放等视角控制
                    // autoRotate: true,  // 是否开启视角绕物体的自动旋转查看 （实际用处不大）
                    // autoRotateSpeed:10, //  物体自转的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈
                    // beta: 45, // x轴旋转 类似顺时针旋转  beta和alpha具体的看在线文档api吧
                    alpha: 45, // Y轴旋转 类似前后翻转
                    panMouseButton: 'right', //  鼠标right按键实现平移操作
                    rotateMouseButton: 'left', // 鼠标left按键实现旋转操作
                },
                shading: 'color',  // 地球中三维图形的着色效果 color 只显示颜色，不受光照等其它因素的影响 lambert，realistic 这俩参数我没看明白，就说能提升质感;这个参数影响这light是否起作用
                // light: {  //  光照相关的设置。在 shading 为 'color' 的时候无效,玩不明白，不用了
                //     main: {
                //         color: '#ffffff',
                //         intensity: 1,
                //         shadow: false,
                //     },
                // },
                itemStyle: {      // 地理坐标系组件中三维图形的视觉属性，包括颜色，透明度，描边等
                    color: '#cfd1d4',  // 地图展示阴影颜色
                    borderWidth: 1,   //  地图区域界线描边边框粗细
                    borderColor: '#fff', // 区域界线描边颜色
                    // opacity : 0.5,
                },
                label: {  //  字体标签的相关设置
                    show: true,
                    color: '#71757a',
                    fontSize: 16,
                    // textStyle :{  //  这里这个操作没起作用，不知道是版本的问题还是上下配置影响了
                    // }
                },
                emphasis: { // 鼠标 hover 高亮时图形和标签的样式
                    label: {
                        show: true,
                        color: '#71757a',
                        fontSize: 18
                    },
                    itemStyle: {
                        color: '#c3c3c7',
                        borderWidth: 1.5,
                    },
                },
                groundPlane: false,
                data: chartDatas.map,
                zlevel: -1,  // 组件所在的层，将geo3d放在最底层
                regions: [   //  地图区域的设置,在地图中对特定的区域配置样式
                    {
                        name: '台湾',  // 所对应的地图区域的名称
                        itemStyle: {
                            color: [1, 1, 1, 0],
                            borderWidth: 0,
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: false
                            },
                            itemStyle: {
                                borderWidth: 0,
                                color: [1, 1, 1, 0],
                            },
                        },
                    }
                ]
            },
            series: [
                {
                    type: 'map3D',
                    map: mapName,
                    // 设置为透明
                    itemStyle: {
                        color: [1, 1, 1, 0], // [1, 1, 1, 0]
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: [1, 1, 1, 0],
                        },
                    },
                    data: chartDatas.map,
                },
                {
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    showEffectOn: 'render',
                    zlevel: 10,
                    symbol: 'pin',
                    symbolSize: 12,
                    rippleEffect: {
                        period: 15,
                        scale: 4,
                        brushType: 'fill'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            offset: [15, 0],
                            color: function (val) {
                                console.log(val);
                            }, // '#1DE9B6'
                            show: true
                        },
                    },
                    itemStyle: {
                        normal: {
                            // color:'#1DE9B6',
                            color: function () { //随机颜色
                                return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
                            },
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
        
                    data: chartDatas.points,
                },
            ]
        };
        this.chart.setOption(options, true);
        this.chart.on('click', function (params) {
            console.log(params.data);
            this.chart.clear();
            if (params.data.provinceMark) {
                this.chartInit(params.data.provinceMark, '/echarts/province/' + params.data.provinceMark + '.json');
            }
            if (params.data.cityMark) {
                this.chartInit(params.data.cityMark, '/echarts/city/' + params.data.cityMark + '.json');
            }
        });
    }


    render() {
        return (
            <div>
                <h2 className='title'>中国地图</h2>
                <div ref={this.chartRef} id="china-wrap"></div>
            </div>
        )
    }
}