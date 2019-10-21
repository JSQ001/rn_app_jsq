import React from 'react';
import { connect } from 'dva'

class Demo3 extends React.Component {

  constructor(props) {
    super(props)
  }
  initCanvas() {
    const {
      x0,//原点坐标
      y0,
      r,// 半径
      lineWidth, // 画笔宽度
      strokeStyle, //画笔颜色
      LinearGradientColor1, //起始渐变颜色
      LinearGradientColor2, //结束渐变颜色
      Percentage,// 进度百分比
    } = this.props
    let ele = document.getElementById("time_graph_canvas")
    let circle = ele.getContext("2d");
    //创建背景圆
    circle.lineWidth = lineWidth;
    circle.strokeStyle = strokeStyle;
    circle.lineCap = 'round';
    circle.beginPath();//开始一个新的路径
    circle.arc(x0, y0, r, 0, 2 * Math.PI, false);///用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    circle.stroke();//对当前路径进行描边
    //创建渐变圆环
    let g = circle.createLinearGradient(x0, 0, x0 + r * Math.cos(Percentage * (Math.PI * 2)), y0 + r * Math.sin(this.props.Percentage * (Math.PI * 2)));  //创建渐变对象  渐变开始点和渐变结束点
    g.addColorStop(0, LinearGradientColor1); //添加颜色点
    g.addColorStop(1, LinearGradientColor2);
    circle.lineWidth = lineWidth //设置线条宽度
    circle.lineCap = 'round';
    circle.strokeStyle = g;
    circle.beginPath();//开始一个新的路径
    circle.arc(x0, y0, r, -Math.PI / 2, -Math.PI / 2 - Percentage * (Math.PI * 2), true);
    circle.stroke();//对当前路径进行描边
  }

  componentDidMount() {
    this.initCanvas()
  }
  componentDidUpdate() {
    this.initCanvas()
  }
  static defaultProps = {
    canvaswidth: 560,// 画布宽度
    canvasheight: 560,// 画布高度
    x0: 180,
    y0: 180,
    r: 111,
    lineWidth: 70,
    strokeStyle: 'rgba(248, 248, 248, 2)',
    LinearGradientColor1: '#3EECED',
    LinearGradientColor2: '#499BE6',
    Percentage: 1,
  }
  render() {
    const { width, height, canvaswidth, canvasheight } = this.props
    return (
      <div style={{ width: width, height: height, padding: 10 }}>
        <canvas id="time_graph_canvas" width={canvaswidth} height={canvasheight}></canvas>
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(Demo3);