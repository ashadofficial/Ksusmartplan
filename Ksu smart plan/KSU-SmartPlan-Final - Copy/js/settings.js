"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HELPERS
    ===================================================== */

    function byId(id) {
        return document.getElementById(id);
    }

    function setText(id, value) {

        const element = byId(id);

        if (element) {
            element.textContent = value;
        }
    }


    function readJson(key, fallback) {

        try {

            const value =
                JSON.parse(
                    localStorage.getItem(key)
                );

            return value ?? fallback;

        } catch (error) {

            console.error(
                "Could not read:",
                key,
                error
            );

            return fallback;
        }
    }


    function writeJson(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }


    /* =====================================================
       CURRENT USER
    ===================================================== */

    const currentUser =
        readJson(
            "ksuSmartPlanCurrentUser",
            null
        );


    if (
        !currentUser ||
        !currentUser.studentId
    ) {

        window.location.href =
            "index.html";

        return;
    }


    const studentId =
        String(currentUser.studentId);


    function getUsers() {

        const users =
            readJson(
                "ksuSmartPlanUsers",
                []
            );

        return Array.isArray(users)
            ? users
            : [];
    }


    function getFullUser() {

        const users =
            getUsers();

        return (
            users.find(
                user =>
                    String(user.studentId) ===
                    studentId
            ) ||
            currentUser
        );
    }


    function getSettingsKey() {

        return (
            "ksuSmartPlanSettings_" +
            studentId
        );
    }


    function getSettings() {

        const user =
            getFullUser();

        const saved =
            readJson(
                getSettingsKey(),
                {}
            );


        return {

            defaultYear:
                saved.defaultYear ||
                user.academicYear ||
                "1st Year",

            defaultSemester:
                saved.defaultSemester ||
                user.semester ||
                "1st Semester",

            graduationCredits:
                Number(
                    saved.graduationCredits
                ) || 130,

            landingPage:
                saved.landingPage ||
                "dashboard.html",

            compactSidebar:
                Boolean(
                    saved.compactSidebar
                )
        };
    }


    function saveSettings(settings) {

        writeJson(
            getSettingsKey(),
            settings
        );
    }


    /* =====================================================
       ACCOUNT INFORMATION
    ===================================================== */

    function renderAccountInformation() {

        const user =
            getFullUser();

        const fullName =
            user.fullName ||
            "Student";

        const department =
            user.department ||
            user.homeDepartment ||
            "KSU Student";

        const academicYear =
            user.academicYear ||
            "—";


        setText(
            "settingsUserName",
            fullName
        );

        setText(
            "settingsStudentId",
            studentId
        );

        setText(
            "settingsFullName",
            fullName
        );

        setText(
            "settingsAccountStudentId",
            studentId
        );

        setText(
            "settingsDepartment",
            department
        );

        setText(
            "settingsAcademicYear",
            academicYear
        );


        const requirement =
            academicYear === "4th Year"
                ? 12
                : 16;


        setText(
            "settingsScholarshipRequirement",
            requirement + " credits"
        );
    }


    /* =====================================================
       SETTINGS NAVIGATION
    ===================================================== */

    function initializeNavigation() {

        const buttons =
            document.querySelectorAll(
                "[data-settings-section]"
            );

        const panels =
            document.querySelectorAll(
                "[data-settings-panel]"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const target =
                        button.dataset
                            .settingsSection;


                    buttons.forEach(item => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );
                    });


                    panels.forEach(panel => {

                        const active =
                            panel.dataset
                                .settingsPanel ===
                            target;

                        panel.hidden =
                            !active;

                        panel.classList.toggle(
                            "active",
                            active
                        );
                    });
                }
            );
        });
    }


    /* =====================================================
       CHANGE PASSWORD
    ===================================================== */

    function initializePasswordForm() {

        const form =
            byId(
                "changePasswordForm"
            );

        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const currentPassword =
                    byId(
                        "currentPassword"
                    ).value;

                const newPassword =
                    byId(
                        "newPassword"
                    ).value;

                const confirmPassword =
                    byId(
                        "confirmNewPassword"
                    ).value;


                const message =
                    byId(
                        "passwordMessage"
                    );


                function showMessage(
                    text,
                    success
                ) {

                    if (!message) {
                        return;
                    }

                    message.textContent =
                        text;

                    message.classList.toggle(
                        "success",
                        success
                    );

                    message.classList.toggle(
                        "error",
                        !success
                    );
                }


                const users =
                    getUsers();

                const index =
                    users.findIndex(
                        user =>
                            String(
                                user.studentId
                            ) === studentId
                    );


                if (index < 0) {

                    showMessage(
                        "Account record could not be found.",
                        false
                    );

                    return;
                }


                if (
                    users[index].password !==
                    currentPassword
                ) {

                    showMessage(
                        "Current password is incorrect.",
                        false
                    );

                    return;
                }


                if (
                    newPassword.length < 6
                ) {

                    showMessage(
                        "New password must contain at least 6 characters.",
                        false
                    );

                    return;
                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    showMessage(
                        "New passwords do not match.",
                        false
                    );

                    return;
                }


                if (
                    newPassword ===
                    currentPassword
                ) {

                    showMessage(
                        "Choose a password different from your current password.",
                        false
                    );

                    return;
                }


                users[index].password =
                    newPassword;

                users[index].updatedAt =
                    new Date()
                        .toISOString();


                writeJson(
                    "ksuSmartPlanUsers",
                    users
                );


                form.reset();


                showMessage(
                    "Password updated successfully.",
                    true
                );
            }
        );
    }


    /* =====================================================
       ACADEMIC PREFERENCES
    ===================================================== */

    function renderAcademicSettings() {

        const settings =
            getSettings();


        const year =
            byId(
                "settingsDefaultYear"
            );

        const semester =
            byId(
                "settingsDefaultSemester"
            );

        const credits =
            byId(
                "settingsGraduationCredits"
            );


        if (year) {
            year.value =
                settings.defaultYear;
        }

        if (semester) {
            semester.value =
                settings.defaultSemester;
        }

        if (credits) {
            credits.value =
                settings.graduationCredits;
        }
    }


    function initializeAcademicForm() {

        const form =
            byId(
                "academicSettingsForm"
            );

        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const settings =
                    getSettings();


                settings.defaultYear =
                    byId(
                        "settingsDefaultYear"
                    ).value;

                settings.defaultSemester =
                    byId(
                        "settingsDefaultSemester"
                    ).value;


                const graduationCredits =
                    Number(
                        byId(
                            "settingsGraduationCredits"
                        ).value
                    );


                settings.graduationCredits =
                    (
                        Number.isFinite(
                            graduationCredits
                        ) &&
                        graduationCredits > 0
                    )
                        ? graduationCredits
                        : 130;


                saveSettings(
                    settings
                );


                const message =
                    byId(
                        "academicSettingsMessage"
                    );


                if (message) {

                    message.textContent =
                        "Academic preferences saved.";

                    message.className =
                        "settings-message success";
                }
            }
        );
    }


    /* =====================================================
       INTERFACE SETTINGS
    ===================================================== */

    function renderInterfaceSettings() {

        const settings =
            getSettings();


        const landing =
            byId(
                "settingsLandingPage"
            );

        const compact =
            byId(
                "settingsCompactSidebar"
            );


        if (landing) {

            landing.value =
                settings.landingPage;
        }


        if (compact) {

            compact.checked =
                settings.compactSidebar;
        }
    }


    function initializeInterfaceSettings() {

        const button =
            byId(
                "saveInterfaceSettings"
            );

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const settings =
                    getSettings();


                settings.landingPage =
                    byId(
                        "settingsLandingPage"
                    ).value;


                settings.compactSidebar =
                    byId(
                        "settingsCompactSidebar"
                    ).checked;


                saveSettings(
                    settings
                );


                const message =
                    byId(
                        "interfaceSettingsMessage"
                    );


                if (message) {

                    message.textContent =
                        "Interface preferences saved.";

                    message.className =
                        "settings-message success";
                }
            }
        );
    }


    /* =====================================================
       DATA SUMMARY
    ===================================================== */

    function getArrayLength(key) {

        const data =
            readJson(
                key,
                []
            );

        return Array.isArray(data)
            ? data.length
            : 0;
    }


    function renderDataSummary() {

        setText(
            "settingsSelectedCoursesCount",
            getArrayLength(
                "ksuSelectedCourses_" +
                studentId
            )
        );


        setText(
            "settingsCompletedCoursesCount",
            getArrayLength(
                "ksuSmartPlanCompletedCourses_" +
                studentId
            )
        );


        setText(
            "settingsGpaSubjectsCount",
            getArrayLength(
                "ksuSmartPlanGpaCalculator_" +
                studentId
            )
        );


        const photo =
            localStorage.getItem(
                "ksuSmartPlanProfilePhoto_" +
                studentId
            );


        setText(
            "settingsPhotoStatus",
            photo
                ? "Saved"
                : "Not saved"
        );
    }


    /* =====================================================
       RESET ACCOUNT PLANNING DATA
    ===================================================== */

    function initializeDataReset() {

        const button =
            byId(
                "resetAccountPlanningData"
            );

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Reset this account's selected courses, timetable, completed courses and GPA calculator data? This cannot be undone."
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "ksuSelectedCourses_" +
                    studentId
                );


                localStorage.removeItem(
                    "ksuSmartPlanCompletedCourses_" +
                    studentId
                );


                localStorage.removeItem(
                    "ksuSmartPlanGpaCalculator_" +
                    studentId
                );


                renderDataSummary();


                alert(
                    "Planning data for this account has been reset."
                );
            }
        );
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderAccountInformation();

    initializeNavigation();

    renderAcademicSettings();
    initializeAcademicForm();

    renderInterfaceSettings();
    initializeInterfaceSettings();

    initializePasswordForm();

    renderDataSummary();
    initializeDataReset();

});
