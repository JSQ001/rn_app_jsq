import icbc from 'assets/银行logo/工商银行-#E60012@3x.png';
import ceb from 'assets/银行logo/光大银行-#6A1585@3x.png';
import gdb from 'assets/银行logo/广发银行-#E4001F@3x.png';
import spdb from 'assets/银行logo/浦发银行-#1D2088@3x.png';
import comm from 'assets/银行logo/交通银行-#1D2088@3x.png';
import cmb from 'assets/银行logo/浦发银行-#1D2088@3x.png';
import hxbank from 'assets/银行logo/华夏银行-#E72327@3x.png';
import abc from 'assets/银行logo/农业银行-#008566@3x.png';
import boc from 'assets/银行logo/中国银行-#E60012@3x.png';
import ccb from 'assets/银行logo/建设银行-#003B90@3x.png';
import cmbc from 'assets/银行logo/民生银行-#00559E@3x.png';
import cib from 'assets/银行logo/兴业银行-#004098@3x.png';
import psbc from 'assets/银行logo/邮政储蓄银行-#007F3E@3x.png';
import zs from 'assets/银行logo/招商银行-#A61F23@3x.png';
import pa from 'assets/银行logo/平安银行@3x.png';
import zx from 'assets/银行logo/中信银行-带圆@3x.png';
import yzcx from 'assets/银行logo/邮政储蓄银行@3x.png';

import bocb from '../assets/银行logo/bank-background/bocb.png';
import commb from 'assets/银行logo/bank-background/commb.png';
import cebb from 'assets/银行logo/bank-background/ceeb.png';
import cibb from 'assets/银行logo/bank-background/兴业银行@3x.png';
import abcb from 'assets/银行logo/bank-background/农业银行@3x.png';
import hxbankb from 'assets/银行logo/bank-background/华夏银行@3x.png';
import icbcb from 'assets/银行logo/bank-background/工商银行@3x.png';
import gdbb from 'assets/银行logo/bank-background/广发银行@3x.png';
import ccbb from 'assets/银行logo/bank-background/建设银行@3x.png';
import zsb from 'assets/银行logo/bank-background/招商银行@3x.png';
import spdbb from 'assets/银行logo/bank-background/浦发银行@3x.png';
import cmbcb from 'assets/银行logo/bank-background/民生银行@3x.png';
import psbcb from 'assets/银行logo/bank-background/民生银行@3x.png';
import zxb from 'assets/银行logo/bank-background/中信银行-背景@3x.png';
import yzcxb from 'assets/银行logo/bank-background/中国邮政储蓄银行@3x.png';

export function checkPass(value) {
    let reg = /^(\d)\1{5}$/;
    let reg1 = /^[0-9]*$/;
    let str = '0123456789_9876543210';
     if (value.length !== 6 || !reg1.test(value) ||reg.test(value) || str.indexOf(value) > -1) {
        return false;
    } else {
        return true;
    }
}

