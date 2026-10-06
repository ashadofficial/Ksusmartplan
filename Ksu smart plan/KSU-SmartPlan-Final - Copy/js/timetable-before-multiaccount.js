/* =========================================================
   KSU SMARTPLAN
   TIMETABLE PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       1. DATABASE
    ===================================================== */

    const courses =
        Array.isArray(window.KSU_COURSES)
            ? window.KSU_COURSES
            : [];

    const periods =
        window.KSU_PERIODS || {};


    /* =====================================================
       2. ELEMENTS
    ===================================================== */

    const weeklyGrid =
        document.getElementById("weeklyGrid");

    const courseList =
        document.getElementById("timetableCourseList");

    const plannedCourseCount =
        document.getElementById("plannedCourseCount");

    const summaryCourseCount =
        document.getElementById("summaryCourseCount");

    const summaryCreditCount =
        document.getElementById("summaryCreditCount");

    const summaryClassDays =
        document.getElementById("summaryClassDays");

    const summaryConflictCount =
        document.getElementById("summaryConflictCount");

    const conflictMessage =
        document.getElementById(
            "timetableConflictMessage"
        );

    const clearButton =
        document.getElementById(
            "clearTimetableButton"
        );


    /* =====================================================
       3. DAYS
    ===================================================== */

    const DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ];


    /* =====================================================
       4. STORAGE
    ===================================================== */

    function getSelectedCodes() {

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

            console.error(
                "Could not read selected courses.",
                error
            );

            return [];
        }
    }


    function saveSelectedCodes(codes) {

        localStorage.setItem(
            "ksuSelectedCourses",
            JSON.stringify(codes)
        );
    }


    /* =====================================================
       5. SELECTED COURSE OBJECTS
    ===================================================== */

    function getSelectedCourses() {

        const selectedCodes =
            getSelectedCodes();

        return selectedCodes
            .map(code =>
                courses.find(course =>
                    course.code === code
                )
            )
            .filter(Boolean);
    }


    /* =====================================================
       6. SCHEDULE NORMALIZER

       Supports:
       schedule: [{...}]
       and
       schedule: {...}
    ===================================================== */

    function getSchedules(course) {

        if (!course) {
            return [];
        }

        if (Array.isArray(course.schedule)) {

            return course.schedule.filter(
                schedule =>
                    schedule &&
                    schedule.day &&
                    Array.isArray(
                        schedule.periods
                    )
            );
        }

        if (
            course.schedule &&
            typeof course.schedule === "object" &&
            course.schedule.day &&
            Array.isArray(
                course.schedule.periods
            )
        ) {

            return [course.schedule];
        }

        return [];
    }


    /* =====================================================
       7. ESCAPE HTML
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
       8. PERIOD → TIME
    ===================================================== */

    function getPeriodTime(period) {

        const item =
            periods[period];

        if (!item) {
            return null;
        }

        return {
            start: item.start,
            end: item.end,
            lunch: Boolean(item.lunch)
        };
    }


    function getScheduleTimeText(schedule) {

        if (!schedule) {
            return "Schedule unavailable";
        }


        /* Existing generated/source clock time */

        const start =
            schedule.start ||
            schedule.startTime;

        const end =
            schedule.end ||
            schedule.endTime;

        if (start && end) {

            return `${start} – ${end}`;
        }


        /* Calculate from known KSU periods */

        if (
            Array.isArray(schedule.periods) &&
            schedule.periods.length
        ) {

            const firstPeriod =
                schedule.periods[0];

            const lastPeriod =
                schedule.periods[
                    schedule.periods.length - 1
                ];

            const first =
                getPeriodTime(firstPeriod);

            const last =
                getPeriodTime(lastPeriod);

            if (
                first &&
                last &&
                first.start &&
                last.end
            ) {

                return (
                    `${first.start} – ${last.end}`
                );
            }


            /*
                Period 13/14 and any undefined
                source period:

                Do NOT invent clock time.
            */

            return (
                `Periods ${
                    schedule.periods.join(", ")
                }`
            );
        }

        return "Time unavailable";
    }


    /* =====================================================
       9. CONFLICT DETECTION
    ===================================================== */

    function schedulesConflict(
        scheduleA,
        scheduleB
    ) {

        if (
            !scheduleA ||
            !scheduleB ||
            scheduleA.day !== scheduleB.day
        ) {
            return false;
        }

        if (
            !Array.isArray(scheduleA.periods) ||
            !Array.isArray(scheduleB.periods)
        ) {
            return false;
        }

        return scheduleA.periods.some(
            period =>
                scheduleB.periods.includes(
                    period
                )
        );
    }


    function getConflicts(selected) {

        const conflicts = [];

        for (
            let i = 0;
            i < selected.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < selected.length;
                j++
            ) {

                const courseA =
                    selected[i];

                const courseB =
                    selected[j];

                const schedulesA =
                    getSchedules(courseA);

                const schedulesB =
                    getSchedules(courseB);


                schedulesA.forEach(
                    scheduleA => {

                        schedulesB.forEach(
                            scheduleB => {

                                if (
                                    schedulesConflict(
                                        scheduleA,
                                        scheduleB
                                    )
                                ) {

                                    conflicts.push({
                                        courseA,
                                        courseB,
                                        scheduleA,
                                        scheduleB
                                    });
                                }
                            }
                        );
                    }
                );
            }
        }

        return conflicts;
    }


    /* =====================================================
       10. SUMMARY
    ===================================================== */

    function renderSummary(selected) {

        const totalCredits =
            selected.reduce(
                (total, course) =>
                    total +
                    (
                        Number(
                            course.credits
                        ) || 0
                    ),
                0
            );


        const classDays =
            new Set();


        selected.forEach(course => {

            getSchedules(course)
                .forEach(schedule => {

                    if (
                        DAYS.includes(
                            schedule.day
                        )
                    ) {

                        classDays.add(
                            schedule.day
                        );
                    }
                });
        });


        const conflicts =
            getConflicts(selected);


        plannedCourseCount.textContent =
            selected.length;

        summaryCourseCount.textContent =
            selected.length;

        summaryCreditCount.textContent =
            totalCredits;

        summaryClassDays.textContent =
            classDays.size;

        summaryConflictCount.textContent =
            conflicts.length;


        renderConflictMessage(
            conflicts
        );
    }


    /* =====================================================
       11. CONFLICT MESSAGE
    ===================================================== */

    function renderConflictMessage(
        conflicts
    ) {

        if (!conflicts.length) {

            conflictMessage.hidden = true;
            conflictMessage.innerHTML = "";

            return;
        }


        const names =
            conflicts.map(conflict => {

                return `
                    <strong>
                        ${escapeHTML(
                            conflict.courseA.name
                        )}
                    </strong>

                    conflicts with

                    <strong>
                        ${escapeHTML(
                            conflict.courseB.name
                        )}
                    </strong>

                    on

                    ${escapeHTML(
                        conflict.scheduleA.day
                    )}
                `;
            });


        conflictMessage.innerHTML = `
            <strong>
                Schedule conflict detected.
            </strong>

            <div style="margin-top:6px">
                ${names.join("<br>")}
            </div>
        `;

        conflictMessage.hidden = false;
    }


    /* =====================================================
       12. WEEKLY GRID
    ===================================================== */

    function renderWeeklyGrid(selected) {

        if (!weeklyGrid) {
            return;
        }


        /*
            Display known standard periods.

            Period 5 remains visible as
            lunch break.

            Source periods outside the
            standard mapping are shown
            separately below.
        */

        const standardPeriodNumbers =
            Object.keys(periods)
                .map(Number)
                .filter(Number.isFinite)
                .sort((a, b) => a - b);


        let html = `
            <div class="tt-grid">
        `;


        /* HEADER */

        html += `
            <div class="tt-corner">
                Time
            </div>
        `;


        DAYS.forEach(day => {

            html += `
                <div class="tt-day-header">
                    ${escapeHTML(day)}
                </div>
            `;
        });


        /* STANDARD PERIOD ROWS */

        standardPeriodNumbers.forEach(
            periodNumber => {

                const period =
                    getPeriodTime(
                        periodNumber
                    );

                if (!period) {
                    return;
                }


                html += `
                    <div class="
                        tt-time-cell
                        ${
                            period.lunch
                                ? "tt-lunch-time"
                                : ""
                        }
                    ">

                        <strong>
                            ${
                                escapeHTML(
                                    period.start
                                )
                            }
                        </strong>

                        <span>
                            ${
                                escapeHTML(
                                    period.end
                                )
                            }
                        </span>

                    </div>
                `;


                DAYS.forEach(day => {

                    if (period.lunch) {

                        html += `
                            <div
                                class="tt-cell tt-lunch-cell"
                            >
                                Lunch
                            </div>
                        `;

                        return;
                    }


                    const matching =
                        getCoursesForCell(
                            selected,
                            day,
                            periodNumber
                        );


                    html += `
                        <div
                            class="tt-cell"
                            data-day="${escapeHTML(day)}"
                            data-period="${periodNumber}"
                        >

                            ${
                                matching
                                    .map(item =>
                                        renderGridCourse(
                                            item.course,
                                            item.schedule,
                                            periodNumber
                                        )
                                    )
                                    .join("")
                            }

                        </div>
                    `;
                });
            }
        );


        html += `</div>`;


        /* SPECIAL / SOURCE PERIODS */

        const specialSchedules =
            getSpecialSchedules(
                selected,
                standardPeriodNumbers
            );


        if (specialSchedules.length) {

            html += `
                <div class="tt-special-section">

                    <div class="tt-special-title">
                        Additional Source Schedule
                    </div>

                    <div class="tt-special-list">

                        ${
                            specialSchedules
                                .map(item =>
                                    renderSpecialSchedule(
                                        item
                                    )
                                )
                                .join("")
                        }

                    </div>

                </div>
            `;
        }


        weeklyGrid.innerHTML = html;
    }


    /* =====================================================
       13. COURSES FOR GRID CELL
    ===================================================== */

    function getCoursesForCell(
        selected,
        day,
        periodNumber
    ) {

        const results = [];


        selected.forEach(course => {

            getSchedules(course)
                .forEach(schedule => {

                    if (
                        schedule.day === day &&
                        schedule.periods.includes(
                            periodNumber
                        )
                    ) {

                        results.push({
                            course,
                            schedule
                        });
                    }
                });
        });


        return results;
    }


    /* =====================================================
       14. GRID COURSE

       Only render full course card in the
       FIRST period occupied by that course.
       Later cells show continuation.
    ===================================================== */

    function renderGridCourse(
        course,
        schedule,
        currentPeriod
    ) {

        const firstPeriod =
            schedule.periods[0];


        if (currentPeriod !== firstPeriod) {

            return `
                <div class="tt-course-continuation">
                    •
                </div>
            `;
        }


        return `
            <div class="tt-course-block">

                <strong>
                    ${escapeHTML(course.name)}
                </strong>

                <span>
                    ${escapeHTML(course.code)}
                </span>

                <small>
                    ${
                        escapeHTML(
                            getScheduleTimeText(
                                schedule
                            )
                        )
                    }
                </small>

            </div>
        `;
    }


    /* =====================================================
       15. SPECIAL SOURCE SCHEDULES
    ===================================================== */

    function getSpecialSchedules(
        selected,
        standardPeriods
    ) {

        const standardSet =
            new Set(
                standardPeriods
            );

        const results = [];


        selected.forEach(course => {

            getSchedules(course)
                .forEach(schedule => {

                    const hasSpecialPeriod =
                        schedule.periods.some(
                            period =>
                                !standardSet.has(
                                    period
                                )
                        );


                    if (hasSpecialPeriod) {

                        results.push({
                            course,
                            schedule
                        });
                    }
                });
        });


        return results;
    }


    function renderSpecialSchedule(item) {

        const {
            course,
            schedule
        } = item;


        return `
            <div class="tt-special-item">

                <div>

                    <strong>
                        ${escapeHTML(
                            course.name
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            course.code
                        )}
                    </span>

                </div>

                <div class="tt-special-time">

                    ${escapeHTML(
                        schedule.day
                    )}

                    ·

                    ${escapeHTML(
                        getScheduleTimeText(
                            schedule
                        )
                    )}

                </div>

            </div>
        `;
    }


    /* =====================================================
       16. SELECTED COURSE LIST
    ===================================================== */

    function renderCourseList(selected) {

        if (!courseList) {
            return;
        }


        if (!selected.length) {

            courseList.innerHTML = "";

            return;
        }


        courseList.innerHTML =
            selected
                .map(course => {

                    const schedules =
                        getSchedules(course);


                    const scheduleText =
                        schedules.length
                            ? schedules
                                .map(schedule => {

                                    return (
                                        `${schedule.day} · ` +
                                        getScheduleTimeText(
                                            schedule
                                        )
                                    );
                                })
                                .join(" / ")
                            : "Schedule unavailable";


                    return `
                        <div class="timetable-course-item">

                            <div class="course-item-main">

                                <strong>
                                    ${escapeHTML(
                                        course.name
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        course.code
                                    )}

                                    ·

                                    ${escapeHTML(
                                        course.credits
                                    )}
                                    credits

                                    ·

                                    ${escapeHTML(
                                        scheduleText
                                    )}
                                </span>

                            </div>


                            <button
                                type="button"
                                class="tt-remove-button"
                                data-remove-course="${
                                    escapeHTML(
                                        course.code
                                    )
                                }"
                            >
                                Remove
                            </button>

                        </div>
                    `;
                })
                .join("");
    }


    /* =====================================================
       17. REMOVE COURSE
    ===================================================== */

    function removeCourse(code) {

        const updated =
            getSelectedCodes()
                .filter(
                    selectedCode =>
                        selectedCode !== code
                );


        saveSelectedCodes(updated);

        render();
    }


    /* =====================================================
       18. CLEAR TIMETABLE
    ===================================================== */

    function clearTimetable() {

        const selected =
            getSelectedCodes();


        if (!selected.length) {
            return;
        }


        const confirmed =
            window.confirm(
                "Remove all courses from your timetable?"
            );


        if (!confirmed) {
            return;
        }


        saveSelectedCodes([]);

        render();
    }


    /* =====================================================
       19. EVENTS
    ===================================================== */

    if (courseList) {

        courseList.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-course]"
                    );


                if (!button) {
                    return;
                }


                removeCourse(
                    button.dataset
                        .removeCourse
                );
            }
        );
    }


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearTimetable
        );
    }


    /*
        Keep Timetable synchronized if
        localStorage changes in another tab.
    */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                "ksuSelectedCourses"
            ) {

                render();
            }
        }
    );


    /* =====================================================
       20. MAIN RENDER
    ===================================================== */

    function render() {

        const selected =
            getSelectedCourses();


        renderSummary(selected);

        renderWeeklyGrid(selected);

        renderCourseList(selected);
    }


    /* =====================================================
       21. INITIALIZE
    ===================================================== */

    render();

});