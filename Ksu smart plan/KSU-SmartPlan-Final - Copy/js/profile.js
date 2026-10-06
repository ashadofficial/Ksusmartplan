document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const USERS_KEY = "ksuSmartPlanUsers";
    const CURRENT_KEY = "ksuSmartPlanCurrentUser";
    const TOTAL_REQUIRED = 130;

    let originalData = null;


    /* =====================================================
       HELPERS
    ===================================================== */

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


    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value ?? "";
        }
    }


    function getCurrentUser() {

        const session =
            readJson(
                CURRENT_KEY,
                null
            );

        if (!session) {
            return null;
        }


        const users =
            readJson(
                USERS_KEY,
                []
            );


        const registered =
            users.find(user =>
                String(user.studentId) ===
                String(session.studentId)
            );


        return registered || session;
    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderProfile() {

        const user =
            getCurrentUser();

        if (!user) {
            return;
        }


        originalData =
            JSON.parse(
                JSON.stringify(user)
            );


        const fullName =
            user.fullName || "Student";

        const studentId =
            user.studentId || "";

        const department =
            user.department || "";

        const academicYear =
            user.academicYear || "";

        const semester =
            user.semester || "";

        const major =
            user.major || department || "";

        const email =
            user.email || "";

        const completedCredits =
            Math.max(
                0,
                Number(
                    user.completedCredits
                ) || 0
            );

        const remaining =
            Math.max(
                0,
                TOTAL_REQUIRED -
                completedCredits
            );

        const percentage =
            Math.min(
                100,
                Math.round(
                    (
                        completedCredits /
                        TOTAL_REQUIRED
                    ) * 100
                )
            );


        /* DISPLAY */

        setText(
            "profileDisplayName",
            fullName
        );

        setText(
            "profileDisplayDepartment",
            department || "KSU Student"
        );

        setText(
            "profileDisplayYear",
            academicYear || "Academic Year"
        );

        setText(
            "profileDisplayStudentId",
            studentId
        );


        const initials =
            fullName
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(part =>
                    part.charAt(0)
                        .toUpperCase()
                )
                .join("") || "S";

        setText(
            "profileAvatar",
            initials
        );


        /* SUMMARY */

        setText(
            "profileCompletedCredits",
            completedCredits
        );

        setText(
            "profileRemainingCredits",
            remaining
        );

        setText(
            "profileProgress",
            percentage + "%"
        );


        /* FORM */

        setValue(
            "profileFullName",
            fullName
        );

        setValue(
            "profileStudentId",
            studentId
        );

        setValue(
            "profileDepartment",
            department
        );

        setValue(
            "profileMajor",
            major
        );

        setValue(
            "profileAcademicYear",
            academicYear
        );

        setValue(
            "profileSemester",
            semester
        );

        setValue(
            "profileEmail",
            email
        );

        setValue(
            "profileCreditsField",
            completedCredits
        );


        /* DETAILS */

        setText(
            "profileDetailDepartment",
            department || "—"
        );

        setText(
            "profileDetailMajor",
            major || "—"
        );

        setText(
            "profileDetailYear",
            academicYear || "—"
        );

        setText(
            "profileDetailSemester",
            semester || "—"
        );

        setText(
            "profileProgressCompleted",
            completedCredits
        );

        setText(
            "profileProgressRemaining",
            remaining
        );


        const progressBar =
            document.getElementById(
                "profileProgressBar"
            );

        if (progressBar) {
            progressBar.style.width =
                percentage + "%";
        }
    }


    function setValue(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value =
                value ?? "";
        }
    }


    /* =====================================================
       EDIT MODE
    ===================================================== */

    const editableIds = [

        "profileFullName",
        "profileDepartment",
        "profileMajor",
        "profileAcademicYear",
        "profileSemester",
        "profileEmail",
        "profileCreditsField"

    ];


    function setEditMode(enabled) {

        editableIds.forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.disabled =
                    !enabled;
            }
        });


        /*
            Student ID always remains locked.
        */

        const studentId =
            document.getElementById(
                "profileStudentId"
            );

        if (studentId) {
            studentId.disabled = true;
        }


        const actions =
            document.getElementById(
                "profileFormActions"
            );

        if (actions) {
            actions.hidden =
                !enabled;
        }


        const editButton =
            document.getElementById(
                "editProfileButton"
            );

        if (editButton) {
            editButton.hidden =
                enabled;
        }
    }


    /* =====================================================
       SAVE
    ===================================================== */

    function saveProfile(event) {

        event.preventDefault();


        const current =
            getCurrentUser();

        if (!current) {
            return;
        }


        const updated = {
            ...current,

            fullName:
                document
                    .getElementById(
                        "profileFullName"
                    )
                    .value
                    .trim(),

            department:
                document
                    .getElementById(
                        "profileDepartment"
                    )
                    .value,

            major:
                document
                    .getElementById(
                        "profileMajor"
                    )
                    .value
                    .trim(),

            academicYear:
                document
                    .getElementById(
                        "profileAcademicYear"
                    )
                    .value,

            semester:
                document
                    .getElementById(
                        "profileSemester"
                    )
                    .value,

            email:
                document
                    .getElementById(
                        "profileEmail"
                    )
                    .value
                    .trim(),

            completedCredits:
                Math.min(
                    TOTAL_REQUIRED,
                    Math.max(
                        0,
                        Number(
                            document
                                .getElementById(
                                    "profileCreditsField"
                                )
                                .value
                        ) || 0
                    )
                )
        };


        if (!updated.fullName) {

            alert(
                "Full Name cannot be empty."
            );

            return;
        }


        if (!updated.department) {

            alert(
                "Please select your department."
            );

            return;
        }


        /* UPDATE REGISTERED USER */

        const users =
            readJson(
                USERS_KEY,
                []
            );


        const index =
            users.findIndex(user =>
                String(user.studentId) ===
                String(updated.studentId)
            );


        if (index >= 0) {

            users[index] = {
                ...users[index],
                ...updated
            };

        } else {

            users.push(updated);
        }


        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );


        /* UPDATE ACTIVE SESSION */

        const session =
            readJson(
                CURRENT_KEY,
                {}
            );


        const updatedSession = {
            ...session,

            fullName:
                updated.fullName,

            studentId:
                updated.studentId,

            department:
                updated.department,

            academicYear:
                updated.academicYear,

            semester:
                updated.semester,

            major:
                updated.major,

            email:
                updated.email,

            completedCredits:
                updated.completedCredits
        };


        localStorage.setItem(
            CURRENT_KEY,
            JSON.stringify(
                updatedSession
            )
        );


        setEditMode(false);

        renderProfile();


        const message =
            document.getElementById(
                "profileSaveMessage"
            );

        if (message) {

            message.textContent =
                "Profile saved successfully.";

            setTimeout(() => {

                message.textContent = "";

            }, 2500);
        }


        /*
            app.js loaded before profile.js.
            Reload ensures sidebar/topbar immediately
            use the newly saved account information.
        */

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }


    /* =====================================================
       EVENTS
    ===================================================== */

    const editButton =
        document.getElementById(
            "editProfileButton"
        );

    const cancelButton =
        document.getElementById(
            "cancelProfileButton"
        );

    const form =
        document.getElementById(
            "profileForm"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            () => {

                originalData =
                    getCurrentUser();

                setEditMode(true);
            }
        );
    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            () => {

                setEditMode(false);
                renderProfile();
            }
        );
    }


    if (form) {

        form.addEventListener(
            "submit",
            saveProfile
        );
    }



    /* =====================================================
       PROFILE PHOTO SYSTEM
    ===================================================== */

    function getProfilePhotoKey() {

        const user = getCurrentUser();

        if (!user || !user.studentId) {
            return null;
        }

        return "ksuSmartPlanProfilePhoto_" + user.studentId;
    }


    function loadProfilePhoto() {

        const key = getProfilePhotoKey();

        const photo =
            document.getElementById("profilePhoto");

        const avatar =
            document.getElementById("profileAvatar");

        const removeButton =
            document.getElementById("removeProfilePhoto");

        if (!key || !photo || !avatar) {
            return;
        }

        const savedPhoto =
            localStorage.getItem(key);

        if (savedPhoto) {

            photo.src = savedPhoto;
            photo.hidden = false;

            avatar.hidden = true;

            if (removeButton) {
                removeButton.hidden = false;
            }

        } else {

            photo.removeAttribute("src");
            photo.hidden = true;

            avatar.hidden = false;

            if (removeButton) {
                removeButton.hidden = true;
            }
        }
    }


    function saveProfilePhoto(file) {

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {

            alert(
                "Please choose a JPG, PNG or WebP image."
            );

            return;
        }

        if (file.size > 2 * 1024 * 1024) {

            alert(
                "Please choose an image smaller than 2 MB."
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onload = function (event) {

            const key =
                getProfilePhotoKey();

            if (!key) {
                return;
            }

            try {

                localStorage.setItem(
                    key,
                    event.target.result
                );

                loadProfilePhoto();

            } catch (error) {

                console.error(
                    "Profile photo save failed:",
                    error
                );

                alert(
                    "The image could not be saved. Please use a smaller image."
                );
            }
        };

        reader.readAsDataURL(file);
    }


    function deleteProfilePhoto() {

        const key =
            getProfilePhotoKey();

        if (!key) {
            return;
        }

        localStorage.removeItem(key);

        loadProfilePhoto();
    }


    function initializeProfilePhoto() {

        const input =
            document.getElementById(
                "profilePhotoInput"
            );

        const changeButton =
            document.getElementById(
                "changeProfilePhoto"
            );

        const removeButton =
            document.getElementById(
                "removeProfilePhoto"
            );


        if (changeButton && input) {

            changeButton.addEventListener(
                "click",
                function () {
                    input.click();
                }
            );
        }


        if (input) {

            input.addEventListener(
                "change",
                function () {

                    const file =
                        input.files &&
                        input.files[0];

                    saveProfilePhoto(file);

                    input.value = "";
                }
            );
        }


        if (removeButton) {

            removeButton.addEventListener(
                "click",
                deleteProfilePhoto
            );
        }


        loadProfilePhoto();
    }

    /* =====================================================
       START
    ===================================================== */

    setEditMode(false);
    renderProfile();
    initializeProfilePhoto();

});



