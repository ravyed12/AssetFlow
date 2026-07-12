export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
];

export const sidebarNav: SidebarNavItem[] = [
  {
    title: "Overview",
    href: "/",
    icon: "LayoutDashboard",
  },
];

export const navigationConfig = {
  mainNav,
  sidebarNav,
};
