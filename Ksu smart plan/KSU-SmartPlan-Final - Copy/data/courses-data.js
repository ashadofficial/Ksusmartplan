/* =========================================================
   KSU SMARTPLAN — FALL 2026 COURSE DATA
   Source: KSU Global College Fall 2026 Guidebook

   Structure:
   Department -> Grade -> Semester -> Category -> Course

   IMPORTANT:
   - Only source-listed courses are included.
   - Different sections remain separate.
   - "(New professor)" is preserved.
   - Generated schedules are DEMO schedules only.
========================================================= */

"use strict";


/* =========================================================
   1. CONSTANTS
========================================================= */

const SEMESTER = "Fall 2026";

const DEPARTMENTS = Object.freeze({
    GLOBAL: "Global College",
    BUSINESS: "Global Business Administration",
    HOSPITALITY: "Global Hospitality Management",
    KOREAN: "Global Korean Studies",
    MECHANICAL: "Global Mechanical Design Engineering",
    IT: "Global IT Engineering"
});

const CATEGORIES = Object.freeze({
    BASIC_GENERAL: "Basic General Education",
    ELECTIVE_GENERAL: "Elective General Education",
    BASIC_UNDERGRADUATE: "Basic Undergraduate",
    ENGINEERING_BASIC: "Engineering Basic",
    MAJOR: "Major"
});


/* =========================================================
   2. KSU DAYS
========================================================= */

const KSU_DAYS = Object.freeze([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
]);


/* =========================================================
   3. NORMAL DEMO PERIODS

   Period 5 = lunch break.
   Therefore generated schedules NEVER use period 5.

   NOTE:
   Source-listed online courses using periods 13/14 are
   preserved separately as source timetable data.
========================================================= */

const KSU_PERIODS = Object.freeze({
    1:  { start: "08:00", end: "08:50" },
    2:  { start: "09:00", end: "09:50" },
    3:  { start: "10:00", end: "10:50" },
    4:  { start: "11:00", end: "11:50" },

    5:  { start: "12:00", end: "12:50", lunch: true },

    6:  { start: "13:00", end: "13:50" },
    7:  { start: "14:00", end: "14:50" },
    8:  { start: "15:00", end: "15:50" },
    9:  { start: "16:00", end: "16:50" },
    10: { start: "17:00", end: "17:50" },
    11: { start: "18:00", end: "18:50" },
    12: { start: "19:00", end: "19:50" }
});


/* =========================================================
   4. VALID GENERATED BLOCKS
========================================================= */

const KSU_BLOCKS = Object.freeze({
    1: [
        [1], [2], [3], [4],
        [6], [7], [8], [9], [10], [11], [12]
    ],

    2: [
        [1, 2],
        [2, 3],
        [3, 4],

        [6, 7],
        [7, 8],
        [8, 9],
        [9, 10],
        [10, 11],
        [11, 12]
    ],

    3: [
        [1, 2, 3],
        [2, 3, 4],

        [6, 7, 8],
        [7, 8, 9],
        [8, 9, 10],
        [9, 10, 11],
        [10, 11, 12]
    ]
});


/* =========================================================
   5. COURSE FACTORY
========================================================= */

function course({
    code,
    name,
    department = DEPARTMENTS.GLOBAL,
    grade = null,
    category,
    credits,
    professor = "New professor",
    sourceSchedule = null,
    online = false,
    cell = false,
    kiip = false,
    subSemester = null,
    eligibility = null,
    notes = null
}) {
    return {
        code,
        name,
        department,
        grade,
        semester: SEMESTER,
        category,
        credits,
        professor,

        sourceSchedule,
        schedule: sourceSchedule ? [sourceSchedule] : [],

        online,
        cell,
        kiip,
        subSemester,
        eligibility,
        notes,

        scheduleType: sourceSchedule ? "SOURCE" : "DEMO_PENDING"
    };
}


/* =========================================================
   6. COURSE DATABASE
========================================================= */

