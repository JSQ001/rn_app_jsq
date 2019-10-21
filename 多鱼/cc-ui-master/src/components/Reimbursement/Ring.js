import React from 'react';
import { connect } from 'dva'

class Ring extends React.Component {

  componentDidMount() {
    let canvas = this.refs.ring;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let context = canvas.getContext('2d');
    // this.rings();
    let i = 1;
    let percent = parseInt(this.props.percent);
    this.timerId = setInterval(() => {
      i >= percent && clearInterval(this.timerId);
      context.clearRect(0, 0, width + 10, height);
      this.draw(i++);
    }, 10)
  }


  draw(i) {
    let canvas = this.refs.ring;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let context = canvas.getContext('2d');

    let rad = Math.PI * 2 / 100;
    canvas.width = width;
    canvas.height = height;
    // 绘制一个圆
    context.beginPath(); // 开始创建路径
    context.arc(width / 2, height / 2, height / 2 - 10, 0, 2 * Math.PI, false);
    context.lineWidth = 10;
    context.strokeStyle = "#ebebeb"; // 轮廓颜色
    context.lineCap = "round"; // 绘制圆帽
    context.stroke(); // 通过线条来绘制轮廓
    context.closePath(); // 关闭路径
    // this.draw();
    context.beginPath();
    // context.font = `${72/320}rem PingFang SC`;
    // context.textAlign = 'center';
    // context.textBaseline = 'bottom';
    // context.fillStyle="red";
    // context.fillText('',width/2+110,height/2+25);
    context.stroke();
    context.closePath();
    // 绘制半圆
    context.beginPath();
    context.arc(width / 2, height / 2, height / 2 - 10, -Math.PI / 2, -Math.PI / 2 + i * rad, false);
    context.lineWidth = 10;
    // 创建渐变颜色
    let linearGrad = context.createLinearGradient(0, 0, width, height);
    linearGrad.addColorStop(0.0, '#EE614C');
    linearGrad.addColorStop(0.25, '#EE614C');
    linearGrad.addColorStop(0.5, '#EE614C');
    linearGrad.addColorStop(0.75, '#EE614C');
    context.strokeStyle = linearGrad;
    context.stroke();
    context.closePath();
    // 绘制文本信息
    context.beginPath();
    // context.font = ``;
    // context.textAlign = 'center';
    // context.textBaseline = 'max';
    // context.fillStyle = "red";
    // context.fillText(i.toFixed(0),width/2,height/2); // 绘制文本最大宽度
    context.stroke();
    context.closePath();
  }
  componentWillUnmount() {
    this.timerId && clearInterval(this.timerId);
  }
  render() {
    const { children } = this.props;
    return (
      <div className="perent-ring-box" style={{ position: 'relative', marginTop: '0.833rem' }}>
        <canvas className="perent-canvas" ref='ring' style={{ width: '11.333rem', height: '11.333rem' }}>
        </canvas>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(Ring);
