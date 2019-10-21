// import { List } from 'antd-mobile';
// // import { createForm } from 'rc-form';
// import React from 'react';
// import { connect } from 'dva';

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let moneyKeyboardWrapProps;
// if (isIPhone) {
//   moneyKeyboardWrapProps = {
//     onTouchEnd: e => e.preventDefault(),
//   };
// }

// class Demo4 extends React.Component {
//   state = {
//     type: 'money',
//   }
//   render() {
//     // const { getFieldProps } = this.props.form;
//     const { type } = this.state;
//     return (
//       <div>
//         <List>
//           <List.Item>
//             <div
//               style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
//               onTouchEnd={() => this.inputRef.focus()}
//             >
//               click to focus
//             </div>
//           </List.Item>
//         </List>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//     return {
//       loading: state.loading.models.application,
//     };
//   }
  
//   export default connect(mapStateToProps)(Demo4);