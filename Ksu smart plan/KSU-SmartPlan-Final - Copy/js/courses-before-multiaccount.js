"use strict";

/* =========================================================
   KSU SMARTPLAN â€” COURSE FINDER
   Uses: data/courses-data.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DATABASE CHECK
    ===================================================== */

    const courses = Array.isArray(window.KSU_COURSES)
        ? window.KSU_COURSES
        : [];

    const departments = window.KSU_DEPARTMENTS || {};
    const categories = window.KSU_CATEGORIES || {};


    if (!courses.length) {
        console.error(
            "[Course Finder] KSU_COURSES database was not loaded."
        );
        return;
    }

    console.log(
        `[Course Finder] ${courses.length} course records loaded.`
    );


    /* =====================================================
       2. ELEMENTS
    ===================================================== */

    const departmentFilter =
    document.getElementById("departmentFilter");

const gradeFilter =
    document.getElementById("gradeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const dayFilter =
    document.getElementById("dayFilter");

const courseSearch =
    document.getElementById("courseSearch");

const findButton =
    document.getElementById("findCoursesButton");

const resetButton =
    document.getElementById("resetFiltersButton");

const courseResults =
    document.getElementById("courseResults");

const resultsCount =
    document.getElementById("resultsCount");

const databaseCourseCount =
    document.getElementById("databaseCourseCount");

const selectedCoursesElement =
    document.getElementById("selectedCourses");

const selectedCourseCount =
    document.getElementById("selectedCourseCount");

const selectedCreditCount =
    document.getElementById("selectedCreditCount");

const conflictBox =
    document.getElementById("conflictBox");

const openTimetableButton =
    document.getElementById("openTimetableButton");


    /* =====================================================
       3. SELECTED COURSES
    ===================================================== */

    let selectedCodes = loadSelectedCodes();


    function loadSelectedCodes() {

        try {

            const stored =
                JSON.parse(
                    localStorage.getItem(
                        "ksuSelectedCourses"
                    ) || "[]"
                );

            return Array.isArray(stored)
                ? stored
                : [];

        } catch (error) {

            console.warn(
                "Could not load selected courses.",
                error
            );

            return [];
        }
    }


    function saveSelectedCodes() {

        localStorage.setItem(
            "ksuSelectedCourses",
            JSON.stringify(selectedCodes)
        );
    }


    /* =====================================================
       4. INITIAL DATABASE COUNT
    ===================================================== */

    databaseCourseCount.textContent =
        courses.length;


    /* =====================================================
       5. DEPARTMENT DROPDOWN

       Only real academic departments are shown here.

       General/global education remains available when
       All Departments is selected.
    ===================================================== */

    const departmentOrder = [
        "Global Business Administration",
        "Global Hospitality Management",
        "Global Korean Studies",
        "Global Mechanical Design Engineering",
        "Global IT Engineering"
    ];


    function populateDepartments() {

        const actualDepartments =
            [...new Set(
                courses
                    .map(course => course.department)
                    .filter(Boolean)
            )];


        departmentOrder.forEach(department => {

            if (
                !actualDepartments.includes(department)
            ) {
                return;
            }

            const option =
                document.createElement("option");

            option.value = department;
            option.textContent = department;

            departmentFilter.appendChild(option);
        });


        /*
           Safety fallback:
           If database department wording changes,
           don't silently hide it.
        */

        actualDepartments
            .filter(department =>
                departmentOrder.includes(department) === false &&
                department !== departments.GLOBAL
            )
            .sort()
            .forEach(department => {

                const option =
                    document.createElement("option");

                option.value = department;
                option.textContent = department;

                departmentFilter.appendChild(option);
            });
    }


    /* =====================================================
       6. CATEGORY DROPDOWN
    ===================================================== */

    const preferredCategoryOrder = [
        "Major",
        "Basic Undergraduate",
        "Engineering Basic",
        "Basic General Education",
        "Elective General Education",
        "KIIP"
    ];


    function getAvailableCategories() {

        const department =
            departmentFilter.value;

        let source = courses;


        /*
           Department-specific academic courses.
           General education is still added separately below.
        */

        if (department) {

            source = courses.filter(course =>
                course.department === department ||
                course.department === departments.GLOBAL
            );
        }


        return [...new Set(
            source
                .map(course => course.category)
                .filter(Boolean)
        )];
    }


    function populateCategories() {

        const previous =
            categoryFilter.value;

        categoryFilter.innerHTML =
            `<option value="">All Categories</option>`;


        const available =
            getAvailableCategories();


        preferredCategoryOrder.forEach(category => {

            if (!available.includes(category)) {
                return;
            }


            /*
               Engineering Basic must not appear for
               non-engineering departments.
            */

            if (
                category === "Engineering Basic" &&
                departmentFilter.value &&
                departmentFilter.value !==
                    departments.IT &&
                departmentFilter.value !==
                    departments.MECHANICAL
            ) {
                return;
            }


            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);
        });


        /*
           Add any source category not in our display order.
        */

        available
            .filter(category =>
                !preferredCategoryOrder.includes(category)
            )
            .sort()
            .forEach(category => {

                const option =
                    document.createElement("option");

                option.value = category;
                option.textContent = category;

                categoryFilter.appendChild(option);
            });


        const stillExists =
            [...categoryFilter.options]
                .some(option =>
                    option.value === previous
                );


        if (stillExists) {
            categoryFilter.value = previous;
        }
    }


    /* =====================================================
       7. GENERAL EDUCATION LOGIC

       Basic General Education and Elective General Education
       are Global College courses and may be relevant across
       departments.

       They are included with department filtering.
    ===================================================== */

    function isGeneralEducation(course) {

        return (
            course.category ===
                "Basic General Education" ||

            course.category ===
                "Elective General Education" ||

            course.category ===
                "KIIP"
        );
    }


    /* =====================================================
       8. FILTER COURSES
    ===================================================== */

    function getFilteredCourses() {

        const department =
    departmentFilter.value;

const grade =
    gradeFilter.value;


const category =
    categoryFilter.value;

const day =
    dayFilter.value;

const search =
    courseSearch.value
        .trim()
        .toLowerCase();


        return courses.filter(course => {


            /* -----------------------------------------
               DEPARTMENT
            ----------------------------------------- */

            if (department) {

                const ownDepartment =
                    course.department === department;

                const globalEducation =
                    isGeneralEducation(course);

                if (
                    !ownDepartment &&
                    !globalEducation
                ) {
                    return false;
                }
            }


            /* -----------------------------------------
               GRADE

               Global/general courses with grade null
               remain visible because they are not
               year-specific.
            ----------------------------------------- */

            if (grade) {

                if (
                    course.grade !== null &&
                    Number(course.grade) !==
                        Number(grade)
                ) {
                    return false;
                }
            }

            /* -----------------------------------------


            /* -----------------------------------------
               CATEGORY
            ----------------------------------------- */

            if (
                category &&
                course.category !== category
            ) {
                return false;
            }
/* -----------------------------------------
   DAY
----------------------------------------- */

if (day) {

    const hasSelectedDay =
        Array.isArray(course.schedule) &&
        course.schedule.some(schedule =>
            schedule &&
            schedule.day === day
        );

    if (!hasSelectedDay) {
        return false;
    }
}

            /* -----------------------------------------
               SEARCH
            ----------------------------------------- */

            if (search) {

                const searchable = [
                    course.code,
                    course.name,
                    course.professor,
                    course.department,
                    course.category
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                if (!searchable.includes(search)) {
                    return false;
                }
            }


            return true;
        });
    }


    /* =====================================================
       9. ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =====================================================
       10. DISPLAY PROFESSOR
    ===================================================== */

    function displayProfessor(course) {

        if (
            !course.professor ||
            String(course.professor).trim() === ""
        ) {
            return "New professor";
        }

        return course.professor;
    }


    /* =====================================================
       11. DISPLAY GRADE
    ===================================================== */

    function displayGrade(course) {

        if (
            course.grade === null ||
            course.grade === undefined
        ) {
            return "All Years";
        }

        const grade = Number(course.grade);

        if (grade === 1) return "1st Year";
        if (grade === 2) return "2nd Year";
        if (grade === 3) return "3rd Year";
        if (grade === 4) return "4th Year";

        return `Year ${grade}`;
    }


    /* =====================================================
       12. DISPLAY SCHEDULE
    ===================================================== */

    function displaySchedule(course) {

        if (
            !Array.isArray(course.schedule) ||
            !course.schedule.length
        ) {
            return "Schedule not provided";
        }


        return course.schedule
            .map(schedule => {

                if (!schedule.day) {
                    return "Schedule not provided";
                }


                let timeText = "";


                if (
    schedule.startTime &&
    schedule.endTime
) {

    timeText =
        `${schedule.startTime} - ${schedule.endTime}`;

} else if (
    Array.isArray(schedule.periods) &&
    schedule.periods.length
) {

    timeText =
        `Periods ${schedule.periods.join(", ")}`;
}


                return [
                    schedule.day,
                    timeText
                ]
                    .filter(Boolean)
                    .join(" ");
            })
            .join(" / ");
    }


    /* =====================================================
       13. SCHEDULE LABEL
    ===================================================== */

    function scheduleBadge(course) {

    if (
        !Array.isArray(course.schedule) ||
        course.schedule.length === 0
    ) {
        return "";
    }

    const days = [
        ...new Set(
            course.schedule
                .map(item => item.day)
                .filter(Boolean)
        )
    ];

    return days.join(" / ");
}


    /* =====================================================
       14. RENDER RESULTS
    ===================================================== */

    function renderCourses() {

        const filtered =
            getFilteredCourses();


        resultsCount.textContent =
            `${filtered.length} course section${
                filtered.length === 1
                    ? ""
                    : "s"
            } found`;


        if (!filtered.length) {

            courseResults.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        ðŸ”Ž
                    </div>

                    <h3>
                        No courses found
                    </h3>

                    <p>
                        No Fall 2026 course records match
                        the selected filters. Try another
                        department, year, category or search.
                    </p>

                </div>
            `;

            return;
        }


        courseResults.innerHTML =
            filtered
                .map(renderCourseCard)
                .join("");


        bindCourseButtons();
    }


    /* =====================================================
       15. COURSE CARD
    ===================================================== */

    function renderCourseCard(course) {

        const selected =
            selectedCodes.includes(course.code);

        const professor =
            displayProfessor(course);

        const schedule =
            displaySchedule(course);

        const badge =
            scheduleBadge(course);


        return `
            <article class="course-card">

                <div class="course-info">

                    <div class="course-top">

                        <span class="course-code">
                            ${escapeHTML(course.code)}
                        </span>

                        <span class="course-category">
                            ${escapeHTML(course.category)}
                        </span>

                        ${
                            badge
                            ? `
                                <span class="course-category">
                                    ${escapeHTML(badge)}
                                </span>
                              `
                            : ""
                        }

                    </div>


                    <div class="course-name">
                        ${escapeHTML(course.name)}
                    </div>


                    <div class="course-meta">

                        <span>
                            <strong>Department:</strong>
                            ${escapeHTML(course.department)}
                        </span>

                        <span>
                            <strong>Year:</strong>
                            ${escapeHTML(displayGrade(course))}
                        </span>

                        <span>
                            <strong>Professor:</strong>
                            ${escapeHTML(professor)}
                        </span>

                        <span>
                            <strong>Schedule:</strong>
                            ${escapeHTML(schedule)}
                        </span>

                    </div>

                </div>


                <div class="course-actions">

                    <div class="credit-pill">
                        ${
                            course.credits ?? "â€”"
                        } Credits
                    </div>


                    <button
                        type="button"

                        class="
                            add-course-btn
                            ${selected ? "added" : ""}
                        "

                        data-course-code="
                            ${escapeHTML(course.code)}
                        "
                    >

                        ${
                            selected
                                ? "âœ“ Added"
                                : "+ Add Course"
                        }

                    </button>

                </div>

            </article>
        `;
    }


    /* =====================================================
       16. BUTTON EVENTS
    ===================================================== */

    function bindCourseButtons() {

        document
            .querySelectorAll(
                ".add-course-btn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const code =
                            button.dataset
                                .courseCode
                                .trim();

                        toggleCourse(code);
                    }
                );
            });
    }


    /* =====================================================
       17. TOGGLE SELECTED COURSE
    ===================================================== */

    function toggleCourse(code) {

        if (selectedCodes.includes(code)) {

            selectedCodes =
                selectedCodes.filter(
                    selectedCode =>
                        selectedCode !== code
                );

        } else {

            selectedCodes.push(code);
        }


        saveSelectedCodes();

        renderCourses();

        renderSelectedCourses();
    }


    /* =====================================================
       18. SELECTED COURSE OBJECTS
    ===================================================== */

    function getSelectedCourses() {

        return selectedCodes
            .map(code =>
                courses.find(course =>
                    course.code === code
                )
            )
            .filter(Boolean);
    }


    /* =====================================================
       19. SELECTED COURSE PANEL
    ===================================================== */

    function renderSelectedCourses() {

        const selected =
            getSelectedCourses();


        selectedCourseCount.textContent =
            selected.length;


        const totalCredits =
            selected.reduce(
                (sum, course) =>
                    sum +
                    (
                        Number.isFinite(
                            Number(course.credits)
                        )
                            ? Number(course.credits)
                            : 0
                    ),
                0
            );


        selectedCreditCount.textContent =
            totalCredits;


        if (!selected.length) {

            selectedCoursesElement.innerHTML = `
                <div class="selected-empty">
                    No courses selected yet.
                    <br>
                    Add courses from the results.
                </div>
            `;

            conflictBox.style.display =
                "none";

            conflictBox.innerHTML = "";

            return;
        }


        selectedCoursesElement.innerHTML =
            selected
                .map(course => `
                    <div class="selected-course">

                        <div class="selected-course-code">
                            ${escapeHTML(course.code)}
                        </div>

                        <div class="selected-course-name">
                            ${escapeHTML(course.name)}
                        </div>

                    </div>
                `)
                .join("");


        renderConflicts(selected);
    }


    /* =====================================================
       20. CONFLICT CHECK
    ===================================================== */

    function renderConflicts(selected) {

        if (
            typeof window.findSelectedCourseConflicts
            !== "function"
        ) {

            conflictBox.style.display =
                "none";

            return;
        }


        const conflicts =
            window.findSelectedCourseConflicts(
                selected.map(course =>
                    course.code
                )
            );


        if (!conflicts.length) {

            conflictBox.style.display =
                "none";

            conflictBox.innerHTML = "";

            return;
        }


        conflictBox.style.display =
            "block";


        conflictBox.innerHTML = `
            <strong>
                âš  Timetable conflict detected
            </strong>

            <br><br>

            ${
                conflicts
                    .map(conflict => {

                        const a =
                            conflict.courseA;

                        const b =
                            conflict.courseB;

                        return `
                            ${escapeHTML(a.code)}
                            conflicts with
                            ${escapeHTML(b.code)}
                        `;
                    })
                    .join("<br>")
            }
        `;
    }


    /* =====================================================
       21. RESET FILTERS
    ===================================================== */

    function resetFilters() {

        departmentFilter.value = "";

        gradeFilter.value = "";

        courseSearch.value = "";

        populateCategories();

        categoryFilter.value = "";

        renderCourses();
    }



    /* =====================================================
       INITIAL COURSE FINDER STATE
       Do not show courses until Find Courses is clicked.
    ===================================================== */

    function showInitialState() {

        if (courseResults) {
            courseResults.innerHTML = `
                <div class="course-empty-state">
                    Select your requirements and click
                    <strong>Find Courses</strong> to view available courses.
                </div>
            `;
        }


    }

    /* =====================================================
       22. EVENTS
    ===================================================== */

    findButton.addEventListener(
    "click",
    renderCourses
);


resetButton.addEventListener(
    "click",
    resetFilters
);


/*
    Changing Department only updates
    the Category dropdown.

    It DOES NOT show course results.
*/
departmentFilter.addEventListener(
    "change",
    () => {

        populateCategories();

    }
);


/*
    IMPORTANT:

    Grade
    Category
    Day
    Search

    do NOT automatically run renderCourses().

    Results appear only after
    clicking Find Courses.
*/


/*
    Pressing Enter in the search box
    is allowed to run Find Courses.
*/
courseSearch.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            renderCourses();
        }
    }
);


    openTimetableButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "timetable.html";
        }
    );


    /* =====================================================
       23. INITIALIZE
    ===================================================== */

    populateDepartments();

    populateCategories();

    showInitialState();

    renderSelectedCourses();

});

