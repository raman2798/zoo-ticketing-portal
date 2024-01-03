import { CSSObject } from '@emotion/styled';

export interface IMenuItemStylesParams {
  level: number;
  disabled: boolean;
  active: boolean;
  isSubmenu: boolean;
  open?: boolean;
}

export type ElementStyles = CSSObject | ((params: IMenuItemStylesParams) => CSSObject | undefined);

export interface IMenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

export interface ISideBarProps {
  isCollapsed: boolean;
  isToggled: boolean;
  onToggle: () => void;
}

interface ISubMenu {
  title: string;
  path: string;
  icon: JSX.Element;
}

export interface ISidebarItem extends ISubMenu {
  subMenu?: ISubMenu[];
}
