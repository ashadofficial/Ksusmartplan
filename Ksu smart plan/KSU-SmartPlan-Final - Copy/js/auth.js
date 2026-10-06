document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

const passwordButtons = document.querySelectorAll(".password-toggle");

passwordButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId = button.dataset.target;

        if (!targetId) {
            return;
        }

        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) {
            return;
        }

        const passwordIsHidden =
            passwordInput.type === "password";

        if (passwordIsHidden) {

            passwordInput.type = "text";

            button.textContent = "Hide";

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            button.textContent = "Show";

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});


    // =====================================================
    // REGISTER
    // =====================================================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // -------------------------------------------------
            // GET FORM VALUES
            // -------------------------------------------------

            const fullName =
                document.getElementById("fullName").value.trim();

            const studentId =
                document.getElementById("registerStudentId").value.trim();

            const department =
                document.getElementById("department").value;

            const academicYear =
                document.getElementById("academicYear").value;

            const semester =
                document.getElementById("semester").value;

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms");


            // -------------------------------------------------
            // VALIDATION
            // -------------------------------------------------

            if (
                !fullName ||
                !studentId ||
                !department ||
                !academicYear ||
                !semester ||
                !password ||
                !confirmPassword
            ) {

                alert("Please fill in all required fields.");
                return;

            }


            // Student ID must contain numbers only

            if (!/^\d+$/.test(studentId)) {

                alert("Student ID must contain numbers only.");
                return;

            }


            // Password minimum length

            if (password.length < 6) {

                alert("Password must be at least 6 characters.");
                return;

            }


            // Password matching

            if (password !== confirmPassword) {

                alert("Passwords do not match.");
                return;

            }


            // Terms

            if (!terms.checked) {

                alert("Please agree to the Terms & Conditions.");
                return;

            }



            // -------------------------------------------------
            // LOAD EXISTING USERS
            // -------------------------------------------------

            let users = [];

            try {

                users =
                    JSON.parse(
                        localStorage.getItem("ksuSmartPlanUsers")
                    ) || [];

            } catch (error) {

                users = [];

            }



            // -------------------------------------------------
            // CHECK DUPLICATE STUDENT ID
            // -------------------------------------------------

            const existingUser = users.find(function (user) {

                return user.studentId === studentId;

            });


            if (existingUser) {

                alert(
                    "An account with this Student ID already exists."
                );

                return;

            }



            // -------------------------------------------------
            // CREATE USER
            // -------------------------------------------------

            const newUser = {

                fullName: fullName,

                studentId: studentId,

                department: department,

                academicYear: academicYear,

                semester: semester,

                password: password,

                completedCredits: 0,

                plannedCourses: [],

                grades: [],

                createdAt: new Date().toISOString()

            };



            // -------------------------------------------------
            // SAVE USER
            // -------------------------------------------------

            users.push(newUser);

            localStorage.setItem(
                "ksuSmartPlanUsers",
                JSON.stringify(users)
            );



            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            alert(
                "Account created successfully! Please sign in."
            );


            window.location.href = "index.html";

        });

    }



    // =====================================================
    // LOGIN
    // =====================================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /*
             * Login IDs will be connected to the existing
             * index.html structure.
             */

            const studentIdInput =
                document.getElementById("studentId") ||
                document.getElementById("loginStudentId");

            const passwordInput =
                document.getElementById("password") ||
                document.getElementById("loginPassword");


            if (!studentIdInput || !passwordInput) {

                console.error(
                    "Login input fields could not be found."
                );

                return;

            }


            const studentId =
                studentIdInput.value.trim();

            const password =
                passwordInput.value;


            if (!studentId || !password) {

                alert(
                    "Please enter your Student ID and password."
                );

                return;

            }



            // -------------------------------------------------
            // LOAD USERS
            // -------------------------------------------------

            let users = [];

            try {

                users =
                    JSON.parse(
                        localStorage.getItem("ksuSmartPlanUsers")
                    ) || [];

            } catch (error) {

                users = [];

            }



            // -------------------------------------------------
            // FIND USER
            // -------------------------------------------------

            const user = users.find(function (account) {

                return (
                    account.studentId === studentId &&
                    account.password === password
                );

            });



            if (!user) {

                alert(
                    "Invalid Student ID or password."
                );

                return;

            }



            // -------------------------------------------------
            // CURRENT USER SESSION
            // -------------------------------------------------

            const currentUser = {

                fullName: user.fullName,

                studentId: user.studentId,

                department: user.department,

                academicYear: user.academicYear,

                semester: user.semester,

                completedCredits:
                    user.completedCredits || 0

            };


            localStorage.setItem(
                "ksuSmartPlanCurrentUser",
                JSON.stringify(currentUser)
            );



            // -------------------------------------------------
            // REMEMBER ME
            // -------------------------------------------------

            const rememberMe =
                document.getElementById("rememberMe");


            if (rememberMe && rememberMe.checked) {

                localStorage.setItem(
                    "ksuSmartPlanRememberedStudent",
                    studentId
                );

            } else {

                localStorage.removeItem(
                    "ksuSmartPlanRememberedStudent"
                );

            }



            // -------------------------------------------------
            // DASHBOARD
            // -------------------------------------------------

            window.location.href = "dashboard.html";

        });

    }



    // =====================================================
    // REMEMBERED STUDENT ID
    // =====================================================

    const rememberedStudent =
        localStorage.getItem(
            "ksuSmartPlanRememberedStudent"
        );


    if (rememberedStudent) {

        const studentIdInput =
            document.getElementById("studentId") ||
            document.getElementById("loginStudentId");


        const rememberMe =
            document.getElementById("rememberMe");


        if (studentIdInput) {

            studentIdInput.value =
                rememberedStudent;

        }


        if (rememberMe) {

            rememberMe.checked = true;

        }

    }

    // =====================================================
// FORGOT / RESET PASSWORD
// =====================================================

const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const studentId =
            document.getElementById("resetStudentId").value.trim();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("resetConfirmPassword").value;


        // -----------------------------
        // BASIC VALIDATION
        // -----------------------------

        if (!studentId || !newPassword || !confirmPassword) {

            alert("Please fill in all required fields.");
            return;

        }


        if (!/^\d+$/.test(studentId)) {

            alert("Student ID must contain numbers only.");
            return;

        }


        if (newPassword.length < 6) {

            alert("Password must be at least 6 characters.");
            return;

        }


        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }


        // -----------------------------
        // LOAD REGISTERED USERS
        // -----------------------------

        let users = [];

        try {

            users =
                JSON.parse(
                    localStorage.getItem("ksuSmartPlanUsers")
                ) || [];

        } catch (error) {

            users = [];

        }


        // -----------------------------
        // FIND STUDENT ACCOUNT
        // -----------------------------

        const userIndex = users.findIndex(function (user) {

            return user.studentId === studentId;

        });


        if (userIndex === -1) {

            alert("No account was found with this Student ID.");
            return;

        }


        // -----------------------------
        // PREVENT SAME PASSWORD
        // -----------------------------

        if (users[userIndex].password === newPassword) {

            alert("Please choose a password different from your current password.");
            return;

        }


        // -----------------------------
        // UPDATE PASSWORD
        // -----------------------------

        users[userIndex].password = newPassword;

        users[userIndex].passwordUpdatedAt =
            new Date().toISOString();


        localStorage.setItem(
            "ksuSmartPlanUsers",
            JSON.stringify(users)
        );


        // -----------------------------
        // FINISH
        // -----------------------------

        alert(
            "Password reset successfully! Please sign in with your new password."
        );

        window.location.href = "index.html";

    });

}
});