const KSU_COURSES = [


/* =========================================================
   BASIC GENERAL EDUCATION
========================================================= */

course({
    code: "QY025001",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2,
    professor: "Min Sang-Hi"
}),

course({
    code: "QY025002",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2,
    professor: "Min Sang-Hi"
}),

course({
    code: "QY025003",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY025004",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY025005",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY025006",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY025007",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY025008",
    name: "Korean Speaking & Listening(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),


course({
    code: "QY031001",
    name: "Korean Reading and Writing(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2,
    professor: "Min Sang-Hi"
}),

course({
    code: "QY031002",
    name: "Korean Reading and Writing(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY031003",
    name: "Korean Reading and Writing(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY031004",
    name: "Korean Reading and Writing(2)",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),


course({
    code: "QY032019",
    name: "Korean Vocabulary and Grammar",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),

course({
    code: "QY032020",
    name: "Korean Vocabulary and Grammar",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2
}),


course({
    code: "QY022001",
    name: "Korean Manners & Customs",
    category: CATEGORIES.BASIC_GENERAL,
    credits: 2,
    professor: "Wang Jue",
    online: true,
    notes: "Capacity: 200 students. Entirely online."
}),


/* =========================================================
   ELECTIVE GENERAL EDUCATION — CELL
========================================================= */

course({
    code: "NB068001",
    name: "Air Transportation: Laws, Regulators and Associations",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Laleesha Angelee Chamberlain",
    cell: true,
    subSemester: 1,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),

course({
    code: "NB069001",
    name: "Destination Marketing",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Nathaniel Aaron Saul",
    cell: true,
    subSemester: 1,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),

course({
    code: "NB070001",
    name: "Introduction to MICE Industry and Destinations",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Sandy Kyunghwa Nam-Jo",
    cell: true,
    subSemester: 1,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),

course({
    code: "NB120001",
    name: "Global Culture & Manner",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "BAN, HYUNJEONG",
    cell: true,
    subSemester: 1,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),

course({
    code: "NB144001",
    name: "Generative AI Applications",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Suresh Alapati",
    cell: true,
    subSemester: 2,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),

course({
    code: "NB145001",
    name: "Fundamentals of the Internet of Things and its Applications",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Pham Trung Hieu",
    cell: true,
    subSemester: 2,
    notes: "CELL; taught in English; P/N grading; capacity 100."
}),


/* Korean-language CELL with English subtitles */

course({
    code: "NB138002",
    name: "비즈니스를통해배우는 미래사회의10대기술",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Hwang In-Seob",
    cell: true,
    subSemester: 3,
    notes: "CELL; Korean-language course with English subtitles."
}),

course({
    code: "NB140002",
    name: "피부과학과화장품학개론",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Yong-Jin Kwon",
    cell: true,
    subSemester: 3,
    notes: "CELL; Korean-language course with English subtitles."
}),

course({
    code: "NB141002",
    name: "명작으로보는세계사진사",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Lee, Jaegu",
    cell: true,
    subSemester: 3,
    notes: "CELL; Korean-language course with English subtitles."
}),

course({
    code: "NB142002",
    name: "인체생리에맞는자기관리",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "YOUNG GUN ZO",
    cell: true,
    subSemester: 3,
    notes: "CELL; Korean-language course with English subtitles."
}),

course({
    code: "NB143002",
    name: "한국의맛,세계를향하다",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 1,
    professor: "Kim, Sung Ok",
    cell: true,
    subSemester: 3,
    notes: "CELL; Korean-language course with English subtitles."
}),


/* =========================================================
   ELECTIVE GENERAL EDUCATION — 100% ONLINE

   IMPORTANT:
   13/14 below are preserved exactly from the supplied
   source. They are NOT generated KSU_PERIODS.
========================================================= */

course({
    code: "YP740001",
    name: "Next Generation Vehicles",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Suresh Alapati",
    online: true,

    sourceSchedule: {
        day: "Thursday",
        periods: [13, 14],
        sourceText: "Thu 13,14"
    }
}),

course({
    code: "YP797001",
    name: "TOPIK I Reading Practice and Strategies",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "KIM JEE YOUNG",
    online: true,

    sourceSchedule: {
        day: "Wednesday",
        periods: [13, 14],
        sourceText: "Wed 13,14"
    }
}),

course({
    code: "YP803001",
    name: "TOPIK I Listening Practice and Strategies",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "KIM JEE YOUNG",
    online: true,

    sourceSchedule: {
        day: "Monday",
        periods: [13, 14],
        sourceText: "Mon 13,14"
    }
}),


/* =========================================================
   ELECTIVE GENERAL EDUCATION — GLOBAL COLLEGE
========================================================= */

course({
    code: "YP241001",
    name: "BASIC KOREAN READING(1) / 초급한국어읽기(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP243001",
    name: "BASIC KOREAN CONVERSATION(1) / 초급한국어회화(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP587001",
    name: "Sustainable Tourism",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "YP588001",
    name: "Introduction to New And Renewable Energy Technology",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Julfikhsan Ahmad Mukhti"
}),

course({
    code: "YP589001",
    name: "Introduction to Digital Transformation Industry 4.0",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP590001",
    name: "Startup Businesses Planning",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Joeffrey Calimag"
}),

course({
    code: "YP635001",
    name: "Coffee&Culture",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "CHO JA YEON"
}),

course({
    code: "YP637001",
    name: "Introduction to Programming",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP638001",
    name: "Energy Storage Solutions",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Grace Firsta Lukman"
}),

course({
    code: "YP639001",
    name: "Introduction to Financial Accounting",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Dandach Ghiwa"
}),

course({
    code: "YP641001",
    name: "Green Business",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "JAVIER HERRERA"
}),

course({
    code: "YP656001",
    name: "Global Awareness and Current Issues",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP657001",
    name: "Online Reputation Management",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "RIANMAHARDHIKA"
}),

course({
    code: "YP658001",
    name: "General Physics",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Suresh Alapati"
}),

course({
    code: "YP659001",
    name: "Entrepreneurship",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Sakshi Chhabra"
}),

course({
    code: "YP660001",
    name: "Electricity-Attractive and practical concepts",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Abrar Siddique"
}),

course({
    code: "YP661001",
    name: "College life guidance for foreign students / 외국인유학생을위한한국사회문화읽기",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "HUH WOOK"
}),

course({
    code: "YP661002",
    name: "College life guidance for foreign students / 외국인유학생을위한한국사회문화읽기",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "HUH WOOK"
}),

course({
    code: "YP662001",
    name: "Korean society and basic law / 외국인유학생을위한한국법의이해",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "HUH WOOK"
}),


/* =========================================================
   ELECTIVE GENERAL EDUCATION — LIBERAL ARTS COLLEGE
========================================================= */

course({
    code: "YP672001",
    name: "Introduction to 2D Game Design and Development",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP673001",
    name: "Major Events In Recent Korean History",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Lee Sae Beul"
}),

course({
    code: "YP718001",
    name: "Business Communication in Hospitality",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "YP768001",
    name: "Global Governance & International Organizations",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP769001",
    name: "Viral Marketing and Media Dynamics",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP770001",
    name: "Chapel for International Students",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2,
    professor: "Santosh Kumar Bardhan"
}),

course({
    code: "YP994001",
    name: "Introduction To Computer Science / 컴퓨터개론",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),

course({
    code: "YP996002",
    name: "Practical Service Korean / 실무서비스한국어",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: 2
}),


/* =========================================================
   FIRST PART END

   DO NOT CLOSE KSU_COURSES YET.
   The next part continues directly here.
========================================================= */
/* =========================================================
   PART 2
   KIIP + GLOBAL BUSINESS ADMINISTRATION
========================================================= */


/* =========================================================
   KOREA IMMIGRATION & INTEGRATION PROGRAM (KIIP)

   IMPORTANT:
   Source gives TOTAL credits for each registration set,
   not individual credits for each course.

   Therefore:
   credits = null
   setTotalCredits = official total from source
========================================================= */


/* ---------- LEVEL 0+1 : SET 1 ---------- */

course({
    code: "YP798001",
    name: "한국어와한국문화입문",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 1. Register all 3 courses. Set total: 7 credits."
}),

course({
    code: "YP799001",
    name: "한국어와한국문화기초(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 1. Register all 3 courses. Set total: 7 credits."
}),

course({
    code: "YP800001",
    name: "한국어와한국문화기초(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 1. Register all 3 courses. Set total: 7 credits."
}),


/* ---------- LEVEL 0+1 : SET 2 ---------- */

course({
    code: "YP798002",
    name: "한국어와한국문화입문",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 2. Register all 3 courses. Set total: 7 credits."
}),

course({
    code: "YP799002",
    name: "한국어와한국문화기초(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 2. Register all 3 courses. Set total: 7 credits."
}),

course({
    code: "YP800002",
    name: "한국어와한국문화기초(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    notes: "KIIP Level 0+1 — Set 2. Register all 3 courses. Set total: 7 credits."
}),


/* ---------- KIIP LEVEL 2 ---------- */

course({
    code: "YP825003",
    name: "한국어와한국문화초급(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 1 or higher, or KIIP Level 1+",
    notes: "KIIP Level 2. Register both courses. Set total: 6 credits."
}),

course({
    code: "YP826003",
    name: "한국어와한국문화초급(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 1 or higher, or KIIP Level 1+",
    notes: "KIIP Level 2. Register both courses. Set total: 6 credits."
}),


/* ---------- KIIP LEVEL 3 ---------- */

course({
    code: "YP827001",
    name: "한국어와한국문화중급(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 2 or higher, or KIIP Level 2+",
    notes: "KIIP Level 3. Register both courses. Set total: 6 credits."
}),

course({
    code: "YP828001",
    name: "한국어와한국문화중급(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 2 or higher, or KIIP Level 2+",
    notes: "KIIP Level 3. Register both courses. Set total: 6 credits."
}),


/* ---------- KIIP LEVEL 4 ---------- */

course({
    code: "YP801001",
    name: "한국어와한국문화고급(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 3 or higher, or KIIP Level 3+",
    notes: "KIIP Level 4. Register both courses. Set total: 6 credits."
}),

course({
    code: "YP802001",
    name: "한국어와한국문화고급(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 3 or higher, or KIIP Level 3+",
    notes: "KIIP Level 4. Register both courses. Set total: 6 credits."
}),


/* ---------- KIIP LEVEL 5 ---------- */

course({
    code: "YP663001",
    name: "한국사회이해(1)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 4 or higher, or KIIP Level 4+",
    notes: "KIIP Level 5. Register both courses. Set total: 4 credits."
}),

course({
    code: "YP665001",
    name: "한국사회이해(2)",
    category: CATEGORIES.ELECTIVE_GENERAL,
    credits: null,
    kiip: true,
    eligibility: "TOPIK Level 4 or higher, or KIIP Level 4+",
    notes: "KIIP Level 5. Register both courses. Set total: 4 credits."
}),


/* =========================================================
   GLOBAL BUSINESS ADMINISTRATION
========================================================= */


/* =========================================================
   GRADE 1 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ005007",
    name: "Service Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "KIM KYU RI"
}),

course({
    code: "SJ006007",
    name: "한국문화개론",
    department: DEPARTMENTS.BUSINESS,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),


/* =========================================================
   GRADE 2 — MAJOR
========================================================= */


/* ---------- Management Information Systems ---------- */

course({
    code: "OA208001",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
}),

course({
    code: "OA208002",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
}),

course({
    code: "OA208003",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
}),

course({
    code: "OA208004",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA208005",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA208006",
    name: "Management Information Systems",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Principles of Marketing ---------- */

course({
    code: "OA209001",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Dandach Ghiwa"
}),

course({
    code: "OA209002",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Dandach Ghiwa"
}),

course({
    code: "OA209003",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Kim Bo Kyeong"
}),

course({
    code: "OA209004",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KIM KYU RI"
}),

course({
    code: "OA209005",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA209006",
    name: "Principles of Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Sustainable Management ---------- */

course({
    code: "OA211001",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Ihsan Ullah Jan"
}),

course({
    code: "OA211002",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Ihsan Ullah Jan"
}),

course({
    code: "OA211003",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA211004",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA211005",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA211006",
    name: "Sustainable Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Human Resources Management ---------- */

course({
    code: "OA212001",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KUMKUM JAISWAL"
}),

course({
    code: "OA212002",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KUMKUM JAISWAL"
}),

course({
    code: "OA212003",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Si Thu Phyo"
}),

course({
    code: "OA212004",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Si Thu Phyo"
}),

course({
    code: "OA212005",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA212006",
    name: "Human Resources Management [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Applied Business Statistics ---------- */

course({
    code: "OA215001",
    name: "Applied Business Statistics [NEW, LAB, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Yi Junsub"
}),

course({
    code: "OA215002",
    name: "Applied Business Statistics [NEW, LAB, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Yi Junsub"
}),

course({
    code: "OA215003",
    name: "Applied Business Statistics [NEW, LAB, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Alessandro Vesprini"
}),

course({
    code: "OA215004",
    name: "Applied Business Statistics [NEW, LAB, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Alessandro Vesprini"
}),


/* =========================================================
   GRADE 3 — MAJOR
========================================================= */


/* ---------- Organization Theory ---------- */

course({
    code: "OA305001",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA305002",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA305003",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA305004",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA305005",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA305006",
    name: "Organization Theory",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Service Operations Management ---------- */

course({
    code: "OA307001",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA307002",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA307003",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jesse MP Cull"
}),

course({
    code: "OA307004",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA307005",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA307006",
    name: "Service Operations Management",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Digital Marketing ---------- */

course({
    code: "OA309001",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sakshi Chhabra"
}),

course({
    code: "OA309002",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "ACHARYA SRIJANA"
}),

course({
    code: "OA309003",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA309004",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "ACHARYA SRIJANA"
}),

course({
    code: "OA309005",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
}),

course({
    code: "OA309006",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
}),

course({
    code: "OA309007",
    name: "Digital Marketing [K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* =========================================================
   GRADE 4 — MAJOR
========================================================= */


/* ---------- Distribution and Supply Chain Management ---------- */

course({
    code: "OA404001",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Javier Herrera Del Cid"
}),

course({
    code: "OA404002",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Javier Herrera Del Cid"
}),

course({
    code: "OA404003",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Javier Herrera Del Cid"
}),

course({
    code: "OA404004",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA404005",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA404006",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA404007",
    name: "Distribution and Supply Chain Management [Revised]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- International Business (Capstone Design) ---------- */

course({
    code: "OA406001",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sakshi Chhabra"
}),

course({
    code: "OA406002",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OA406003",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "RIANMAHARDHIKA"
}),

course({
    code: "OA406004",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "RIANMAHARDHIKA"
}),

course({
    code: "OA406005",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "JOEFFREY CALIMAG"
}),

course({
    code: "OA406006",
    name: "International Business (Capstone Design)",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "JOEFFREY CALIMAG"
}),


/* ---------- Business Internship & Career Readiness ---------- */

course({
    code: "OA407001",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Kim Bo Kyeong"
}),

course({
    code: "OA407002",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Kim Bo Kyeong"
}),

course({
    code: "OA407003",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Lee Sae Beul"
}),

course({
    code: "OA407004",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Lee Sae Beul"
}),

course({
    code: "OA407005",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Wang Jue"
}),

course({
    code: "OA407006",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Wang Jue"
}),

course({
    code: "OA407007",
    name: "Business Internship & Career Readiness [NEW, K-MEGA MD]",
    department: DEPARTMENTS.BUSINESS,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Ihsan Ullah Jan"
}),


/* =========================================================
   PART 2 END

   KSU_COURSES IS STILL OPEN.
   DO NOT ADD ];
========================================================= */
/* =========================================================
   PART 3
   GLOBAL HOSPITALITY MANAGEMENT
   + GLOBAL KOREAN STUDIES
========================================================= */


/* =========================================================
   GLOBAL HOSPITALITY MANAGEMENT
========================================================= */


/* =========================================================
   GRADE 1 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ005011",
    name: "Service Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "SJ006011",
    name: "한국문화개론",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "SIMON SHINY"
}),


/* =========================================================
   GRADE 2 — MAJOR
========================================================= */


/* ---------- Introduction to Hotel Management ---------- */

course({
    code: "OB206001",
    name: "Introduction to Hotel Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
}),

course({
    code: "OB206002",
    name: "Introduction to Hotel Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
}),


/* ---------- Hotel Front Office Management ---------- */

course({
    code: "OB207001",
    name: "Hotel Front Office Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "BAN, HYUNJEONG"
}),

course({
    code: "OB207002",
    name: "Hotel Front Office Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "BAN, HYUNJEONG"
}),

course({
    code: "OB207003",
    name: "Hotel Front Office Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "SHRESTHA SHARAN HARI"
}),


/* ---------- Coffee Barista Practice ---------- */

course({
    code: "OB210001",
    name: "Coffee Barista Practice [Practical]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "CHO JA YEON"
}),

course({
    code: "OB210002",
    name: "Coffee Barista Practice [Practical]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "CHO JA YEON"
}),

course({
    code: "OB210003",
    name: "Coffee Barista Practice [Practical]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "JUNG DAE SUNG"
}),

course({
    code: "OB210004",
    name: "Coffee Barista Practice [Practical]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "JUNG DAE SUNG"
}),


/* ---------- Introduction to Tourism Management ---------- */

course({
    code: "OB212001",
    name: "Introduction to Tourism Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Seieun Kim"
}),

course({
    code: "OB212002",
    name: "Introduction to Tourism Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Seieun Kim"
}),

course({
    code: "OB212003",
    name: "Introduction to Tourism Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Seieun Kim"
}),


/* ---------- Corporate Social Responsibility in Hospitality ---------- */

course({
    code: "OB213001",
    name: "Corporate Social Responsibility in Hospitality",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
}),

course({
    code: "OB213002",
    name: "Corporate Social Responsibility in Hospitality",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
}),

course({
    code: "OB213003",
    name: "Corporate Social Responsibility in Hospitality",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
}),


/* =========================================================
   GRADE 3 — MAJOR
========================================================= */


/* ---------- Hospitality Human Resource Management ---------- */

course({
    code: "OB306001",
    name: "Hospitality Human Resource Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
}),

course({
    code: "OB306002",
    name: "Hospitality Human Resource Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
}),

course({
    code: "OB306003",
    name: "Hospitality Human Resource Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
}),

course({
    code: "OB306004",
    name: "Hospitality Human Resource Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
}),

course({
    code: "OB306005",
    name: "Hospitality Human Resource Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
}),


/* ---------- Hotel Sales & Promotion ---------- */

course({
    code: "OB307001",
    name: "Hotel Sales & Promotion [K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "WANG NINGBO"
}),

course({
    code: "OB307002",
    name: "Hotel Sales & Promotion [K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "WANG NINGBO"
}),

course({
    code: "OB307003",
    name: "Hotel Sales & Promotion [K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "WANG NINGBO"
}),

course({
    code: "OB307004",
    name: "Hotel Sales & Promotion [K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Hospitality Strategic Management ---------- */

course({
    code: "OB309001",
    name: "Hospitality Strategic Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "OB309002",
    name: "Hospitality Strategic Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "OB309003",
    name: "Hospitality Strategic Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Nathaniel Aaron Saul"
}),


/* ---------- Hotel Food & Beverage Management ---------- */

course({
    code: "OB310001",
    name: "Hotel Food & Beverage Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jihhae Shin"
}),

course({
    code: "OB310002",
    name: "Hotel Food & Beverage Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jihhae Shin"
}),

course({
    code: "OB310003",
    name: "Hotel Food & Beverage Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jihhae Shin"
}),

course({
    code: "OB310004",
    name: "Hotel Food & Beverage Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jihhae Shin"
}),

course({
    code: "OB310005",
    name: "Hotel Food & Beverage Management",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Jihhae Shin"
}),


/* ---------- Internship in Hospitality & Tourism Industry ---------- */

course({
    code: "OB312001",
    name: "Internship in Hospitality & Tourism Industry [Practical, K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "ZHANG SIYU"
}),

course({
    code: "OB312002",
    name: "Internship in Hospitality & Tourism Industry [Practical, K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "ZHANG SIYU"
}),

course({
    code: "OB312003",
    name: "Internship in Hospitality & Tourism Industry [Practical, K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "RISWANTO AURA LYDIA"
}),

course({
    code: "OB312004",
    name: "Internship in Hospitality & Tourism Industry [Practical, K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "RISWANTO AURA LYDIA"
}),

course({
    code: "OB312005",
    name: "Internship in Hospitality & Tourism Industry [Practical, K-MEGA MD]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "RISWANTO AURA LYDIA"
}),


/* =========================================================
   GRADE 4 — MAJOR
========================================================= */


/* ---------- Project-based Service Innovation ---------- */

course({
    code: "OB403001",
    name: "Project-based Service Innovation (Capstone Design) [Revised]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
}),

course({
    code: "OB403002",
    name: "Project-based Service Innovation (Capstone Design) [Revised]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
}),

course({
    code: "OB403003",
    name: "Project-based Service Innovation (Capstone Design) [Revised]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
}),

course({
    code: "OB403004",
    name: "Project-based Service Innovation (Capstone Design) [Revised]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OB403005",
    name: "Project-based Service Innovation (Capstone Design) [Revised]",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Seminar in Career Development ---------- */

course({
    code: "OB404001",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KIM GYU LEE"
}),

course({
    code: "OB404002",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KIM GYU LEE"
}),

course({
    code: "OB404003",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KIM GYU LEE"
}),

course({
    code: "OB404004",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Angellie Williady"
}),

course({
    code: "OB404005",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Angellie Williady"
}),

course({
    code: "OB404006",
    name: "Seminar in Career Development",
    department: DEPARTMENTS.HOSPITALITY,
    grade: 4,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* =========================================================
   GLOBAL KOREAN STUDIES
========================================================= */


/* =========================================================
   GRADE 1 — BASIC UNDERGRADUATE

   NOTE:
   The supplied source uses SJ005011 and SJ006011 here too.
   They are preserved exactly as supplied.
========================================================= */

course({
    code: "SJ005011",
    name: "Service Management",
    department: DEPARTMENTS.KOREAN,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "Nathaniel Aaron Saul"
}),

course({
    code: "SJ006011",
    name: "한국문화개론",
    department: DEPARTMENTS.KOREAN,
    grade: 1,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "SIMON SHINY"
}),


/* =========================================================
   MAJOR COURSES — ENGLISH TRACK ONLY
   GRADE 2
========================================================= */

course({
    code: "OC201002",
    name: "Understanding of Korean History [K-MEGA MD]",
    department: DEPARTMENTS.KOREAN,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "YI MINA CHO",
    notes: "English Track"
}),

course({
    code: "OC213002",
    name: "Korean for Workplace Practice I [New]",
    department: DEPARTMENTS.KOREAN,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Amarjargal Dagvadorj",
    notes: "English Track"
}),

course({
    code: "OC214002",
    name: "Korean Communication and Comprehension II [New]",
    department: DEPARTMENTS.KOREAN,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "PENG YILIN",
    notes: "English Track"
}),


/* =========================================================
   MAJOR COURSES — ENGLISH TRACK ONLY
   GRADE 3
========================================================= */

course({
    code: "OC308002",
    name: "K-Culture Tourism Interpretation [Revised, K-MEGA MD]",
    department: DEPARTMENTS.KOREAN,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "YI MINA CHO",
    notes: "English Track"
}),

course({
    code: "OC318002",
    name: "Korean Discussion and Presentation II [New]",
    department: DEPARTMENTS.KOREAN,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "YI MINA CHO",
    notes: "English Track"
}),

course({
    code: "OC319002",
    name: "Strategies and Mock Tests for TOPIK [New]",
    department: DEPARTMENTS.KOREAN,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "KIM JEE YOUNG",
    notes: "English Track"
}),


/* =========================================================
   GLOBAL KOREAN STUDIES — GRADE 4

   No Grade 4 course list is shown in the supplied
   Fall 2026 source. Nothing is invented here.
========================================================= */


/* =========================================================
   PART 3 END

   KSU_COURSES IS STILL OPEN.
   DO NOT ADD ];
========================================================= */
/* =========================================================
   PART 4
   GLOBAL MECHANICAL DESIGN ENGINEERING
   + GLOBAL IT ENGINEERING
========================================================= */


/* =========================================================
   GLOBAL MECHANICAL DESIGN ENGINEERING
========================================================= */


/* =========================================================
   GRADE 1 — MAJOR
========================================================= */

course({
    code: "OD103003",
    name: "Material Science",
    department: DEPARTMENTS.MECHANICAL,
    grade: 1,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Tran Le Hai"
}),


/* =========================================================
   GRADE 1 — ENGINEERING BASIC
========================================================= */

course({
    code: "SN149006",
    name: "Electricity and Electronics Basics",
    department: DEPARTMENTS.MECHANICAL,
    grade: 1,
    category: CATEGORIES.ENGINEERING_BASIC,
    credits: 3
}),

course({
    code: "SN150006",
    name: "Engineering Mathematics",
    department: DEPARTMENTS.MECHANICAL,
    grade: 1,
    category: CATEGORIES.ENGINEERING_BASIC,
    credits: 3
}),


/* =========================================================
   GRADE 2 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ013001",
    name: "Engineering Programming (LAB)",
    department: DEPARTMENTS.MECHANICAL,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),

course({
    code: "SJ017001",
    name: "Smart Factory Basics",
    department: DEPARTMENTS.MECHANICAL,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),


/* =========================================================
   GRADE 2 — MAJOR
========================================================= */

course({
    code: "OD204001",
    name: "3D CAD 2 (LAB)",
    department: DEPARTMENTS.MECHANICAL,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Suresh Alapati"
}),

course({
    code: "OD205001",
    name: "Thermodynamics",
    department: DEPARTMENTS.MECHANICAL,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Alireza Aslani"
}),

course({
    code: "OD206001",
    name: "Solid Mechanics",
    department: DEPARTMENTS.MECHANICAL,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "BAYE MISGANAW AB-EBE"
}),


/* =========================================================
   GRADE 3 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ015001",
    name: "Capstone Design 1",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "Kim Mirae"
}),


/* =========================================================
   GRADE 3 — MAJOR
========================================================= */

course({
    code: "OD306001",
    name: "Heat and Mass Transfer",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Alireza Aslani"
}),

course({
    code: "OD307001",
    name: "Control Engineering (LAB, Robot MD)",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OD308001",
    name: "Mechanical Design (LAB, Robot MD)",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "BAYE MISGANAW AB-EBE"
}),

course({
    code: "OD311001",
    name: "CAE applications",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Alireza Aslani"
}),

course({
    code: "OD312001",
    name: "HVAC Systems Design",
    department: DEPARTMENTS.MECHANICAL,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Suresh Alapati"
}),


/* =========================================================
   GLOBAL MECHANICAL DESIGN ENGINEERING — GRADE 4

   No Grade 4 course list is shown in the supplied
   Fall 2026 source.
========================================================= */


/* =========================================================
   GLOBAL IT ENGINEERING
========================================================= */


/* =========================================================
   GRADE 1 — MAJOR
========================================================= */

course({
    code: "OE102004",
    name: "Introduction to Computer Science and Programming (Revised)",
    department: DEPARTMENTS.IT,
    grade: 1,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* =========================================================
   GRADE 1 — ENGINEERING BASIC
========================================================= */

course({
    code: "SN149004",
    name: "Electricity and Electronics Basics",
    department: DEPARTMENTS.IT,
    grade: 1,
    category: CATEGORIES.ENGINEERING_BASIC,
    credits: 3
}),

course({
    code: "SN150004",
    name: "Engineering Mathematics",
    department: DEPARTMENTS.IT,
    grade: 1,
    category: CATEGORIES.ENGINEERING_BASIC,
    credits: 3,
    professor: "Abrar Siddique"
}),


/* =========================================================
   GRADE 2 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ013002",
    name: "Engineering Programming (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),

course({
    code: "SJ013003",
    name: "Engineering Programming (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),

course({
    code: "SJ017002",
    name: "Smart Factory Basics",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),

course({
    code: "SJ017003",
    name: "Smart Factory Basics",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),


/* =========================================================
   GRADE 2 — MAJOR
========================================================= */


/* ---------- Web Design Fundamentals ---------- */

course({
    code: "OE205001",
    name: "Web Design Fundamentals (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE205002",
    name: "Web Design Fundamentals (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Julfikhsan Ahmad Mukhti"
}),

course({
    code: "OE205003",
    name: "Web Design Fundamentals (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Operating Systems and Systems Programming ---------- */

course({
    code: "OE206001",
    name: "Operating Systems and Systems Programming",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Mulomba christian mukendi"
}),

course({
    code: "OE206002",
    name: "Operating Systems and Systems Programming",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Mulomba christian mukendi"
}),

course({
    code: "OE206003",
    name: "Operating Systems and Systems Programming",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Mulomba christian mukendi"
}),


/* ---------- Applied Data Science ---------- */

course({
    code: "OE207001",
    name: "Applied Data Science (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Julfikhsan Ahmad Mukhti"
}),

course({
    code: "OE207002",
    name: "Applied Data Science (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Julfikhsan Ahmad Mukhti"
}),

course({
    code: "OE207003",
    name: "Applied Data Science (LAB)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Julfikhsan Ahmad Mukhti"
}),


/* ---------- IoT and Edge Computing ---------- */

course({
    code: "OE209001",
    name: "Introduction to The Internet of Things (IoT) and Edge Computing (NEW)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE209002",
    name: "Introduction to The Internet of Things (IoT) and Edge Computing (NEW)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE209003",
    name: "Introduction to The Internet of Things (IoT) and Edge Computing (NEW)",
    department: DEPARTMENTS.IT,
    grade: 2,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* =========================================================
   GRADE 3 — BASIC UNDERGRADUATE
========================================================= */

course({
    code: "SJ015002",
    name: "Capstone Design 1 (Practice)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "DELWAR TAHESIN SAMIRA"
}),

course({
    code: "SJ015003",
    name: "Capstone Design 1 (Practice)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "Abrar Siddique"
}),

course({
    code: "SJ015005",
    name: "Capstone Design 1 (Practice)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3
}),

course({
    code: "SJ015006",
    name: "Capstone Design 1 (Practice)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.BASIC_UNDERGRADUATE,
    credits: 3,
    professor: "Grace Firsta Lukman"
}),


/* =========================================================
   GRADE 3 — MAJOR
========================================================= */


/* ---------- Machine Learning with Applications ---------- */

course({
    code: "OE305001",
    name: "Machine Learning with Applications (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Foroozossadat Tabatabaee"
}),

course({
    code: "OE305002",
    name: "Machine Learning with Applications (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Foroozossadat Tabatabaee"
}),

course({
    code: "OE305003",
    name: "Machine Learning with Applications (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Foroozossadat Tabatabaee"
}),


/* ---------- Computer Networks and the Internet ---------- */

course({
    code: "OE306001",
    name: "Computer Networks and the Internet",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "DELWAR TAHESIN SAMIRA"
}),

course({
    code: "OE306002",
    name: "Computer Networks and the Internet",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "DELWAR TAHESIN SAMIRA"
}),

course({
    code: "OE306003",
    name: "Computer Networks and the Internet",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "DELWAR TAHESIN SAMIRA"
}),


/* ---------- Computer Security ---------- */

course({
    code: "OE307001",
    name: "Computer Security",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Foroozossadat Tabatabaee"
}),

course({
    code: "OE307002",
    name: "Computer Security",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE307003",
    name: "Computer Security",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Computer Vision ---------- */

course({
    code: "OE308001",
    name: "Computer Vision",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE308002",
    name: "Computer Vision",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),

course({
    code: "OE308003",
    name: "Computer Vision",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3
}),


/* ---------- Mobile App Programming ---------- */

course({
    code: "OE309001",
    name: "Mobile App Programming (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Pham Trung Hieu"
}),

course({
    code: "OE309002",
    name: "Mobile App Programming (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Pham Trung Hieu"
}),

course({
    code: "OE309003",
    name: "Mobile App Programming (LAB)",
    department: DEPARTMENTS.IT,
    grade: 3,
    category: CATEGORIES.MAJOR,
    credits: 3,
    professor: "Pham Trung Hieu"
}),


/* =========================================================
   GLOBAL IT ENGINEERING — GRADE 4

   No Grade 4 course list is shown in the supplied
   Fall 2026 source.
========================================================= */


/* =========================================================
   PART 4 END

   IMPORTANT:
   All department course data from the supplied source
   has now been entered.

   DO NOT CLOSE KSU_COURSES YET.

   FINAL PART will add:
   - array closing
   - academic requirements
   - demo schedule generator
   - professor conflict prevention
   - grouping functions
   - validation
   - browser exports
========================================================= */
/* =========================================================
   PART 5 — FINAL
   CLOSE DATABASE + REQUIREMENTS + SCHEDULE GENERATOR
   + GROUPING + VALIDATION + BROWSER EXPORT
========================================================= */


/* =========================================================
   7. CLOSE COURSE DATABASE
========================================================= */

];


/* =========================================================
   8. ACADEMIC REQUIREMENTS

   These are requirement values stated in the supplied
   Fall 2026 source.

   NOTE:
   Elective General Education:
   - after 2023 entry: 14 credits
   - before 2022 entry: 12 credits

   The supplied text does not specify the value for every
   possible entry-year case between those statements,
   therefore this file does not invent one.
========================================================= */

const KSU_ACADEMIC_REQUIREMENTS = Object.freeze({

    GLOBAL_STUDIES: Object.freeze({
        basicGeneralEducation: 14,
        basicUndergraduate: 12,
        majorMinimum: 54,
        graduationMinimum: 130,

        electiveGeneralEducation: Object.freeze({
            after2023: 14,
            before2022: 12
        })
    }),

    GLOBAL_ENGINEERING: Object.freeze({
        basicGeneralEducation: 14,
        engineeringBasic: 12,
        basicUndergraduate: 18,
        majorMinimum: 54,
        graduationMinimum: 130,

        notes: Object.freeze([
            "All Basic Undergraduate courses must be taken.",
            "All Engineering Basic courses must be taken."
        ])
    })

});


/* =========================================================
   9. DEPARTMENT -> SCHOOL MAPPING
========================================================= */

const KSU_DEPARTMENT_SCHOOL = Object.freeze({

    [DEPARTMENTS.BUSINESS]: "School of Global Studies",
    [DEPARTMENTS.HOSPITALITY]: "School of Global Studies",
    [DEPARTMENTS.KOREAN]: "School of Global Studies",

    [DEPARTMENTS.MECHANICAL]: "School of Global Engineering",
    [DEPARTMENTS.IT]: "School of Global Engineering",

    [DEPARTMENTS.GLOBAL]: "Global College"
});


/* =========================================================
   10. SCHEDULE HELPERS
========================================================= */

function normalizeProfessorName(name) {
    return String(name || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}


function isUnknownProfessor(name) {
    const value = normalizeProfessorName(name);

    return (
        value === "" ||
        value === "new professor" ||
        value === "(new professor)"
    );
}


function getBlockForCredits(credits) {

    if (!Number.isFinite(credits)) {
        return null;
    }

    if (!KSU_BLOCKS[credits]) {
        return null;
    }

    return KSU_BLOCKS[credits];
}


function scheduleKey(day, period) {
    return `${day}::${period}`;
}


function professorScheduleKey(professor, day, period) {
    return `${normalizeProfessorName(professor)}::${day}::${period}`;
}


/* =========================================================
   11. DETERMINISTIC HASH

   This prevents the generated timetable from changing
   randomly every time the browser reloads.
========================================================= */

function courseCodeHash(text) {

    const value = String(text || "");

    let hash = 0;

    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }

    return Math.abs(hash);
}


/* =========================================================
   12. PROFESSOR OCCUPANCY

   IMPORTANT:
   Only NAMED professors are checked.

   "New professor" is NOT treated as one real person because
   the source does not identify those professors.
========================================================= */

const KSU_PROFESSOR_OCCUPANCY = new Set();


function professorIsFree(professor, day, periods) {

    if (isUnknownProfessor(professor)) {
        return true;
    }

    return periods.every(period => {
        const key = professorScheduleKey(
            professor,
            day,
            period
        );

        return !KSU_PROFESSOR_OCCUPANCY.has(key);
    });
}


function reserveProfessor(professor, day, periods) {

    if (isUnknownProfessor(professor)) {
        return;
    }

    periods.forEach(period => {

        const key = professorScheduleKey(
            professor,
            day,
            period
        );

        KSU_PROFESSOR_OCCUPANCY.add(key);
    });
}


/* =========================================================
   13. REGISTER SOURCE SCHEDULES FIRST

   Example:
   YP740001 -> Thu 13,14
   YP797001 -> Wed 13,14
   YP803001 -> Mon 13,14

   These are source schedules and are never replaced by
   generated schedules.
========================================================= */

function registerSourceSchedules() {

    KSU_COURSES.forEach(courseItem => {

        if (!courseItem.sourceSchedule) {
            return;
        }

        const source = courseItem.sourceSchedule;

        if (
            !source.day ||
            !Array.isArray(source.periods)
        ) {
            return;
        }

        reserveProfessor(
            courseItem.professor,
            source.day,
            source.periods
        );
    });
}


/* =========================================================
   14. BUILD DEMO SCHEDULE OBJECT
========================================================= */

function buildDemoSchedule(day, periods) {

    const firstPeriod = periods[0];
    const lastPeriod = periods[periods.length - 1];

    const first = KSU_PERIODS[firstPeriod];
    const last = KSU_PERIODS[lastPeriod];

    return {
        day,
        periods: [...periods],

        startPeriod: firstPeriod,
        endPeriod: lastPeriod,

        start: first ? first.start : null,
        end: last ? last.end : null,

        building: "TBA",
        room: "TBA",

        generated: true
    };
}


/* =========================================================
   15. GENERATE ONE COURSE SCHEDULE
========================================================= */

function generateCourseSchedule(courseItem) {

    /* ---------------------------------------------
       Preserve official/source schedule
    --------------------------------------------- */

    if (courseItem.sourceSchedule) {

        courseItem.schedule = [
            {
                ...courseItem.sourceSchedule,
                generated: false
            }
        ];

        courseItem.scheduleType = "SOURCE";

        return;
    }


    /* ---------------------------------------------
       KIIP

       Supplied source does not provide individual
       course credits/day/time in the extracted text.

       Therefore we DO NOT invent schedules here.
    --------------------------------------------- */

    if (courseItem.kiip) {

        courseItem.schedule = [];
        courseItem.scheduleType = "SOURCE_NOT_PROVIDED";

        return;
    }


    /* ---------------------------------------------
       Valid credits required
    --------------------------------------------- */

    const blocks = getBlockForCredits(courseItem.credits);

    if (!blocks) {

        courseItem.schedule = [];
        courseItem.scheduleType = "UNSCHEDULED";

        return;
    }


    /* ---------------------------------------------
       Deterministic starting positions
    --------------------------------------------- */

    const seed = courseCodeHash(courseItem.code);

    const dayStart =
        seed % KSU_DAYS.length;

    const blockStart =
        Math.floor(seed / KSU_DAYS.length) %
        blocks.length;


    /* ---------------------------------------------
       Search for professor-conflict-free slot
    --------------------------------------------- */

    for (
        let dayOffset = 0;
        dayOffset < KSU_DAYS.length;
        dayOffset++
    ) {

        const day =
            KSU_DAYS[
                (dayStart + dayOffset) %
                KSU_DAYS.length
            ];


        for (
            let blockOffset = 0;
            blockOffset < blocks.length;
            blockOffset++
        ) {

            const periods =
                blocks[
                    (blockStart + blockOffset) %
                    blocks.length
                ];


            if (
                professorIsFree(
                    courseItem.professor,
                    day,
                    periods
                )
            ) {

                courseItem.schedule = [
                    buildDemoSchedule(
                        day,
                        periods
                    )
                ];

                courseItem.scheduleType =
                    "DEMO_GENERATED";


                reserveProfessor(
                    courseItem.professor,
                    day,
                    periods
                );

                return;
            }
        }
    }


    /* ---------------------------------------------
       Could not find professor-safe slot
    --------------------------------------------- */

    courseItem.schedule = [];
    courseItem.scheduleType =
        "DEMO_UNAVAILABLE";
}


/* =========================================================
   16. GENERATE ALL DEMO SCHEDULES
========================================================= */

function generateAllSchedules() {

    KSU_PROFESSOR_OCCUPANCY.clear();

    registerSourceSchedules();


    /*
       Named-professor courses are processed first.

       This gives professor conflict prevention priority
       before "New professor" entries are generated.
    */

    const namedProfessorCourses =
        KSU_COURSES.filter(courseItem =>
            !courseItem.sourceSchedule &&
            !courseItem.kiip &&
            !isUnknownProfessor(courseItem.professor)
        );


    const unknownProfessorCourses =
        KSU_COURSES.filter(courseItem =>
            !courseItem.sourceSchedule &&
            !courseItem.kiip &&
            isUnknownProfessor(courseItem.professor)
        );


    namedProfessorCourses.forEach(
        generateCourseSchedule
    );


    unknownProfessorCourses.forEach(
        generateCourseSchedule
    );


    /*
       Source schedules are restored last so they are
       guaranteed to remain untouched.
    */

    KSU_COURSES
        .filter(courseItem =>
            courseItem.sourceSchedule
        )
        .forEach(generateCourseSchedule);


    /*
       KIIP entries remain without invented timetable.
    */

    KSU_COURSES
        .filter(courseItem =>
            courseItem.kiip
        )
        .forEach(generateCourseSchedule);
}


/* =========================================================
   17. COURSE SEARCH HELPERS
========================================================= */

function getCourseByCode(code) {

    return KSU_COURSES.find(courseItem =>
        courseItem.code === code
    ) || null;
}


function getCoursesByDepartment(department) {

    return KSU_COURSES.filter(courseItem =>
        courseItem.department === department
    );
}


function getCoursesByGrade(grade) {

    return KSU_COURSES.filter(courseItem =>
        courseItem.grade === Number(grade)
    );
}


function getCoursesByCategory(category) {

    return KSU_COURSES.filter(courseItem =>
        courseItem.category === category
    );
}


function getCoursesByDepartmentAndGrade(
    department,
    grade
) {

    return KSU_COURSES.filter(courseItem =>

        courseItem.department === department &&

        courseItem.grade === Number(grade)
    );
}


/* =========================================================
   18. GENERAL EDUCATION HELPERS
========================================================= */

function getBasicGeneralEducationCourses() {

    return KSU_COURSES.filter(courseItem =>
        courseItem.category ===
        CATEGORIES.BASIC_GENERAL
    );
}


function getElectiveGeneralEducationCourses() {

    return KSU_COURSES.filter(courseItem =>
        courseItem.category ===
        CATEGORIES.ELECTIVE_GENERAL
    );
}


function getEngineeringBasicCourses(department = null) {

    return KSU_COURSES.filter(courseItem => {

        if (
            courseItem.category !==
            CATEGORIES.ENGINEERING_BASIC
        ) {
            return false;
        }

        if (!department) {
            return true;
        }

        return courseItem.department === department;
    });
}


/* =========================================================
   19. GROUPING

   Final hierarchy:

   Department
       -> Grade
           -> Semester
               -> Category
                   -> Courses
========================================================= */

function buildGroupedCourseData() {

    const grouped = {};


    KSU_COURSES.forEach(courseItem => {

        const department =
            courseItem.department ||
            DEPARTMENTS.GLOBAL;


        const grade =
            courseItem.grade === null
                ? "All"
                : String(courseItem.grade);


        const semester =
            courseItem.semester;


        const category =
            courseItem.category;


        if (!grouped[department]) {
            grouped[department] = {};
        }


        if (!grouped[department][grade]) {
            grouped[department][grade] = {};
        }


        if (
            !grouped[department][grade][semester]
        ) {
            grouped[department][grade][semester] = {};
        }


        if (
            !grouped[department][grade]
                [semester][category]
        ) {
            grouped[department][grade]
                [semester][category] = [];
        }


        grouped[department][grade]
            [semester][category]
            .push(courseItem);
    });


    return grouped;
}


/* =========================================================
   20. USER-FRIENDLY FILTER
========================================================= */

function filterCourses({
    department = null,
    grade = null,
    category = null,
    search = ""
} = {}) {

    const searchText =
        String(search)
            .trim()
            .toLowerCase();


    return KSU_COURSES.filter(courseItem => {

        if (
            department &&
            courseItem.department !== department
        ) {
            return false;
        }


        if (
            grade !== null &&
            grade !== "" &&
            courseItem.grade !== Number(grade)
        ) {
            return false;
        }


        if (
            category &&
            courseItem.category !== category
        ) {
            return false;
        }


        if (searchText) {

            const searchable = [
                courseItem.code,
                courseItem.name,
                courseItem.professor,
                courseItem.department,
                courseItem.category
            ]
                .join(" ")
                .toLowerCase();


            if (!searchable.includes(searchText)) {
                return false;
            }
        }


        return true;
    });
}


/* =========================================================
   21. STUDENT TIMETABLE CONFLICT CHECK

   This is different from PROFESSOR conflict prevention.

   This function checks whether two courses selected by
   a student overlap.
========================================================= */

function schedulesOverlap(scheduleA, scheduleB) {

    if (!scheduleA || !scheduleB) {
        return false;
    }


    if (scheduleA.day !== scheduleB.day) {
        return false;
    }


    if (
        !Array.isArray(scheduleA.periods) ||
        !Array.isArray(scheduleB.periods)
    ) {
        return false;
    }


    return scheduleA.periods.some(period =>
        scheduleB.periods.includes(period)
    );
}


function coursesConflict(courseA, courseB) {

    if (!courseA || !courseB) {
        return false;
    }


    const schedulesA =
        Array.isArray(courseA.schedule)
            ? courseA.schedule
            : [];


    const schedulesB =
        Array.isArray(courseB.schedule)
            ? courseB.schedule
            : [];


    return schedulesA.some(scheduleA =>
        schedulesB.some(scheduleB =>
            schedulesOverlap(
                scheduleA,
                scheduleB
            )
        )
    );
}


/* =========================================================
   22. FIND CONFLICTS IN SELECTED COURSE CODES
========================================================= */

function findSelectedCourseConflicts(courseCodes) {

    const selected = courseCodes
        .map(getCourseByCode)
        .filter(Boolean);


    const conflicts = [];


    for (let i = 0; i < selected.length; i++) {

        for (
            let j = i + 1;
            j < selected.length;
            j++
        ) {

            if (
                coursesConflict(
                    selected[i],
                    selected[j]
                )
            ) {

                conflicts.push({
                    courseA: selected[i],
                    courseB: selected[j]
                });
            }
        }
    }


    return conflicts;
}


/* =========================================================
   23. VALIDATION — DUPLICATE COURSE CODES

   IMPORTANT:
   Same source code can appear under different departments
   in the supplied data (for example SJ005011/SJ006011).

   Therefore duplicate CODE alone is not automatically
   treated as invalid.

   Unique record identity:
   department + code
========================================================= */

function validateDuplicateRecords() {

    const seen = new Set();
    const duplicates = [];


    KSU_COURSES.forEach(courseItem => {

        const key =
            `${courseItem.department}::${courseItem.code}`;


        if (seen.has(key)) {
            duplicates.push(key);
        } else {
            seen.add(key);
        }
    });


    return duplicates;
}


/* =========================================================
   24. VALIDATION — ENGINEERING BASIC
========================================================= */

function validateEngineeringBasicDepartments() {

    const allowed = new Set([
        DEPARTMENTS.MECHANICAL,
        DEPARTMENTS.IT
    ]);


    return KSU_COURSES.filter(courseItem =>

        courseItem.category ===
        CATEGORIES.ENGINEERING_BASIC &&

        !allowed.has(courseItem.department)
    );
}


/* =========================================================
   25. VALIDATION — GENERATED LUNCH BREAK

   Generated schedules must never contain period 5.
========================================================= */

function validateGeneratedLunchBreak() {

    return KSU_COURSES.filter(courseItem =>

        courseItem.scheduleType ===
        "DEMO_GENERATED" &&

        courseItem.schedule.some(schedule =>
            schedule.periods.includes(5)
        )
    );
}


/* =========================================================
   26. VALIDATION — NAMED PROFESSOR CONFLICTS
========================================================= */

function validateProfessorConflicts() {

    const conflicts = [];


    for (
        let i = 0;
        i < KSU_COURSES.length;
        i++
    ) {

        const courseA = KSU_COURSES[i];


        if (
            isUnknownProfessor(
                courseA.professor
            )
        ) {
            continue;
        }


        for (
            let j = i + 1;
            j < KSU_COURSES.length;
            j++
        ) {

            const courseB = KSU_COURSES[j];


            if (
                normalizeProfessorName(
                    courseA.professor
                ) !==
                normalizeProfessorName(
                    courseB.professor
                )
            ) {
                continue;
            }


            if (
                coursesConflict(
                    courseA,
                    courseB
                )
            ) {

                conflicts.push({
                    professor:
                        courseA.professor,

                    courseA:
                        courseA.code,

                    courseB:
                        courseB.code
                });
            }
        }
    }


    return conflicts;
}


/* =========================================================
   27. VALIDATION — REQUIRED FIELDS
========================================================= */

function validateRequiredFields() {

    return KSU_COURSES.filter(courseItem =>

        !courseItem.code ||
        !courseItem.name ||
        !courseItem.department ||
        !courseItem.category
    );
}


/* =========================================================
   28. RUN FULL VALIDATION
========================================================= */

function validateKSUData() {

    const duplicateRecords =
        validateDuplicateRecords();


    const invalidEngineeringBasic =
        validateEngineeringBasicDepartments();


    const lunchBreakErrors =
        validateGeneratedLunchBreak();


    const professorConflicts =
        validateProfessorConflicts();


    const missingRequiredFields =
        validateRequiredFields();


    return {

        courseCount:
            KSU_COURSES.length,

        duplicateRecords,

        invalidEngineeringBasic,

        lunchBreakErrors,

        professorConflicts,

        missingRequiredFields,

        valid:
            duplicateRecords.length === 0 &&
            invalidEngineeringBasic.length === 0 &&
            lunchBreakErrors.length === 0 &&
            professorConflicts.length === 0 &&
            missingRequiredFields.length === 0
    };
}


/* =========================================================
   29. INITIALIZE
========================================================= */

generateAllSchedules();


const KSU_GROUPED_COURSES =
    buildGroupedCourseData();


const KSU_DATA_VALIDATION =
    validateKSUData();


/* =========================================================
   30. DEVELOPMENT CONSOLE OUTPUT
========================================================= */

console.log(
    `[KSU SmartPlan] Loaded ${KSU_COURSES.length} Fall 2026 course records.`
);


if (KSU_DATA_VALIDATION.valid) {

    console.log(
        "[KSU SmartPlan] Course data validation: PASS"
    );

} else {

    console.warn(
        "[KSU SmartPlan] Course data validation found issues:",
        KSU_DATA_VALIDATION
    );
}


/* =========================================================
   31. BROWSER EXPORTS

   app.js can access these through window.*
========================================================= */

if (typeof window !== "undefined") {

    window.KSU_COURSES =
        KSU_COURSES;


    window.KSU_GROUPED_COURSES =
        KSU_GROUPED_COURSES;


    window.KSU_DEPARTMENTS =
        DEPARTMENTS;


    window.KSU_CATEGORIES =
        CATEGORIES;


    window.KSU_DAYS =
        KSU_DAYS;


    window.KSU_PERIODS =
        KSU_PERIODS;


    window.KSU_ACADEMIC_REQUIREMENTS =
        KSU_ACADEMIC_REQUIREMENTS;


    window.KSU_DEPARTMENT_SCHOOL =
        KSU_DEPARTMENT_SCHOOL;


    window.KSU_DATA_VALIDATION =
        KSU_DATA_VALIDATION;


    window.getCourseByCode =
        getCourseByCode;


    window.getCoursesByDepartment =
        getCoursesByDepartment;


    window.getCoursesByGrade =
        getCoursesByGrade;


    window.getCoursesByCategory =
        getCoursesByCategory;


    window.getCoursesByDepartmentAndGrade =
        getCoursesByDepartmentAndGrade;


    window.getBasicGeneralEducationCourses =
        getBasicGeneralEducationCourses;


    window.getElectiveGeneralEducationCourses =
        getElectiveGeneralEducationCourses;


    window.getEngineeringBasicCourses =
        getEngineeringBasicCourses;


    window.filterCourses =
        filterCourses;


    window.coursesConflict =
        coursesConflict;


    window.findSelectedCourseConflicts =
        findSelectedCourseConflicts;
}


/* =========================================================
   END OF KSU SMARTPLAN FALL 2026 COURSE DATABASE
========================================================= */
