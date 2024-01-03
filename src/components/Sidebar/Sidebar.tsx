import { FC, ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { get, includes, map } from 'lodash';
import { COLORS, zooTheme } from '@/theme';
import { sidebarItems } from './Sidebar.items';
import { StyledLogo, StyledName } from './Sidebar.style';
import logo from '@/assets/images/logo.svg';
import { ISideBarProps, ISidebarItem } from './interfaces';
import { CustomTooltip, CustomTooltipEnums } from '../CustomTooltip';

const { BLUE, ORANGE, WHITE } = COLORS;

const { TooltipPlacement } = CustomTooltipEnums;

const activeMenuItemStyle = (path: string, currentPath: string) => {
  return {
    [`.${menuClasses.button}`]: {
      backgroundColor: `${BLUE} !important`,
      color: includes(currentPath, path) ? `${ORANGE} !important` : 'transparent',
      '&:hover': {
        backgroundColor: `${WHITE} !important`,
        color: `${ORANGE} !important`,
      },
    },
  };
};

const activeSubMenuStyle = (path: string, currentPath: string) => {
  return {
    [`& > .${menuClasses.button}`]: {
      color: includes(currentPath, path) ? `${ORANGE} !important` : 'transparent',
      '&:hover': {
        color: `${ORANGE} !important`,
      },
    },
  };
};

const SideBar: FC<ISideBarProps> = ({ isCollapsed, isToggled, onToggle }): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const renderSubMenu = (item: ISidebarItem, index: number) => {
    const { title, path, icon, subMenu } = item;

    const submenuItems = map(subMenu, (subItem, indexItem) => {
      const subPath = `${path}${get(subItem, 'path')}`;

      return (
        <MenuItem key={indexItem} icon={get(subItem, 'icon')} onClick={() => handleMenuItemClick(subPath)} rootStyles={activeMenuItemStyle(subPath, currentPath)}>
          {get(subItem, 'title')}
        </MenuItem>
      );
    });

    return isCollapsed ? (
      <CustomTooltip key={index} title={title} placement={TooltipPlacement.RIGHT_START}>
        <SubMenu icon={icon} label={title} rootStyles={activeSubMenuStyle(path, currentPath)}>
          {submenuItems}
        </SubMenu>
      </CustomTooltip>
    ) : (
      <SubMenu key={index} icon={icon} label={title} rootStyles={activeSubMenuStyle(path, currentPath)}>
        {submenuItems}
      </SubMenu>
    );
  };

  const renderMenu = (item: ISidebarItem, index: number) => {
    const { title, path, icon } = item;

    return isCollapsed ? (
      <CustomTooltip key={index} title={title} placement={TooltipPlacement.RIGHT_START}>
        <MenuItem icon={icon} onClick={() => handleMenuItemClick(path)} rootStyles={activeMenuItemStyle(path, currentPath)}>
          {title}
        </MenuItem>
      </CustomTooltip>
    ) : (
      <MenuItem key={index} icon={icon} onClick={() => handleMenuItemClick(path)} rootStyles={activeMenuItemStyle(path, currentPath)}>
        {title}
      </MenuItem>
    );
  };

  const renderMenuItem = (item: ISidebarItem, index: number) => {
    const { subMenu } = item;

    return subMenu ? renderSubMenu(item, index) : renderMenu(item, index);
  };

  return (
    <Sidebar
      collapsed={isCollapsed}
      toggled={isToggled}
      onBackdropClick={onToggle}
      rtl={false}
      breakPoint="sm"
      transitionDuration={800}
      style={{ height: '100vh' }}
      backgroundColor={BLUE}
      rootStyles={{
        color: WHITE,
      }}
    >
      <StyledLogo>
        {logo && !isCollapsed ? (
          <img src={logo} alt="logo" style={{ width: '100%', height: '100%' }} />
        ) : (
          <StyledName>
            <span>Z</span>
          </StyledName>
        )}
      </StyledLogo>

      <Menu
        closeOnClick
        rootStyles={{
          [`& .${menuClasses.button}`]: {
            '&:hover': {
              backgroundColor: zooTheme.palette.secondary.main,
              color: `${ORANGE} !important`,
            },
          },
        }}
      >
        {map(sidebarItems, (item, index) => renderMenuItem(item, index))}
      </Menu>
    </Sidebar>
  );
};

export { SideBar };
