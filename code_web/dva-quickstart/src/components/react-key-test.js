import React from 'react';

class ReactKeyTest extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const {data} = nextProps;
    if (JSON.stringify(data) !== JSON.stringify(prevState.data)) {
      return {
        data,
        loading: false
      };
    }
    return null;
  }

  handleChange=(page,size)=>{
    this.setState({page})
  };

  render(){

    return (
      <div className='react-key-test'>

      </div>
    );
  }
};

export default ReactKeyTest
