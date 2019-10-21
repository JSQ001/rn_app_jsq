import React from 'react'
import { Icon } from 'antd';

const component = () =>
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M510.6 525.7c-117.4 0-213-95.6-213-210.3 0-117.4 95.6-213 213-213s213 95.6 213 210.3c0 117.4-95.5 213-213 213z m0-374.9c-87.4 0-159.1 74.5-159.1 161.8s71.7 164.6 159.1 164.6c87.4 0 164.6-77.2 164.6-164.6S598 150.8 510.6 150.8z m294.9 770.8H215.7c-49.2 0-90.1-41-90.1-90.1 0-155.6 125.6-281.3 281.3-281.3h210.3c155.6 0 278.5 125.6 281.3 278.5-2.8 51.9-43.8 92.9-93 92.9zM406.9 599.7c-125.6 0-228.4 102.2-228.4 227.8 0 21.8 15.4 40.4 34.5 40.4h593.3c19.1 0 36.5-15.6 36.5-34.7 0-125.6-102.8-231.8-228.4-231.8l-199.8-1.7h-7.7z m0-3" p-id="4945" fill="#2c2c2c"/>
    </svg>;

const current = ()=>
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M510.6 525.7c-117.4 0-213-95.6-213-210.3 0-117.4 95.6-213 213-213s213 95.6 213 210.3c0 117.4-95.5 213-213 213z m0-374.9c-87.4 0-159.1 74.5-159.1 161.8s71.7 164.6 159.1 164.6c87.4 0 164.6-77.2 164.6-164.6S598 150.8 510.6 150.8z m294.9 770.8H215.7c-49.2 0-90.1-41-90.1-90.1 0-155.6 125.6-281.3 281.3-281.3h210.3c155.6 0 278.5 125.6 281.3 278.5-2.8 51.9-43.8 92.9-93 92.9zM406.9 599.7c-125.6 0-228.4 102.2-228.4 227.8 0 21.8 15.4 40.4 34.5 40.4h593.3c19.1 0 36.5-15.6 36.5-34.7 0-125.6-102.8-231.8-228.4-231.8l-199.8-1.7h-7.7z m0-3" p-id="5398" fill="#EE614C"/>
    </svg>;




const HomeSvg = props =>{
  return <Icon style={props.style} component={props.style.color ? current: component}/>;
};

export default HomeSvg;
