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
// import SidebarWidget from "./SidebarWidget";

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

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/job-seeker",
  },

  {
    icon: <BoxCubeIcon />,
    name: "Jobs",
    subItems: [
      {
        name: "Find Jobs",
        path: "/find-jobs",
      },
      {
        name: "Saved Jobs",
        path: "/saved-jobs",
      },
      {
        name: "Applied Jobs",
        path: "/applied-jobs",
      },
    ],
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
   EMPLOYER MENU
========================================================= */

const employerItems: NavItem[] = [
  {
    icon: <PageIcon />,
    name: "Post a Job",
    path: "/post-job",
  },

  {
    icon: <BoxCubeIcon />,
    name: "Manage Jobs",
    path: "/manage-jobs",
  },

  {
    icon: <UserCircleIcon />,
    name: "Applications",
    path: "/applications",
  },

  {
    icon: <UserCircleIcon />,
    name: "Candidates",
    path: "/candidates",
  },

  {
    icon: <PageIcon />,
    name: "Company Profile",
    path: "/company-profile",
  },
];

/* =========================================================
   ACCOUNT MENU
========================================================= */

const othersItems: NavItem[] = [
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

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "employer" | "others";
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
    (path: string) => location.pathname === path,
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
        items: navItems,
      },
      {
        type: "employer" as const,
        items: employerItems,
      },
      {
        type: "others" as const,
        items: othersItems,
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
  }, [location.pathname, isActive]);

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
    menuType: "main" | "employer" | "others"
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
    menuType: "main" | "employer" | "others"
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
                                isActive(subItem.path)
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
                                isActive(subItem.path)
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
    <aside   style={{
    background: "linear-gradient(180deg, #FFF8F3 0%, #F7E8DC 100%)",
    color: "#030303",
  }}
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
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
        <Link to="/job-seeker">
          {isExpanded ||
          isHovered ||
          isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/compuplus-logo.png"
                alt="Job Portal Logo"
                width={260}
                height={40}
              />

              <img
                className="hidden dark:block"
                src="/images/logo/compuplus-logo.png"
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
                JOB SEEKER
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
                  "Job Seeker"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                navItems,
                "main"
              )}
            </div>

            {/* =================================================
                EMPLOYER
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
                  "Employer"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>

              {renderMenuItems(
                employerItems,
                "employer"
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

              {renderMenuItems(
                othersItems,
                "others"
              )}
            </div>

          </div>

        </nav>

        {/* =====================================================
            SIDEBAR WIDGET
        ===================================================== */}

        {/* {isExpanded ||
        isHovered ||
        isMobileOpen ? (
          <SidebarWidget />
        ) : null} */}

      </div>

    </aside>
  );
};

export default AppSidebar;