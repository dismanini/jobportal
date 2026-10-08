import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PlugInIcon,
  UserCircleIcon,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

/* =========================================================
   JOB SEEKER MENU
========================================================= */

const jobSeekerItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/job-seeker-dashboard",
  },

  {
    icon: <BoxCubeIcon />,
    name: "Jobs",
    subItems: [
      {
        name: "Find Jobs",
        path: "/joblist",
      },
      {
        name: "Saved Jobs",
        path: "/saved-jobs",
      },
    ],
  },

  {
    icon: <ListIcon />,
    name: "My Applications",
    path: "/applications",
  },

  {
    icon: <PageIcon />,
    name: "My Resume",
    path: "/my-resume",
  },

  {
    icon: <UserCircleIcon />,
    name: "My Profile",
    path: "/profile",
  },

  {
    icon: <CalenderIcon />,
    name: "Interviews",
    path: "/interviews",
  },
];

/* =========================================================
   ADMIN MENU
========================================================= */

const adminItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin-dashboard",
  },

  {
    icon: <BoxCubeIcon />,
    name: "Jobs",
    subItems: [
      {
        name: "Manage Jobs",
        path: "/admin-jobs",
      },
      {
        name: "Add Job",
        path: "/addjob",
      },
    ],
  },

  {
    icon: <ListIcon />,
    name: "Applications",
    path: "/applications",
  },

  {
    icon: <UserCircleIcon />,
    name: "Candidates",
    path: "/candidates",
  },

  {
    icon: <UserCircleIcon />,
    name: "Users",
    path: "/users",
  },
];

/* =========================================================
   ADMIN ACCOUNT MENU
========================================================= */

const adminAccountItems: NavItem[] = [
  {
    icon: <ListIcon />,
    name: "Messages",
    path: "/messages",
  },

  {
    icon: <PlugInIcon />,
    name: "Notifications",
    path: "/notifications",
  },

  {
    icon: <PageIcon />,
    name: "Settings",
    path: "/settings",
  },
];

/* =========================================================
   JOB SEEKER ACCOUNT MENU
========================================================= */

const jobSeekerAccountItems: NavItem[] = [
  {
    icon: <ListIcon />,
    name: "Messages",
    path: "/job-seeker-messages",
  },

  {
    icon: <PlugInIcon />,
    name: "Notifications",
    path: "/notifications",
  },

  {
    icon: <PageIcon />,
    name: "Settings",
    path: "/settings",
  },
];

/* =========================================================
   SIDEBAR COMPONENT
========================================================= */

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const location = useLocation();

  /* =========================================================
     GET LOGGED-IN USER
  ========================================================= */

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          "Failed to read logged-in user:",
          error
        );

        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  /* =========================================================
     CHECK ROLE
  ========================================================= */

  const isAdmin = user?.role === "admin";

  const menuItems = isAdmin
    ? adminItems
    : jobSeekerItems;

  /* =========================================================
     ACCOUNT MENU BASED ON ROLE
  ========================================================= */

  const accountMenuItems = isAdmin
    ? adminAccountItems
    : jobSeekerAccountItems;

  const menuTitle = isAdmin
    ? "Admin"
    : "Job Seeker";

  /* =========================================================
     SUBMENU STATE
  ========================================================= */

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "account";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<
    Record<string, number>
  >({});

  const subMenuRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  /* =========================================================
     CHECK ACTIVE PATH
  ========================================================= */

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  /* =========================================================
     OPEN SUBMENU WHEN ROUTE IS ACTIVE
  ========================================================= */

  useEffect(() => {
    let submenuMatched = false;

    const menuGroups = [
      {
        type: "main" as const,
        items: menuItems,
      },
      {
        type: "account" as const,
        items: accountMenuItems,
      },
    ];

    menuGroups.forEach((group) => {
      group.items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: group.type,
                index,
              });

              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [
    location.pathname,
    isActive,
    isAdmin,
  ]);

  /* =========================================================
     CALCULATE SUBMENU HEIGHT
  ========================================================= */

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]:
            subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  /* =========================================================
     TOGGLE SUBMENU
  ========================================================= */

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "account"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  /* =========================================================
     RENDER MENU ITEMS
  ========================================================= */

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "account"
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {/* =================================================
              MENU WITH SUB ITEMS
          ================================================= */}

          {nav.subItems ? (
            <button
              onClick={() =>
                handleSubmenuToggle(index, menuType)
              }
              className={`menu-item group ${
                openSubmenu?.type === menuType &&
                openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {(isExpanded ||
                isHovered ||
                isMobileOpen) && (
                <span className="menu-item-text">
                  {nav.name}
                </span>
              )}

              {(isExpanded ||
                isHovered ||
                isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            /* =================================================
               NORMAL MENU ITEM
            ================================================= */

            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <span className="menu-item-text">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}

          {/* =================================================
              SUB MENU
          ================================================= */}

          {nav.subItems &&
            (isExpanded ||
              isHovered ||
              isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[
                    `${menuType}-${index}`
                  ] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? `${
                          subMenuHeight[
                            `${menuType}-${index}`
                          ] || 0
                        }px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}

                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(
                                  subItem.path
                                )
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}

                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(
                                  subItem.path
                                )
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </li>
      ))}
    </ul>
  );

  /* =========================================================
     SIDEBAR
  ========================================================= */

  return (
    <aside
      style={{
        background:
          "linear-gradient(180deg, #FFF8F3 0%, #F7E8DC 100%)",
        color: "#030303",
      }}
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      onMouseEnter={() =>
        !isExpanded && setIsHovered(true)
      }
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered
            ? "lg:justify-center"
            : "justify-start"
        }`}
      >
        <Link
          to={
            isAdmin
              ? "/admin-dashboard"
              : "/job-seeker-dashboard"
          }
        >
          {isExpanded ||
          isHovered ||
          isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/CompuPlus_Recruit_logo.png"
                alt="Job Portal Logo"
                width={260}
                height={40}
              />

              <img
                className="hidden dark:block"
                src="/images/logo/CompuPlus_Recruit_logo.png"
                alt="Job Portal Logo"
                width={260}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Job Portal Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">

            {/* =================================================
                ROLE MENU
            ================================================= */}

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  menuTitle
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                menuItems,
                "main"
              )}
            </div>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  "Account"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>

              {/* IMPORTANT:
                  Use accountMenuItems here
              */}

              {renderMenuItems(
                accountMenuItems,
                "account"
              )}
            </div>

          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;