/* eslint-disable no-undef */
import React from 'react';

class DataAnalysis extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      chartData: [],
      loading: true,
      jsq: 1
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {data} = nextProps;
    if (JSON.stringify(data) !== JSON.stringify(prevState.data)) {
      return {
        chartData: data,
        loading: false
      };
    }
    return null;
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  componentDidUpdate() {
    this.renderAnalysis()
  }

  //渲染折线图
  renderAnalysis = () => {
    let { chartData } = this.state;
    console.log(chartData)
    var dom = document.getElementById('analysis');

    var myChart = echarts.init(dom, 'macarons');

    let names = [];
    let values = chartData.map(item => {
      names.push(item.period);
      return {
        value: item.amount,
        tooltip: {
          formatter: params => {
            return `金额:${this.filterMoney(item.amount, 2, true)}`
          },
        },
      };
    });
    console.log(values,names)
    let option = {
      color: ['#1890ff'],
      xAxis: {
        type: 'category',
        data: names,
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '25%',
        right: '25%',
        width: '50%',
        height: 200,
        bottom: '0%',
        top: '20%',
        containLabel: true,
      },
      series: [
        {
          name: '金额',
          data: values,
          type: 'line',
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }],
          },
        },
      ],
    };

    myChart.setOption(option, true);

    //this.setState({ chartsType: 2 });
  };

  render(){
    return (
      <div>
        <div>
          分析
        </div>

        <div>
          <div style={{ marginTop:20 ,height:250, width: '100%' }} id="analysis" />
        </div>

      </div>
    );
  }
};

DataAnalysis.propTypes = {
};

export default DataAnalysis;
