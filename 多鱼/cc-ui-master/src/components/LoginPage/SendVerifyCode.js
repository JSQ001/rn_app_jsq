import React from 'react';
import { Button } from 'antd-mobile';

class SendVerifyCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 60,
      liked: true,
    };

  }
  //   componentDidMount(){
  //     this.props.onRef(this)
  //   }
  countDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }

  handleClick = () => {

    const { sendMsg } = this.props;
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    this.countDown();
  };

  render() {
    return (

      <Button onTouchEnd={() => this.handleClick()} type="primary">
        {
          this.state.liked
            ? '获取验证码'
            : `${this.state.count} 秒后重发`
        }
      </Button>

    )

  }
}


export default SendVerifyCode;
