import React from 'react'
import { Icon } from 'antd';

const component = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M851.968 503.808 532.48 503.808 532.48 188.416c0-12.288-8.192-20.48-20.48-20.48S491.52 176.128 491.52 188.416l0 319.488L172.032 507.904c-12.288 0-20.48 8.192-20.48 20.48s8.192 20.48 20.48 20.48L491.52 548.864l0 319.488c0 12.288 8.192 20.48 20.48 20.48s20.48-8.192 20.48-20.48l0-319.488 319.488 0c12.288 0 20.48-8.192 20.48-20.48S864.256 503.808 851.968 503.808z" p-id="1112"/>
    </svg>
);

const EndSvg = props => <Icon className='header-icon' component={component} {...props} />;

export default EndSvg;
