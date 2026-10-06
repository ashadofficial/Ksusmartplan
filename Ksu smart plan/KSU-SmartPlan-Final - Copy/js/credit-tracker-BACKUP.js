/* =========================================================
   KSU SMARTPLAN
   CREDIT TRACKER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       1. GRADUATION REQUIREMENTS
    ===================================================== */

    const TOTAL_REQUIRED = 130;

    const REQUIREMENTS = {
        general: 14,
        undergraduate: 18,
        engineering: 0
    };


    /* =====================================================
       2. GET CURRENT USER
    ===================================================== */

    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "ksuSmartPlanCurrentUser"
                )
            ) || {};

        } catch (error) {

            console.error(
                "Could not read current user:",
                error
            );

            return {};
        }
    }


    /* =====================================================
       3. GET COMPLETED CREDIT DATA
    ===================================================== */

    function getCreditData() {

        const user = getCurrentUser();

        /*
            For now we read credit information
            from the logged-in user's stored profile.

            Missing values safely become zero.
        */

        const completed =
            Number(
                user.completedCredits ||
                user.credits ||
                0
            );

        const general =
            Number(
                user.generalCredits ||
                0
            );

        const undergraduate =
            Number(
                user.undergraduateCredits ||
                0
            );

        const engineering =
            Number(
                user.engineeringCredits ||
                0
            );

        const major =
            Number(
                user.majorCredits ||
                0
            );


        return {

            completed:
                Math.max(0, completed),

            general:
                Math.max(0, general),

            undergraduate:
                Math.max(0, undergraduate),

            engineering:
                Math.max(0, engineering),

            major:
                Math.max(0, major)
        };
    }


    /* =====================================================
       4. SAFE ELEMENT UPDATE
    ===================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }


    function setWidth(id, percentage) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        const safePercentage =
            Math.min(
                100,
                Math.max(0, percentage)
            );

        element.style.width =
            `${safePercentage}%`;
    }


    /* =====================================================
       5. CATEGORY UPDATE
    ===================================================== */

    function updateCategory(
        key,
        completed,
        required
    ) {

        const safeCompleted =
            Math.max(
                0,
                Number(completed) || 0
            );


        if (!required || required <= 0) {

            setText(
                `${key}Completed`,
                safeCompleted
            );

            return;
        }


        const percentage =
            Math.min(
                100,
                (
                    safeCompleted /
                    required
                ) * 100
            );


        const remaining =
            Math.max(
                0,
                required - safeCompleted
            );


        setText(
            `${key}Completed`,
            safeCompleted
        );


        setText(
            `${key}Required`,
            required
        );


        setText(
            `${key}Percentage`,
            `${Math.round(percentage)}% completed`
        );


        setText(
            `${key}Remaining`,
            `${remaining} credits remaining`
        );


        setWidth(
            `${key}Progress`,
            percentage
        );
    }


    /* =====================================================
       6. RENDER CREDIT TRACKER
    ===================================================== */

    function renderCreditTracker() {

        const data =
            getCreditData();


        const completed =
            Math.min(
                TOTAL_REQUIRED,
                data.completed
            );


        const remaining =
            Math.max(
                0,
                TOTAL_REQUIRED - completed
            );


        const percentage =
            (
                completed /
                TOTAL_REQUIRED
            ) * 100;


        /* -----------------------------------------
           TOP SUMMARY
        ----------------------------------------- */

        setText(
            "creditCompleted",
            completed
        );

        setText(
            "creditRemaining",
            remaining
        );

        setText(
            "creditPercentage",
            Math.round(percentage)
        );


        /* -----------------------------------------
           GRADUATION PROGRESS
        ----------------------------------------- */

        setText(
            "graduationPercentage",
            `${Math.round(percentage)}%`
        );

        setText(
            "graduationCompleted",
            `${completed} credits`
        );

        setText(
            "graduationRemaining",
            `${remaining} credits`
        );

        setWidth(
            "graduationProgressFill",
            percentage
        );


        /* -----------------------------------------
           CATEGORY PROGRESS
        ----------------------------------------- */

        updateCategory(
            "general",
            data.general,
            REQUIREMENTS.general
        );


        updateCategory(
            "undergraduate",
            data.undergraduate,
            REQUIREMENTS.undergraduate
        );


        /*
            Engineering requirement depends
            on the student's major.

            We do not invent a requirement.
        */

        setText(
            "engineeringCompleted",
            data.engineering
        );


        /*
            Major currently shows completed
            credits only because department-specific
            major requirements will be connected later.
        */

        setText(
            "majorCompleted",
            data.major
        );


        /* -----------------------------------------
           BOTTOM SUMMARY
        ----------------------------------------- */

        setText(
            "summaryCompletedCredits",
            completed
        );

        setText(
            "summaryRemainingCredits",
            remaining
        );
    }


    /* =====================================================
       7. INITIALIZE
    ===================================================== */

    renderCreditTracker();

});
