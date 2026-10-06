document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    const STORAGE_KEY =
        "ksuSmartPlanGpaCalculator";


    const GRADE_POINTS = {

        "A+": 4.5,
        "A": 4.0,

        "B+": 3.5,
        "B": 3.0,

        "C+": 2.5,
        "C": 2.0,

        "D+": 1.5,
        "D": 1.0,

        "F": 0.0
    };


    const rowsContainer =
        document.getElementById(
            "gpaSubjectRows"
        );

    const emptyState =
        document.getElementById(
            "gpaEmptyState"
        );

    const addButton =
        document.getElementById(
            "addGpaSubject"
        );

    const calculateButton =
        document.getElementById(
            "calculateGpa"
        );

    const resetButton =
        document.getElementById(
            "resetGpa"
        );


    let subjects = [];


    /* =====================================================
       STORAGE
    ===================================================== */

    function saveSubjects() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(subjects)
        );
    }


    function loadSubjects() {

        try {

            const stored =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_KEY
                    )
                );

            if (Array.isArray(stored)) {
                subjects = stored;
            }

        } catch {

            subjects = [];
        }
    }


    /* =====================================================
       CREATE SUBJECT
    ===================================================== */

    function createSubject() {

        return {

            id:
                Date.now() +
                Math.random(),

            name: "",

            credit: 3,

            grade: "A+"
        };
    }


    /* =====================================================
       GRADE OPTIONS
    ===================================================== */

    function gradeOptions(
        selectedGrade
    ) {

        return Object.keys(
            GRADE_POINTS
        )
            .map(grade => `

                <option
                    value="${grade}"
                    ${
                        grade === selectedGrade
                            ? "selected"
                            : ""
                    }
                >
                    ${grade}
                </option>

            `)
            .join("");
    }


    /* =====================================================
       RENDER ROWS
    ===================================================== */

    function renderRows() {

        if (!rowsContainer) {
            return;
        }


        if (subjects.length === 0) {

            rowsContainer.innerHTML = "";

            if (emptyState) {
                emptyState.hidden = false;
            }

        } else {

            if (emptyState) {
                emptyState.hidden = true;
            }


            rowsContainer.innerHTML =
                subjects
                    .map(subject => {

                        const point =
                            GRADE_POINTS[
                                subject.grade
                            ] ?? 0;

                        return `

                            <div
                                class="gpa-subject-row"
                                data-id="${subject.id}"
                            >

                                <input
                                    type="text"
                                    class="gpa-subject-name"
                                    placeholder="e.g. Computer Vision"
                                    value="${escapeHtml(
                                        subject.name
                                    )}"
                                >


                                <select
                                    class="gpa-credit-select"
                                >

                                    ${[1, 2, 3, 4, 5, 6]
                                        .map(
                                            credit => `

                                                <option
                                                    value="${credit}"
                                                    ${
                                                        Number(
                                                            subject.credit
                                                        ) === credit
                                                            ? "selected"
                                                            : ""
                                                    }
                                                >
                                                    ${credit}
                                                </option>

                                            `
                                        )
                                        .join("")}

                                </select>


                                <select
                                    class="gpa-grade-select"
                                >
                                    ${gradeOptions(
                                        subject.grade
                                    )}
                                </select>


                                <div class="gpa-row-point">

                                    <strong>
                                        ${point.toFixed(1)}
                                    </strong>

                                    <span>
                                        grade point
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    class="gpa-remove-row"
                                    title="Remove subject"
                                >
                                    ×
                                </button>

                            </div>

                        `;

                    })
                    .join("");
        }


        attachRowEvents();
        updateLiveSummary();
        saveSubjects();
    }


    /* =====================================================
       EVENTS FOR ROWS
    ===================================================== */

    function attachRowEvents() {

        document
            .querySelectorAll(
                ".gpa-subject-row"
            )
            .forEach(row => {

                const id =
                    Number(
                        row.dataset.id
                    );


                const subject =
                    subjects.find(
                        item =>
                            Number(item.id) ===
                            id
                    );


                if (!subject) {
                    return;
                }


                const nameInput =
                    row.querySelector(
                        ".gpa-subject-name"
                    );

                const creditSelect =
                    row.querySelector(
                        ".gpa-credit-select"
                    );

                const gradeSelect =
                    row.querySelector(
                        ".gpa-grade-select"
                    );

                const removeButton =
                    row.querySelector(
                        ".gpa-remove-row"
                    );


                nameInput.addEventListener(
                    "input",
                    () => {

                        subject.name =
                            nameInput.value;

                        saveSubjects();
                    }
                );


                creditSelect.addEventListener(
                    "change",
                    () => {

                        subject.credit =
                            Number(
                                creditSelect.value
                            );

                        saveSubjects();
                        updateLiveSummary();
                    }
                );


                gradeSelect.addEventListener(
                    "change",
                    () => {

                        subject.grade =
                            gradeSelect.value;

                        renderRows();
                    }
                );


                removeButton.addEventListener(
                    "click",
                    () => {

                        subjects =
                            subjects.filter(
                                item =>
                                    Number(
                                        item.id
                                    ) !== id
                            );

                        renderRows();
                    }
                );
            });
    }


    /* =====================================================
       CALCULATION
    ===================================================== */

    function calculate() {

        let totalCredits = 0;
        let totalPoints = 0;


        subjects.forEach(subject => {

            const credit =
                Number(
                    subject.credit
                ) || 0;

            const gradePoint =
                GRADE_POINTS[
                    subject.grade
                ] ?? 0;


            totalCredits +=
                credit;


            totalPoints +=
                credit *
                gradePoint;
        });


        const gpa =
            totalCredits > 0
                ? totalPoints /
                    totalCredits
                : 0;


        return {

            subjects:
                subjects.length,

            totalCredits,

            totalPoints,

            gpa
        };
    }


    /* =====================================================
       LIVE SUMMARY
    ===================================================== */

    function updateLiveSummary() {

        const result =
            calculate();


        setText(
            "gpaSubjectCount",
            result.subjects
        );

        setText(
            "gpaTotalCredits",
            result.totalCredits
        );
    }


    /* =====================================================
       SHOW RESULT
    ===================================================== */

    function showResult() {

        const result =
            calculate();


        setText(
            "gpaResult",
            result.gpa.toFixed(2)
        );

        setText(
            "gpaLargeResult",
            result.gpa.toFixed(2)
        );

        setText(
            "gpaResultSubjects",
            result.subjects
        );

        setText(
            "gpaResultCredits",
            result.totalCredits
        );

        setText(
            "gpaTotalPoints",
            result.totalPoints.toFixed(2)
        );


        if (result.subjects === 0) {

            setText(
                "gpaResultMessage",
                "Add at least one subject to calculate your GPA."
            );

            return;
        }


        setText(
            "gpaResultMessage",
            `Calculated from ${result.subjects} subject${
                result.subjects === 1
                    ? ""
                    : "s"
            } and ${result.totalCredits} credits.`
        );


        const panel =
            document.getElementById(
                "gpaResultPanel"
            );


        if (panel) {

            panel.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetCalculator() {

        subjects = [];

        localStorage.removeItem(
            STORAGE_KEY
        );

        renderRows();


        setText(
            "gpaResult",
            "0.00"
        );

        setText(
            "gpaLargeResult",
            "0.00"
        );

        setText(
            "gpaResultSubjects",
            "0"
        );

        setText(
            "gpaResultCredits",
            "0"
        );

        setText(
            "gpaTotalPoints",
            "0.00"
        );

        setText(
            "gpaResultMessage",
            "Add your courses and calculate your GPA."
        );
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function setText(
        id,
        value
    ) {

        const element =
            document.getElementById(
                id
            );

        if (element) {
            element.textContent =
                value;
        }
    }


    function escapeHtml(value) {

        return String(
            value ?? ""
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );
    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    if (addButton) {

        addButton.addEventListener(
            "click",
            () => {

                subjects.push(
                    createSubject()
                );

                renderRows();
            }
        );
    }


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            showResult
        );
    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetCalculator
        );
    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadSubjects();

    /*
        First-time experience:
        show 6 rows immediately.

        This matches the prototype goal of
        allowing 6-7 subjects to be entered
        without repeatedly pressing Add.
    */

    if (subjects.length === 0) {

        for (
            let i = 0;
            i < 6;
            i++
        ) {

            subjects.push(
                createSubject()
            );
        }
    }


    renderRows();

});