//校验手机号
export function isPoneAvailable(str) {
    str = str.split(" ").join("")
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

//手机号码隐藏
export function hiddenPhone(str) {
    var value = str ? str.substr(0, 3) + '****' + str.substr(7) : ''
    return value;
}

//姓名隐藏
export function hiddenName(str) {
    if(!str){
        return str;
    }
    if(str&&str.length===1){
        return str;
    }
    if(str.length===2){
        return str.substr(0, 1)+"*";
    }
    return str.substr(0, 1)+"*"+str.substr(2,str.length-1);
}

//只显示银行卡后四位
export function fourCardNo(str) {
    var value = str.substr(str.length - 4);
    return value;
}

//只显示银行卡后四位
export function handleBankNo(str) {
  var value = str.substr(6)+"******"+str.substr(str.length - 4);
  return value;
}

//隐藏银行卡号
export function hiddenBankCard(str="") {
    var value = str.substr(0, 4) + '*******' + str.substr(str.length - 4)
    return value;
}

//根据信用卡有效期计算信用剩余有效期天数
export function getCreditCardDay(str) {
    var value = '20' + str.substr(str.length - 2) + '-' + str.substr(0, 2) + '-30';
    var expipeDay = new Date(value);
    var nowDate = new Date();
    var days = expipeDay.getTime() - nowDate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}

//根据传入值返回枚举
export function getOrderStatus(text) {
    switch (text) {
        case 0:
            return "";
        case 1:
            return "TO_PAY";
        case 2:
            return "TO_DELIVERY";
        case 3:
            return "TO_SIGN";
        case 4:
            return "FINISHED";
        default:
            return text;
    }
}

//根据传入值返回枚举
export function getPlanStatus(text) {
    switch (text) {
        case 'NEW':
            return "新建";
        case 'TODO':
            return "待执行";
        case 'RUNNING':
            return "执行中";
        case 'END':
            return "已完成";
        case 'FAIL':
            return "失败";
        case 'CANCEL':
            return "放弃";
        default:
            return text;
    }
}

export function userLevel(e) {
    switch (e) {
        case "USER":
            return "初入江湖";
        case "VIP":
            return "江湖新秀";
        case "SILVER":
            return "江湖少侠";
        case "GOLD":
            return "江湖大侠";
        case "KING":
            return "一派掌门";
          case "DIAMOND":
            return "武林盟主";
        default:
            return "";
    }
}

export function securityType(e) {
    switch (e) {
        case "CONS_PROP":
            return "消费抵用券";
        case "REPAY_PROP":
            return "还款抵用券";
        case "LEVEL_PROP":
            return "等级抵用券";
        case "BAL_USE":
            return "余额奖励券";
        case "LEVEL_USE":
            return "等级奖励券";
        default:
            return "";
    }
}

// 将时间转换成年-月-日格式
export function yyyyMMdd(GMT) {
    if (GMT !== null) {
      let FullDate = '';
      const year = new Date(GMT).getFullYear().toString();
      let month = (new Date(GMT).getMonth() + 1).toString();
      let date = new Date(GMT).getDate().toString();
      if (month.length === 1) {
        month = '0' + month;
      }
      if (date.length === 1) {
        date = '0' + date;
      }
      FullDate = year + '-' + month + '-' + date;
      return FullDate;
    }

  }
export function cmpDate(date1,date2){
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
        return 1;
    } else {
        return 0;
    }
}
export function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
    month = "0"+month;
    }
    if(day<10){
    day = "0"+day;
    }
    var val = d.getFullYear()+"-"+month+"-"+day;
    return val;
    }
// 将时间转换成年-月-日 时：分： 秒格式
export function hhMMss(GMT) {
    if(GMT === null){
        return null;
    }
    let FullDate = '';
    const year = new Date(GMT).getFullYear().toString();
    let month = (new Date(GMT).getMonth() + 1).toString();
    let date = new Date(GMT).getDate().toString();
    let hours = new Date(GMT).getHours().toString();
    let minute = new Date(GMT).getMinutes().toString();
    let seconds = new Date(GMT).getSeconds().toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (date.length === 1) {
      date = '0' + date;
    }
    if (hours.length === 1) {
      hours = '0' + hours;
    }
    if (minute.length === 1) {
      minute = '0' + minute;
    }
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
    FullDate = year + '-' + month + '-' + date + '  ' + hours + ':' + minute + ':' + seconds;
    return FullDate;
  }

export function seasons(repayAmt, expireDay) {
    if (repayAmt < 10) {
        return []
    }
    const count = Math.ceil(repayAmt / 100) //向上取整
    const useCount = expireDay <= count ? expireDay : count
    const arr = Array(useCount).fill(0); // d
    return arr.map((v, index) => {
        return {
            label: index + 1,
            value: index + 1
        }
    })
}
export function haveYear() {
    let date = new Date().getFullYear() - 1;
    let arrs = []
    let arr = Array(20).fill(0); // d
    arr = arr.map((v, index) => {
        date +=1
        return {
            label: date + '年',
            value: String(date).substr(2)
        }
    })
    arrs.push(arr)
    let arrT = Array(12).fill(0); // d
    arrT = arrT.map((v, index) => {
        return {
            label: (index + 1) + '月',
            value: index + 1 > 9 ? '' + (index + 1) : '0' + (index + 1)
        }
    })
    arrs.push(arrT)
    return arrs
}
// 正浮点数
export function isNumber(str) {
    if (str && String(str).charAt(0) === '-') {
      return false;
    }
    const reg1 = /^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/;
    const reg2 = /^[1-9]\d*$/;
    return (reg1.test(str) || reg2.test(str)) || Number(str) === 0;
  }
  // 0 和正整数
