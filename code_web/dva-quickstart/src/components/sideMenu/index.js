import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import SideMenu from './SideMenu';

/*navTheme*/
const SideMenuWrapper = props => {
  const { isMobile, collapsed, activeKey, openKey } = props;

  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      handleChild={<i className="drawer-handle-icon" />}
      onHandleClick={() => {
        props.onCollapse(!collapsed);
      }}
      open={!collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      activeKey={activeKey}
    >
      <SideMenu {...props} openKey={openKey} collapsed={isMobile ? false : collapsed} />
    </DrawerMenu>
  ) : (
      <SideMenu {...props} />
    );
};

export default SideMenuWrapper;
