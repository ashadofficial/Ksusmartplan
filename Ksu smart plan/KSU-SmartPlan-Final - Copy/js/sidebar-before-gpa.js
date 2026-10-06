"use strict";

/* =========================================================
   KSU SMARTPLAN - COMMON SIDEBAR
   Used by all pages
========================================================= */

(function () {

    const sidebarContainer =
        document.getElementById("sidebarContainer");

    if (!sidebarContainer) {
        return;
    }

    /* -----------------------------------------------------
       CURRENT PAGE
    ----------------------------------------------------- */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "dashboard.html";


    /* -----------------------------------------------------
       NAVIGATION DATA
    ----------------------------------------------------- */

    const mainNavigation = [

        {
            page: "dashboard.html",
            label: "Dashboard",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
                </svg>`
        },

        {
            page: "courses.html",
            label: "Course Finder",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4h16v3H4V4zm0 6h16v3H4v-3zm0 6h10v3H4v-3z"/>
                </svg>`
        },

        {
            page: "timetable.html",
            label: "Timetable",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"/>
                </svg>`
        },

        {
            page: "credit-tracker.html",
            label: "Credit Tracker",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v10h2V7H7zm4 4v6h2v-6h-2zm4-3v9h2V8h-2z"/>
                </svg>`
        },

        {
            page: "gpa.html",
            label: "GPA Calculator",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 4v3h10V6H7zm0 6v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
                </svg>`
        }

    ];


    const accountNavigation = [

        {
            page: "profile.html",
            label: "Profile",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14z"/>
                </svg>`
        },

        {
            page: "settings.html",
            label: "Settings",
            icon:
                `<svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.4 13c.07-.33.1-.66.1-1s-.03-.67-.1-1l2.1-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L15 3.3h-4L10.6 6a8 8 0 0 0-1.7 1l-2.5-1-2 3.4L6.5 11c-.07.33-.1.66-.1 1s.03.67.1 1l-2.1 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 2.7h4l.4-2.7a8 8 0 0 0 1.7-1l2.5 1 2-3.4L19.4 13zM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5z"/>
                </svg>`
        }

    ];


    /* -----------------------------------------------------
       CREATE NAV ITEMS
    ----------------------------------------------------- */

    function createNavigation(items) {

        return items.map(item => {

            const active =
                currentPage === item.page
                    ? " active"
                    : "";

            return `
                <a
                    href="${item.page}"
                    class="nav-item${active}"
                    data-tooltip="${item.label}"
                >
                    <span class="nav-icon">
                        ${item.icon}
                    </span>

                    <span class="nav-text">
                        ${item.label}
                    </span>
                </a>
            `;

        }).join("");

    }


    /* -----------------------------------------------------
       SIDEBAR HTML
    ----------------------------------------------------- */

    sidebarContainer.innerHTML = `

        <aside class="sidebar" id="sidebar">

            <div class="sidebar-top">

                <a
                    href="dashboard.html"
                    class="sidebar-brand"
                >

                    <div class="sidebar-logo">

                        <img
                            src="assets/ksu-smartplan-logo.png"
                            alt="KSU SmartPlan"
                        >

                    </div>

                    <div class="sidebar-brand-text">

                        <h2>
                            KSU SmartPlan
                        </h2>

                        <p>
                            KYUNGSUNG UNIVERSITY
                        </p>

                    </div>

                </a>


                <nav class="sidebar-nav">

                    <p class="nav-section-label">
                        MAIN MENU
                    </p>

                    ${createNavigation(mainNavigation)}


                    <p class="nav-section-label second-label">
                        ACCOUNT
                    </p>

                    ${createNavigation(accountNavigation)}

                </nav>

            </div>


            <div class="sidebar-bottom">

                <div class="sidebar-divider"></div>

                <div class="sidebar-user">

                    <div
                        class="user-avatar"
                        id="sidebarAvatar"
                    >
                        S
                    </div>


                    <div class="user-info">

                        <strong id="sidebarUserName">
                            Student
                        </strong>

                        <span id="sidebarUserDepartment">
                            KSU Student
                        </span>

                    </div>


                    <button
                        type="button"
                        class="logout-button"
                        id="logoutButton"
                        aria-label="Sign out"
                        title="Sign out"
                    >
                        &#8618;
                    </button>

                </div>

            </div>

        </aside>

    `;

})();