export function isZeroOrInterger(str) {
    if (str && String(str).charAt(0) === '-') {
      return false;
    }
    const reg = /^[1-9]\d*$/;
    return reg.test(str) || Number(str) === 0;
  }
  // 校验整数位不能超过n位，小数位不能超过2位
export function isFourNumber(str, n) {
    const strs = String(str).split('.');
    if (strs[1] && strs[1].length > 2) {
      return false;
    }
    return true;
  }
export const billType = [
    {
        label: '全部',
        value: ''
    },
    {
        label: '消费购物',
        value: 'SA'
    },
    {
        label: '购买VIP服务',
        value: 'VIP'
    },
    {
        label: '提现',
        value: 'WD'
    },
    {
        label: '信用卡消费',
        value: 'CSA'
    },
    {
        label: '信用卡还款',
        value: 'CPA'
    },
    {
        label: '收益划入',
        value: 'TRA'
    },
    {
        label: '余额转账划入',
        value: 'INW'
    },
    {
        label: '余额转账划出',
        value: 'OUT'
    },
    {
        label: '还款抵用券',
        value: 'RPS'
    },
    {
        label: '余额使用券',
        value: 'BUS'
    }
]
export const bankImg = [
    {
        label: '平安银行',
        value: pa,
        style: 'blueBackgroundColor',
        background: zsb,
    },
    {
        label: '招商银行',
        value: zs,
        style: 'blueBackgroundColor',
        background: zsb,
    },
    {
        label: '广发银行',
        value: gdb,
        style: 'blueBackgroundColor',
        background: gdbb,
    },
    {
        label: '浦发银行',
        value: spdb,
        style: 'blueBackgroundColor',
        background: spdbb,
    },
    {
        label: '浦发银行',
        value: cmb,
        style: 'blueBackgroundColor',
        background: spdbb,
    },
    {
        label: '中国农业银行',
        value: abc,
        style: 'blueBackgroundColor',
        background: abcb,
    },
      {
        label: '农业银行',
        value: abc,
        style: 'blueBackgroundColor',
        background: abcb,
      },
    {
        label: '中国银行',
        value: boc,
        style: 'blueBackgroundColor',
        background: bocb
    },
    {
        label: '中国工商银行',
        value: icbc,
        style: 'blueBackgroundColor',
        background: icbcb,
    },
    {
        label: '中国光大银行',
        value: ceb,
        style: 'blueBackgroundColor',
        background:cebb,
    },
    {
        label: '交通银行',
        value: comm,
        style: 'blueBackgroundColor',
        background:commb,
    },
    {
        label: '中国交通银行',
        value: comm,
        style: 'blueBackgroundColor',
        background:commb,
    },
    {
        label: '华夏银行',
        value: hxbank ,
        style: 'blueBackgroundColor',
        background:hxbankb,
    },
    {
        label: '中国建设银行',
        value: ccb,
        style: 'blueBackgroundColor',
        background:ccbb,
    },
    {
        label: '中国民生银行',
        value: cmbc,
        style: 'blueBackgroundColor',
        background:cmbcb,
    },
    {
        label: '兴业银行',
        value: cib,
        style: 'blueBackgroundColor',
        background:cibb,
    },
      {
        label: '中信银行',
        value: zx,
        style: 'blueBackgroundColor',
        background: zxb,
      },
  {
    label: '中国邮政储蓄银行',
    value: yzcx,
    style: 'blueBackgroundColor',
    background: yzcxb,
  },
];
export const billStatus = [
    {
        label: '全部',
        value: ''
    },
    {
        label: '成功',
        value: 'SUCCESS'
    },
    {
        label: '失败',
        value: 'FAILURE'
    },
    {
        label: '处理中',
        value: 'PENDING'
    }
]
export const statusX = [
    {
        label: '-',
        value: 'SA'
    },
    {
        label: '-',
        value: 'VIP'
    },
    {
        label: '-',
        value: 'WD'
    },
    {
        label: '-',
        value: 'CSA'
    },
    {
        label: '+',
        value: 'CPA'
    },
    {
        label: '+',
        value: 'TRA'
    },
    {
        label: '+',
        value: 'INW'
    },
    {
        label: '-',
        value: 'OUT'
    },
    {
        label: '+',
        value: 'RPS'
    },
    {
        label: '+',
        value: 'BUS'
    }
]
