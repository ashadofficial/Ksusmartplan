document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // KSU SMARTPLAN â€” CURRENT USER
    // =====================================================

    const currentUserRaw =
        localStorage.getItem("ksuSmartPlanCurrentUser");

    // No logged-in user â†’ return to login page
    if (!currentUserRaw) {
        window.location.replace("index.html");
        return;
    }


    let currentUser;

    try {
        currentUser = JSON.parse(currentUserRaw);
    } catch (error) {
        localStorage.removeItem("ksuSmartPlanCurrentUser");
        window.location.replace("index.html");
        return;
    }


    // Basic session validation
    if (
        !currentUser ||
        !currentUser.studentId ||
        !currentUser.department
    ) {
        localStorage.removeItem("ksuSmartPlanCurrentUser");
        window.location.replace("index.html");
        return;
    }



    // =====================================================
    // GET COMPLETE USER DATA
    // =====================================================

    let users = [];

    try {
        users =
            JSON.parse(
                localStorage.getItem("ksuSmartPlanUsers")
            ) || [];
    } catch (error) {
        users = [];
    }


    const fullUser = users.find(function (user) {
        return user.studentId === currentUser.studentId;
    });


    /*
       Use the complete registered account whenever possible.
       This makes registration data the source of truth.
    */
    const user = fullUser || currentUser;



    // =====================================================
    // IMPORTANT DEPARTMENT RULE
    // =====================================================

    /*
       user.department is the student's HOME DEPARTMENT.

       Dashboard
       Profile
       Credit Tracker
       Graduation Progress
       Department-specific information

       must use THIS department.

       Course Finder will later have a separate temporary
       search department. Changing Course Finder filters
       must NEVER change user.department.
    */

    const homeDepartment = user.department;



    // =====================================================
    // SAFE TEXT HELPER
    // =====================================================

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent =
                value !== undefined &&
                value !== null &&
                value !== ""
                    ? value
                    : "â€”";
        }
    }



    // =====================================================
    // FIRST NAME
    // =====================================================

    function getFirstName(fullName) {

        if (!fullName) {
            return "Student";
        }

        return fullName
            .trim()
            .split(/\s+/)[0];
    }



    // =====================================================
    // INITIALS
    // =====================================================

    function getInitials(fullName) {

        if (!fullName) {
            return "S";
        }

        const words =
            fullName
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (words.length === 1) {
            return words[0]
                .charAt(0)
                .toUpperCase();
        }


        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    }



    const fullName =
        user.fullName || "Student";

    const firstName =
        getFirstName(fullName);

    const initials =
        getInitials(fullName);



    // =====================================================
    // SIDEBAR USER
    // =====================================================

    setText(
        "sidebarUserName",
        fullName
    );

    setText(
        "sidebarUserDepartment",
        homeDepartment
    );

    setText(
        "sidebarAvatar",
        initials
    );



    // =====================================================
    // TOP PROFILE
    // =====================================================

    setText(
        "topUserName",
        fullName
    );

    setText(
        "topStudentId",
        user.studentId
    );

    setText(
        "topAvatar",
        initials
    );

    // =====================================================
    // GLOBAL PROFILE PHOTO SYNC
    // =====================================================

    const profilePhotoKey =
        "ksuSmartPlanProfilePhoto_" + user.studentId;

    const savedProfilePhoto =
        localStorage.getItem(profilePhotoKey);

    function applyProfilePhoto(avatarId) {

        const avatar =
            document.getElementById(avatarId);

        if (!avatar) {
            return;
        }

        if (savedProfilePhoto) {

            avatar.textContent = "";

            avatar.style.backgroundImage =
                'url("' + savedProfilePhoto + '")';

            avatar.style.backgroundSize = "cover";
            avatar.style.backgroundPosition = "center";
            avatar.style.backgroundRepeat = "no-repeat";

        } else {

            avatar.style.backgroundImage = "none";
            avatar.textContent = initials;
        }
    }

    applyProfilePhoto("sidebarAvatar");
    applyProfilePhoto("topAvatar");




    // =====================================================
    // WELCOME HERO
    // =====================================================

    setText(
        "welcomeName",
        firstName
    );



    // =====================================================
    // CURRENT SEMESTER
    // =====================================================

    let semesterText = "";

    if (user.academicYear && user.semester) {

        semesterText =
            user.academicYear +
            " Â· " +
            user.semester;

    } else if (user.semester) {

        semesterText =
            user.semester;

    } else {

        semesterText =
            "Current Semester";
    }


    setText(
        "currentSemester",
        semesterText
    );



    // =====================================================
    // ACADEMIC INFORMATION
    // =====================================================

    setText(
        "summaryStudentId",
        user.studentId
    );

    setText(
        "summaryDepartment",
        homeDepartment
    );

    setText(
        "summaryAcademicYear",
        user.academicYear
    );

    setText(
        "summarySemester",
        user.semester
    );



    // =====================================================
    // CREDIT DATA
    // =====================================================

    /*
       Temporary graduation total = 130.

       Later Credit Tracker will replace this with the
       correct department-specific requirement data.
    */

    const DEFAULT_REQUIRED_CREDITS = 130;


    const completedCredits =
        Number(user.completedCredits) || 0;


    const requiredCredits =
        Number(user.requiredCredits) ||
        DEFAULT_REQUIRED_CREDITS;


    const remainingCredits =
        Math.max(
            requiredCredits - completedCredits,
            0
        );



    // =====================================================
    // GRADUATION PERCENTAGE
    // =====================================================

    let progressPercentage = 0;


    if (requiredCredits > 0) {

        progressPercentage =
            Math.round(
                (completedCredits / requiredCredits) * 100
            );

    }


    progressPercentage =
        Math.min(
            Math.max(progressPercentage, 0),
            100
        );



    // =====================================================
    // DASHBOARD CREDIT VALUES
    // =====================================================

    setText(
        "completedCredits",
        completedCredits
    );

    setText(
        "remainingCredits",
        remainingCredits
    );

    setText(
        "progressPercentage",
        progressPercentage + "%"
    );

    setText(
        "progressCompleted",
        completedCredits + " credits"
    );

    setText(
        "progressRemaining",
        remainingCredits + " credits"
    );



    // =====================================================
    // PROGRESS BAR
    // =====================================================

    const progressBar =
        document.getElementById(
            "graduationProgressBar"
        );


    if (progressBar) {

        progressBar.style.width =
            progressPercentage + "%";

    }



    // =====================================================
    // CIRCULAR PROGRESS
    // =====================================================

    const progressCircle =
        document.querySelector(
            ".progress-circle"
        );


    if (progressCircle) {

        const progressDegrees =
            progressPercentage * 3.6;


        progressCircle.style.background =
            `conic-gradient(
                #2676e8 0deg,
                #2676e8 ${progressDegrees}deg,
                #e9eff7 ${progressDegrees}deg,
                #e9eff7 360deg
            )`;

    }



    // =====================================================
    // GPA
    // =====================================================

    let currentGpa =
        Number(user.currentGpa);


    if (
        !Number.isFinite(currentGpa) ||
        currentGpa < 0
    ) {
        currentGpa = 0;
    }


    setText(
        "dashboardGpa",
        currentGpa.toFixed(2)
    );



    // =====================================================
    // PLANNED COURSES
    // =====================================================

    const plannedCourses =
        Array.isArray(user.plannedCourses)
            ? user.plannedCourses
            : [];


    setText(
        "plannedCourseCount",
        plannedCourses.length
    );



    // =====================================================
    // CURRENT PLAN PREVIEW
    // =====================================================

    const dashboardPlan =
        document.getElementById(
            "dashboardPlan"
        );


    if (
        dashboardPlan &&
        plannedCourses.length > 0
    ) {

        dashboardPlan.innerHTML = "";


        plannedCourses
            .slice(0, 4)
            .forEach(function (course) {

                const courseItem =
                    document.createElement("div");


                courseItem.className =
                    "dashboard-course-preview";


                const courseName =
                    course.courseName ||
                    course.name ||
                    "Course";


                const courseCode =
                    course.courseCode ||
                    course.code ||
                    "";


                courseItem.innerHTML = `
                    <div>
                        <strong>${escapeHTML(courseName)}</strong>
                        <span>${escapeHTML(courseCode)}</span>
                    </div>

                    <span class="course-preview-arrow">
                        â†’
                    </span>
                `;


                dashboardPlan.appendChild(
                    courseItem
                );

            });

    }



    // =====================================================
    // HTML SAFETY
    // =====================================================

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }



    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Do you want to sign out?"
                    );


                if (!confirmed) {
                    return;
                }


                /*
                   Remove only active login session.

                   Registered account stays saved.

                   Remember Me also stays saved so the
                   Student ID can remain on Login page.
                */

                localStorage.removeItem(
                    "ksuSmartPlanCurrentUser"
                );


                window.location.replace(
                    "index.html"
                );

            }
        );

    }



    // =====================================================
    // DEVELOPMENT INFORMATION
    // =====================================================

    console.log(
        "KSU SmartPlan user loaded:",
        {
            studentId: user.studentId,
            department: homeDepartment,
            academicYear: user.academicYear,
            semester: user.semester
        }
    );

});
