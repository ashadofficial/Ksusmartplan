document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const TOTAL_REQUIRED = 130;

    const courses =
        Array.isArray(window.KSU_COURSES)
            ? window.KSU_COURSES
            : [];

    const STORAGE_KEY =
        "ksuSmartPlanCompletedCourses";


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

    function setWidth(id, value) {

        const element = byId(id);

        if (!element) return;

        const percentage =
            Math.max(
                0,
                Math.min(100, Number(value) || 0)
            );

        element.style.width =
            `${percentage}%`;
    }


    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "ksuSmartPlanCurrentUser"
                )
            ) || {};

        } catch {

            return {};
        }
    }


    /* =====================================================
       COMPLETED COURSE STORAGE
    ===================================================== */

    function getCompletedCourses() {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_KEY
                    )
                );

            return Array.isArray(saved)
                ? saved
                : [];

        } catch {

            return [];
        }
    }


    function saveCompletedCourses(list) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(list)
        );
    }


    /* =====================================================
       UNIQUE ACADEMIC COURSES
    ===================================================== */

    function getUniqueCourses() {

        const map = new Map();

        courses.forEach(course => {

            if (!course) return;

            const code =
                String(course.code || "")
                    .trim();

            const name =
                String(course.name || "")
                    .trim();

            if (!code && !name) {
                return;
            }

            /*
                Course code is the primary identity.

                If a database entry has no code,
                name becomes fallback identity.
            */

            const key =
                code
                    ? code.toLowerCase()
                    : name.toLowerCase();

            if (!map.has(key)) {

                map.set(key, {
                    code,
                    name,
                    credits:
                        Number(course.credits) || 0,
                    category:
                        course.category || "",
                    department:
                        course.department || ""
                });
            }
        });

        return [...map.values()];
    }


    const uniqueCourses =
        getUniqueCourses();


    /* =====================================================
       COURSE SEARCH
    ===================================================== */

    const searchInput =
        byId("completedCourseSearch");

    const searchResults =
        byId("completedCourseSearchResults");

    const preview =
        byId("completedCoursePreview");

    const semesterSelect =
        byId("completedSemester");

    const addButton =
        byId("addCompletedCourseButton");

    const clearSearch =
        byId("clearCompletedSearch");


    let selectedCourse = null;


    function hideSearchResults() {

        if (searchResults) {
            searchResults.innerHTML = "";
        }
    }


    function hidePreview() {

        selectedCourse = null;

        if (preview) {
            preview.hidden = true;
        }
    }


    function showMessage(message, type = "success") {

        const element =
            byId("completedCourseMessage");

        if (!element) return;

        element.hidden = false;
        element.textContent = message;
        element.dataset.type = type;

        window.clearTimeout(
            showMessage.timer
        );

        showMessage.timer =
            window.setTimeout(() => {

                element.hidden = true;

            }, 3500);
    }


    function renderSearchResults() {

        if (
            !searchInput ||
            !searchResults
        ) {
            return;
        }

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        hidePreview();


        if (!query) {

            hideSearchResults();
            return;
        }


        const completed =
            getCompletedCourses();


        const completedCodes =
            new Set(
                completed.map(item =>
                    String(item.code || "")
                        .toLowerCase()
                )
            );


        const matches =
            uniqueCourses
                .filter(course => {

                    const searchable =
                        [
                            course.code,
                            course.name
                        ]
                            .join(" ")
                            .toLowerCase();

                    return searchable.includes(
                        query
                    );
                })
                .slice(0, 12);


        if (!matches.length) {

            searchResults.innerHTML = `
                <div class="completed-search-empty">
                    No matching course found.
                </div>
            `;

            return;
        }


        searchResults.innerHTML =
            matches
                .map((course, index) => {

                    const alreadyCompleted =
                        completedCodes.has(
                            String(course.code)
                                .toLowerCase()
                        );

                    return `
                        <button
                            type="button"
                            class="completed-search-result"
                            data-result-index="${index}"
                            ${alreadyCompleted ? "disabled" : ""}
                        >
                            <div>
                                <strong>
                                    ${escapeHtml(course.code)}
                                </strong>

                                <span>
                                    ${escapeHtml(course.name)}
                                </span>
                            </div>

                            <div class="completed-search-result-meta">
                                <span>
                                    ${escapeHtml(course.category)}
                                </span>

                                <strong>
                                    ${course.credits} credits
                                </strong>

                                ${
                                    alreadyCompleted
                                        ? "<em>Already completed</em>"
                                        : ""
                                }
                            </div>
                        </button>
                    `;
                })
                .join("");


        searchResults
            .querySelectorAll(
                ".completed-search-result:not([disabled])"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset
                                    .resultIndex
                            );

                        selectedCourse =
                            matches[index];

                        showSelectedCourse();
                    }
                );
            });
    }


    function showSelectedCourse() {

        if (
            !selectedCourse ||
            !preview
        ) {
            return;
        }

        setText(
            "completedPreviewCode",
            selectedCourse.code
        );

        setText(
            "completedPreviewName",
            selectedCourse.name
        );

        setText(
            "completedPreviewCategory",
            selectedCourse.category ||
            "Category not specified"
        );

        setText(
            "completedPreviewCredits",
            selectedCourse.credits
        );

        preview.hidden = false;

        hideSearchResults();
    }


    function escapeHtml(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =====================================================
       ADD COMPLETED COURSE
    ===================================================== */

    function addCompletedCourse() {

        if (!selectedCourse) {

            showMessage(
                "Select a course first.",
                "error"
            );

            return;
        }


        const semester =
            semesterSelect
                ? semesterSelect.value
                : "";


        if (!semester) {

            showMessage(
                "Select the completed semester.",
                "error"
            );

            return;
        }


        const completed =
            getCompletedCourses();


        const duplicate =
            completed.some(item =>
                String(item.code || "")
                    .toLowerCase() ===
                String(selectedCourse.code || "")
                    .toLowerCase()
            );


        if (duplicate) {

            showMessage(
                "This course is already in your completed history.",
                "error"
            );

            return;
        }


        completed.push({

            code:
                selectedCourse.code,

            name:
                selectedCourse.name,

            credits:
                Number(
                    selectedCourse.credits
                ) || 0,

            category:
                selectedCourse.category,

            department:
                selectedCourse.department,

            semester:
                semester
        });


        saveCompletedCourses(
            completed
        );


        if (searchInput) {
            searchInput.value = "";
        }

        if (semesterSelect) {
            semesterSelect.value = "";
        }


        hideSearchResults();
        hidePreview();

        renderCompletedCourses();
        renderCreditProgress();


        showMessage(
            `${selectedCourse.name} added to completed courses.`
        );
    }


    /* =====================================================
       REMOVE COMPLETED COURSE
    ===================================================== */

    function removeCompletedCourse(code) {

        const completed =
            getCompletedCourses()
                .filter(item =>
                    String(item.code || "") !==
                    String(code || "")
                );


        saveCompletedCourses(
            completed
        );

        renderCompletedCourses();
        renderCreditProgress();

        showMessage(
            "Course removed from completed history."
        );
    }


    /* =====================================================
       COMPLETED COURSE LIST
    ===================================================== */

    function renderCompletedCourses() {

        const listElement =
            byId("completedCourseList");

        if (!listElement) {
            return;
        }


        const completed =
            getCompletedCourses();


        const totalCredits =
            completed.reduce(
                (total, course) =>
                    total +
                    (
                        Number(
                            course.credits
                        ) || 0
                    ),
                0
            );


        setText(
            "completedCourseCount",
            `${completed.length} ${
                completed.length === 1
                    ? "course"
                    : "courses"
            }`
        );


        setText(
            "completedHistoryCredits",
            `${totalCredits} credits`
        );


        if (!completed.length) {

            listElement.innerHTML = `
                <div class="completed-course-empty">

                    <div class="completed-empty-icon">
                        +
                    </div>

                    <strong>
                        No completed courses added yet
                    </strong>

                    <p>
                        Search above to add courses
                        from your previous semesters.
                    </p>

                </div>
            `;

            return;
        }


        listElement.innerHTML =
            completed
                .map(course => `

                    <article class="completed-course-row">

                        <div class="completed-course-main">

                            <div class="completed-course-code">
                                ${escapeHtml(course.code)}
                            </div>

                            <div>

                                <h4>
                                    ${escapeHtml(course.name)}
                                </h4>

                                <p>
                                    ${escapeHtml(course.category)}
                                    ·
                                    ${escapeHtml(course.semester)}
                                </p>

                            </div>

                        </div>


                        <div class="completed-course-row-actions">

                            <strong>
                                ${Number(course.credits) || 0}
                                credits
                            </strong>

                            <button
                                type="button"
                                class="remove-completed-course"
                                data-course-code="${escapeHtml(course.code)}"
                            >
                                Remove
                            </button>

                        </div>

                    </article>

                `)
                .join("");


        listElement
            .querySelectorAll(
                ".remove-completed-course"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeCompletedCourse(
                            button.dataset.courseCode
                        );
                    }
                );
            });
    }


    /* =====================================================
       CREDIT CALCULATION
    ===================================================== */

    function calculateCredits() {

        const completed =
            getCompletedCourses();


        const result = {

            total: 0,
            major: 0,
            engineering: 0,
            undergraduate: 0,
            general: 0
        };


        completed.forEach(course => {

            const credits =
                Number(course.credits) || 0;

            result.total += credits;


            if (
                course.category ===
                "Major"
            ) {

                result.major += credits;

            } else if (
                course.category ===
                "Engineering Basic"
            ) {

                result.engineering +=
                    credits;

            } else if (
                course.category ===
                "Basic Undergraduate"
            ) {

                result.undergraduate +=
                    credits;
            }

            /*
                There is currently no separate
                General Education category in
                KSU_COURSES, so we intentionally
                do not invent/misclassify it.
            */
        });


        return result;
    }


    function renderCreditProgress() {

        const data =
            calculateCredits();


        const completed =
            Math.min(
                TOTAL_REQUIRED,
                data.total
            );


        const remaining =
            Math.max(
                0,
                TOTAL_REQUIRED - completed
            );


        const percentage =
            TOTAL_REQUIRED
                ? (
                    completed /
                    TOTAL_REQUIRED
                ) * 100
                : 0;


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


        setText(
            "generalCompleted",
            data.general
        );


        renderRequiredCategory(
            "undergraduate",
            data.undergraduate,
            18
        );


        setText(
            "engineeringCompleted",
            data.engineering
        );

        setText(
            "majorCompleted",
            data.major
        );


        setText(
            "summaryCompletedCredits",
            completed
        );

        setText(
            "summaryRemainingCredits",
            remaining
        );
    }


    function renderRequiredCategory(
        key,
        completed,
        required
    ) {

        const percentage =
            required > 0
                ? Math.min(
                    100,
                    (
                        completed /
                        required
                    ) * 100
                )
                : 0;


        const remaining =
            Math.max(
                0,
                required - completed
            );


        setText(
            `${key}Completed`,
            completed
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
       CURRENT SEMESTER PLANNED COURSES
    ===================================================== */

    function getPlannedCourseCodes() {

        const possibleKeys = [

            "ksuSmartPlanSelectedCourses",
            "ksuSmartPlanPlannedCourses",
            "selectedCourses"

        ];


        for (const key of possibleKeys) {

            try {

                const value =
                    JSON.parse(
                        localStorage.getItem(
                            key
                        )
                    );


                if (Array.isArray(value)) {

                    return value
                        .map(item => {

                            if (
                                typeof item ===
                                "string"
                            ) {
                                return item;
                            }

                            return (
                                item.code ||
                                item.courseCode ||
                                ""
                            );
                        })
                        .filter(Boolean);
                }

            } catch {
                // Continue checking other keys.
            }
        }


        return [];
    }


    function calculateCurrentSemesterCredits() {

        const codes =
            getPlannedCourseCodes();


        const uniqueCodes =
            [...new Set(
                codes.map(code =>
                    String(code)
                        .trim()
                        .toLowerCase()
                )
            )];


        return uniqueCodes.reduce(
            (total, code) => {

                const course =
                    uniqueCourses.find(item =>
                        String(item.code)
                            .toLowerCase() ===
                        code
                    );


                return total +
                    (
                        course
                            ? Number(
                                course.credits
                            ) || 0
                            : 0
                    );
            },
            0
        );
    }


    /* =====================================================
       SCHOLARSHIP CREDIT REQUIREMENT
    ===================================================== */

    function getStudentYear() {

        const user =
            getCurrentUser();


        const possibleValues = [

            user.year,
            user.grade,
            user.studentYear,
            user.currentYear

        ];


        for (const value of possibleValues) {

            const text =
                String(value ?? "");

            const match =
                text.match(/[1-4]/);

            if (match) {
                return Number(match[0]);
            }
        }


        return null;
    }


    function renderScholarshipRequirement() {

        const year =
            getStudentYear();


        const required =
            year === 4
                ? 12
                : 16;


        const current =
            calculateCurrentSemesterCredits();


        const remaining =
            Math.max(
                0,
                required - current
            );


        const percentage =
            required
                ? Math.min(
                    100,
                    (
                        current /
                        required
                    ) * 100
                )
                : 0;


        setText(
            "scholarshipStudentYear",
            year
                ? `${year}${
                    year === 1
                        ? "st"
                        : year === 2
                            ? "nd"
                            : year === 3
                                ? "rd"
                                : "th"
                } Year`
                : "Year not set"
        );


        setText(
            "scholarshipCurrentCredits",
            current
        );


        setText(
            "scholarshipRequiredCredits",
            required
        );


        setWidth(
            "scholarshipProgressFill",
            percentage
        );


        if (!year) {

            setText(
                "scholarshipCreditStatus",
                "Student year is not set"
            );

            setText(
                "scholarshipCreditRemaining",
                "Update your profile year to check the correct requirement."
            );

            return;
        }


        if (current >= required) {

            setText(
                "scholarshipCreditStatus",
                "Credit requirement met"
            );

            setText(
                "scholarshipCreditRemaining",
                "Minimum semester credit requirement completed."
            );

        } else {

            setText(
                "scholarshipCreditStatus",
                "Credit requirement not met yet"
            );

            setText(
                "scholarshipCreditRemaining",
                `${remaining} more ${
                    remaining === 1
                        ? "credit"
                        : "credits"
                } needed`
            );
        }


        setText(
            "scholarshipRequirementDescription",
            year === 4
                ? "As a 4th-year student, the semester credit requirement is 12 credits."
                : "For 1st to 3rd-year students, the semester credit requirement is 16 credits."
        );
    }


    /* =====================================================
       EVENTS
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderSearchResults
        );
    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value = "";
                    searchInput.focus();
                }

                hideSearchResults();
                hidePreview();
            }
        );
    }


    if (addButton) {

        addButton.addEventListener(
            "click",
            addCompletedCourse
        );
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCompletedCourses();
    renderCreditProgress();
    renderScholarshipRequirement();

});
