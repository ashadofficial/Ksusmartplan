/* =========================================================
   KSU SMARTPLAN - FALL 2026 COURSE DATABASE

   Academic data source:
   Kyungsung University Global College
   Fall 2026 Course Registration Guide

   IMPORTANT
   - Course information = PDF data
   - Schedule = generated for KSU SmartPlan demonstration
   - Semester = Fall / 2nd Semester
========================================================= */

"use strict";

/* =========================================================
   1. DEPARTMENTS
========================================================= */

const KSU_DEPARTMENTS = [
    "Global IT Engineering",
    "Global Mechanical Design Engineering",
    "Global Business Administration",
    "Global Hospitality Management",
    "Global Korean Studies"
];

const DEPARTMENTS = {
    IT: "Global IT Engineering",
    MECHANICAL: "Global Mechanical Design Engineering",
    BUSINESS: "Global Business Administration",
    HOSPITALITY: "Global Hospitality Management",
    KOREAN: "Global Korean Studies"
};


/* =========================================================
   2. KSU PERIOD SYSTEM
   Period 05 is intentionally unavailable.
========================================================= */

const KSU_PERIODS = {
    1:  { start: "08:00", end: "08:50" },
    2:  { start: "09:00", end: "09:50" },
    3:  { start: "10:00", end: "10:50" },
    4:  { start: "11:00", end: "11:50" },

    6:  { start: "13:00", end: "13:50" },
    7:  { start: "14:00", end: "14:50" },
    8:  { start: "15:00", end: "15:50" },
    9:  { start: "16:00", end: "16:50" },
    10: { start: "17:00", end: "17:50" },
    11: { start: "18:00", end: "18:50" },
    12: { start: "19:00", end: "19:50" },
    13: { start: "20:00", end: "20:50" },
    14: { start: "21:00", end: "21:50" }
};

const KSU_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];


/* =========================================================
   3. COURSE DATA
========================================================= */


function course(code, name, department, grade, category, credits, professor = null, extra = {}) {
    return {
        code: code,
        name: name,
        department: department,
        grade: grade,
        category: category,
        credits: credits,
        professor: professor,
        deliveryType: extra.deliveryType || "Regular",
        semester: extra.semester || null,
        lab: extra.lab || false,
        officialSchedule: extra.officialSchedule || null,
        schedule: null,
        ...extra
    };
}
const KSU_COURSES = [

    /* =====================================================
       GLOBAL IT ENGINEERING
       ===================================================== */

    /* ---------- 1ST YEAR ---------- */

    {
        code: "OE102004",
        name: "Introduction to Computer Science and Programming",
        department: "Global IT Engineering",
        grade: 1,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SN149004",
        name: "Electricity and Electronics Basics",
        department: "Global IT Engineering",
        grade: 1,
        semester: 2,
        category: "Engineering Basic",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SN150004",
        name: "Engineering Mathematics",
        department: "Global IT Engineering",
        grade: 1,
        semester: 2,
        category: "Engineering Basic",
        credits: 3,
        professor: "Abrar Siddique"
    },


    /* ---------- 2ND YEAR : BASIC UNDERGRADUATE ---------- */

    {
        code: "SJ013002",
        name: "Engineering Programming (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ013003",
        name: "Engineering Programming (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ017002",
        name: "Smart Factory Basics",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ017003",
        name: "Smart Factory Basics",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },


    /* ---------- 2ND YEAR : MAJOR ---------- */

    {
        code: "OE205001",
        name: "Web Design Fundamentals (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE205002",
        name: "Web Design Fundamentals (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Julfikhsan Ahmad Mukhti"
    },

    {
        code: "OE205003",
        name: "Web Design Fundamentals (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE206001",
        name: "Operating Systems and Systems Programming",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Mulomba Christian Mukendi"
    },

    {
        code: "OE206002",
        name: "Operating Systems and Systems Programming",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Mulomba Christian Mukendi"
    },

    {
        code: "OE206003",
        name: "Operating Systems and Systems Programming",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Mulomba Christian Mukendi"
    },

    {
        code: "OE207001",
        name: "Applied Data Science (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Julfikhsan Ahmad Mukhti"
    },

    {
        code: "OE207002",
        name: "Applied Data Science (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Julfikhsan Ahmad Mukhti"
    },

    {
        code: "OE207003",
        name: "Applied Data Science (LAB)",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Julfikhsan Ahmad Mukhti"
    },

    {
        code: "OE209001",
        name: "Introduction to The Internet of Things (IoT) and Edge Computing",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE209002",
        name: "Introduction to The Internet of Things (IoT) and Edge Computing",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE209003",
        name: "Introduction to The Internet of Things (IoT) and Edge Computing",
        department: "Global IT Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },


    /* ---------- 3RD YEAR : BASIC UNDERGRADUATE ---------- */

    {
        code: "SJ015002",
        name: "Capstone Design 1 (Practice)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "DELWAR TAHESIN SAMIRA"
    },

    {
        code: "SJ015003",
        name: "Capstone Design 1 (Practice)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "Abrar Siddique"
    },

    {
        code: "SJ015005",
        name: "Capstone Design 1 (Practice)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ015006",
        name: "Capstone Design 1 (Practice)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "Grace Firsta Lukman"
    },


    /* ---------- 3RD YEAR : MAJOR ---------- */

    {
        code: "OE305001",
        name: "Machine Learning with Applications (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Foroozossadat Tabatabaee"
    },

    {
        code: "OE305002",
        name: "Machine Learning with Applications (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Foroozossadat Tabatabaee"
    },

    {
        code: "OE305003",
        name: "Machine Learning with Applications (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Foroozossadat Tabatabaee"
    },

    {
        code: "OE306001",
        name: "Computer Networks and the Internet",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "DELWAR TAHESIN SAMIRA"
    },

    {
        code: "OE306002",
        name: "Computer Networks and the Internet",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "DELWAR TAHESIN SAMIRA"
    },

    {
        code: "OE306003",
        name: "Computer Networks and the Internet",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "DELWAR TAHESIN SAMIRA"
    },

    {
        code: "OE307001",
        name: "Computer Security",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Foroozossadat Tabatabaee"
    },

    {
        code: "OE307002",
        name: "Computer Security",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE307003",
        name: "Computer Security",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE308001",
        name: "Computer Vision",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE308002",
        name: "Computer Vision",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE308003",
        name: "Computer Vision",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OE309001",
        name: "Mobile App Programming (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Pham Trung Hieu"
    },

    {
        code: "OE309002",
        name: "Mobile App Programming (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Pham Trung Hieu"
    },

    {
        code: "OE309003",
        name: "Mobile App Programming (LAB)",
        department: "Global IT Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Pham Trung Hieu"
    },


    /* =====================================================
       GLOBAL MECHANICAL DESIGN ENGINEERING
       ===================================================== */

    {
        code: "OD103003",
        name: "Material Science",
        department: "Global Mechanical Design Engineering",
        grade: 1,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Tran Le Hai"
    },

    {
        code: "SN149006",
        name: "Electricity and Electronics Basics",
        department: "Global Mechanical Design Engineering",
        grade: 1,
        semester: 2,
        category: "Engineering Basic",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SN150006",
        name: "Engineering Mathematics",
        department: "Global Mechanical Design Engineering",
        grade: 1,
        semester: 2,
        category: "Engineering Basic",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ013001",
        name: "Engineering Programming (LAB)",
        department: "Global Mechanical Design Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "SJ017001",
        name: "Smart Factory Basics",
        department: "Global Mechanical Design Engineering",
        grade: 2,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OD204001",
        name: "3D CAD 2 (LAB)",
        department: "Global Mechanical Design Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Suresh Alapati"
    },

    {
        code: "OD205001",
        name: "Thermodynamics",
        department: "Global Mechanical Design Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Alireza Aslani"
    },

    {
        code: "OD206001",
        name: "Solid Mechanics",
        department: "Global Mechanical Design Engineering",
        grade: 2,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "BAYE MISGANAW AB-EBE"
    },

    {
        code: "SJ015001",
        name: "Capstone Design 1",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Basic Undergraduate",
        credits: 3,
        professor: "Kim Mirae"
    },

    {
        code: "OD306001",
        name: "Heat and Mass Transfer",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Alireza Aslani"
    },

    {
        code: "OD307001",
        name: "Control Engineering (LAB, Robot MD)",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "(New professor)"
    },

    {
        code: "OD308001",
        name: "Mechanical Design (LAB, Robot MD)",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "BAYE MISGANAW AB-EBE"
    },

    {
        code: "OD311001",
        name: "CAE Applications",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Alireza Aslani"
    },

    {
        code: "OD312001",
        name: "HVAC Systems Design",
        department: "Global Mechanical Design Engineering",
        grade: 3,
        semester: 2,
        category: "Major",
        credits: 3,
        professor: "Suresh Alapati"
    },

    /* =====================================================
   GLOBAL BUSINESS ADMINISTRATION
===================================================== */

/* ---------- 1ST YEAR : BASIC UNDERGRADUATE ---------- */

{
    code: "SJ005007",
    name: "Service Management",
    department: "Global Business Administration",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "KIM KYU RI"
},

{
    code: "SJ006007",
    name: "í•œêµ­ë¬¸í™”ê°œë¡ ",
    department: "Global Business Administration",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "(New professor)"
},


/* ---------- 2ND YEAR : MAJOR ---------- */

{
    code: "OA208001",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
},

{
    code: "OA208002",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
},

{
    code: "OA208003",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
},

{
    code: "OA208004",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA208005",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA208006",
    name: "Management Information Systems",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA209001",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Dandach Ghiwa"
},

{
    code: "OA209002",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Dandach Ghiwa"
},

{
    code: "OA209003",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Kim Bo Kyeong"
},

{
    code: "OA209004",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KIM KYU RI"
},

{
    code: "OA209005",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA209006",
    name: "Principles of Marketing",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA211001",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Ihsan Ullah Jan"
},

{
    code: "OA211002",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Ihsan Ullah Jan"
},

{
    code: "OA211003",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA211004",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA211005",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA211006",
    name: "Sustainable Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA212001",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KUMKUM JAISWAL"
},

{
    code: "OA212002",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KUMKUM JAISWAL"
},

{
    code: "OA212003",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Si Thu Phyo"
},

{
    code: "OA212004",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Si Thu Phyo"
},

{
    code: "OA212005",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA212006",
    name: "Human Resources Management",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA215001",
    name: "Applied Business Statistics",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Yi Junsub"
},

{
    code: "OA215002",
    name: "Applied Business Statistics",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Yi Junsub"
},

{
    code: "OA215003",
    name: "Applied Business Statistics",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Alessandro Vesprini"
},

{
    code: "OA215004",
    name: "Applied Business Statistics",
    department: "Global Business Administration",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Alessandro Vesprini"
},


/* ---------- 3RD YEAR : MAJOR ---------- */

{
    code: "OA305001",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA305002",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA305003",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA305004",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA305005",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA305006",
    name: "Organization Theory",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA307001",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA307002",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA307003",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jesse MP Cull"
},

{
    code: "OA307004",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA307005",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA307006",
    name: "Service Operations Management",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA309001",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sakshi Chhabra"
},

{
    code: "OA309002",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "ACHARYA SRIJANA"
},

{
    code: "OA309003",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA309004",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "ACHARYA SRIJANA"
},

{
    code: "OA309005",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
},

{
    code: "OA309006",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Cindy Paola Blanco Rada"
},

{
    code: "OA309007",
    name: "Digital Marketing",
    department: "Global Business Administration",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},


/* ---------- 4TH YEAR : MAJOR ---------- */

{
    code: "OA404001",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Javier Herrera Del Cid"
},

{
    code: "OA404002",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Javier Herrera Del Cid"
},

{
    code: "OA404003",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Javier Herrera Del Cid"
},

{
    code: "OA404004",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA404005",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA404006",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA404007",
    name: "Distribution and Supply Chain Management",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA406001",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sakshi Chhabra"
},

{
    code: "OA406002",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OA406003",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "RIANMAHARDHIKA"
},

{
    code: "OA406004",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "RIANMAHARDHIKA"
},

{
    code: "OA406005",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "JOEFFREY CALIMAG"
},

{
    code: "OA406006",
    name: "International Business (Capstone Design)",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "JOEFFREY CALIMAG"
},

{
    code: "OA407001",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Kim Bo Kyeong"
},

{
    code: "OA407002",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Kim Bo Kyeong"
},

{
    code: "OA407003",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Lee Sae Beul"
},

{
    code: "OA407004",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Lee Sae Beul"
},

{
    code: "OA407005",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Wang Jue"
},

{
    code: "OA407006",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Wang Jue"
},

{
    code: "OA407007",
    name: "Business Internship & Career Readiness",
    department: "Global Business Administration",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Ihsan Ullah Jan"
},

/* =====================================================
   GLOBAL HOSPITALITY MANAGEMENT
===================================================== */


/* ---------- 1ST YEAR : BASIC UNDERGRADUATE ---------- */

{
    code: "SJ005011",
    name: "Service Management",
    department: "Global Hospitality Management",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "Nathaniel Aaron Saul"
},

{
    code: "SJ006011",
    name: "í•œêµ­ë¬¸í™”ê°œë¡ ",
    department: "Global Hospitality Management",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "SIMON SHINY"
},


/* ---------- 2ND YEAR : MAJOR ---------- */

{
    code: "OB206001",
    name: "Introduction to Hotel Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
},

{
    code: "OB206002",
    name: "Introduction to Hotel Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
},

{
    code: "OB207001",
    name: "Hotel Front Office Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "BAN, HYUNJEONG"
},

{
    code: "OB207002",
    name: "Hotel Front Office Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "BAN, HYUNJEONG"
},

{
    code: "OB207003",
    name: "Hotel Front Office Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "SHRESTHA SHARAN HARI"
},

{
    code: "OB210001",
    name: "Coffee Barista Practice",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "CHO JA YEON",
    practical: true
},

{
    code: "OB210002",
    name: "Coffee Barista Practice",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "CHO JA YEON",
    practical: true
},

{
    code: "OB210003",
    name: "Coffee Barista Practice",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "JUNG DAE SUNG",
    practical: true
},

{
    code: "OB210004",
    name: "Coffee Barista Practice",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "JUNG DAE SUNG",
    practical: true
},

{
    code: "OB212001",
    name: "Introduction to Tourism Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Seieun Kim"
},

{
    code: "OB212002",
    name: "Introduction to Tourism Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Seieun Kim"
},

{
    code: "OB212003",
    name: "Introduction to Tourism Management",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Seieun Kim"
},

{
    code: "OB213001",
    name: "Corporate Social Responsibility in Hospitality",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
},

{
    code: "OB213002",
    name: "Corporate Social Responsibility in Hospitality",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
},

{
    code: "OB213003",
    name: "Corporate Social Responsibility in Hospitality",
    department: "Global Hospitality Management",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "MORENO BRITO YAHAIRA LISBETH"
},


/* ---------- 3RD YEAR : MAJOR ---------- */

{
    code: "OB306001",
    name: "Hospitality Human Resource Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
},

{
    code: "OB306002",
    name: "Hospitality Human Resource Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
},

{
    code: "OB306003",
    name: "Hospitality Human Resource Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
},

{
    code: "OB306004",
    name: "Hospitality Human Resource Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
},

{
    code: "OB306005",
    name: "Hospitality Human Resource Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Sandy Kyunghwa Nam-Jo"
},

{
    code: "OB307001",
    name: "Hotel Sales & Promotion",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "WANG NINGBO",
    program: "K-MEGA MD"
},

{
    code: "OB307002",
    name: "Hotel Sales & Promotion",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "WANG NINGBO",
    program: "K-MEGA MD"
},

{
    code: "OB307003",
    name: "Hotel Sales & Promotion",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "WANG NINGBO",
    program: "K-MEGA MD"
},

{
    code: "OB307004",
    name: "Hotel Sales & Promotion",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)",
    program: "K-MEGA MD"
},

{
    code: "OB309001",
    name: "Hospitality Strategic Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Nathaniel Aaron Saul"
},

{
    code: "OB309002",
    name: "Hospitality Strategic Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Nathaniel Aaron Saul"
},

{
    code: "OB309003",
    name: "Hospitality Strategic Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Nathaniel Aaron Saul"
},

{
    code: "OB310001",
    name: "Hotel Food & Beverage Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jihhae Shin"
},

{
    code: "OB310002",
    name: "Hotel Food & Beverage Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jihhae Shin"
},

{
    code: "OB310003",
    name: "Hotel Food & Beverage Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jihhae Shin"
},

{
    code: "OB310004",
    name: "Hotel Food & Beverage Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jihhae Shin"
},

{
    code: "OB310005",
    name: "Hotel Food & Beverage Management",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Jihhae Shin"
},

{
    code: "OB312001",
    name: "Internship in Hospitality & Tourism Industry",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "ZHANG SIYU",
    practical: true,
    program: "K-MEGA MD"
},

{
    code: "OB312002",
    name: "Internship in Hospitality & Tourism Industry",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "ZHANG SIYU",
    practical: true,
    program: "K-MEGA MD"
},

{
    code: "OB312003",
    name: "Internship in Hospitality & Tourism Industry",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "RISWANTO AURA LYDIA",
    practical: true,
    program: "K-MEGA MD"
},

{
    code: "OB312004",
    name: "Internship in Hospitality & Tourism Industry",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "RISWANTO AURA LYDIA",
    practical: true,
    program: "K-MEGA MD"
},

{
    code: "OB312005",
    name: "Internship in Hospitality & Tourism Industry",
    department: "Global Hospitality Management",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "RISWANTO AURA LYDIA",
    practical: true,
    program: "K-MEGA MD"
},

/* =====================================================
   GLOBAL KOREAN STUDIES
===================================================== */


/* ---------- 1ST YEAR : BASIC UNDERGRADUATE ---------- */

{
    code: "SJ005011",
    name: "Service Management",
    department: "Global Korean Studies",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "Nathaniel Aaron Saul"
},

{
    code: "SJ006011",
    name: "í•œêµ­ë¬¸í™”ê°œë¡ ",
    department: "Global Korean Studies",
    grade: 1,
    semester: 2,
    category: "Basic Undergraduate",
    credits: 3,
    professor: "SIMON SHINY"
},


/* ---------- 2ND YEAR : MAJOR â€” ENGLISH TRACK ---------- */

{
    code: "OC201002",
    name: "Understanding of Korean History",
    department: "Global Korean Studies",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "YI MINA CHO",
    track: "English Track",
    program: "K-MEGA MD"
},

{
    code: "OC213002",
    name: "Korean for Workplace Practice I",
    department: "Global Korean Studies",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Amarjargal Dagvadorj",
    track: "English Track"
},

{
    code: "OC214002",
    name: "Korean Communication and Comprehension II",
    department: "Global Korean Studies",
    grade: 2,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "PENG YILIN",
    track: "English Track"
},


/* ---------- 3RD YEAR : MAJOR â€” ENGLISH TRACK ---------- */

{
    code: "OC308002",
    name: "K-Culture Tourism Interpretation",
    department: "Global Korean Studies",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "YI MINA CHO",
    track: "English Track",
    program: "K-MEGA MD"
},

{
    code: "OC318002",
    name: "Korean Discussion and Presentation II",
    department: "Global Korean Studies",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "YI MINA CHO",
    track: "English Track"
},

{
    code: "OC319002",
    name: "Strategies and Mock Tests for TOPIK",
    department: "Global Korean Studies",
    grade: 3,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KIM JEE YOUNG",
    track: "English Track"
},

/* =====================================================
   GLOBAL HOSPITALITY MANAGEMENT
   4TH YEAR : MAJOR
===================================================== */

{
    code: "OB403001",
    name: "Project-based Service Innovation (Capstone Design)",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
},

{
    code: "OB403002",
    name: "Project-based Service Innovation (Capstone Design)",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
},

{
    code: "OB403003",
    name: "Project-based Service Innovation (Capstone Design)",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Laleesha Angelee Chamberlain"
},

{
    code: "OB403004",
    name: "Project-based Service Innovation (Capstone Design)",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OB403005",
    name: "Project-based Service Innovation (Capstone Design)",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

{
    code: "OB404001",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KIM GYU LEE"
},

{
    code: "OB404002",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KIM GYU LEE"
},

{
    code: "OB404003",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "KIM GYU LEE"
},

{
    code: "OB404004",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Angellie Williady"
},

{
    code: "OB404005",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "Angellie Williady"
},

{
    code: "OB404006",
    name: "Seminar in Career Development",
    department: "Global Hospitality Management",
    grade: 4,
    semester: 2,
    category: "Major",
    credits: 3,
    professor: "(New professor)"
},

/* =========================================================
   7. GLOBAL BUSINESS ADMINISTRATION
========================================================= */

// ---------- YEAR 1 : BASIC UNDERGRADUATE ----------

course("SJ005007", "Service Management",
    DEPARTMENTS.BUSINESS, 1, "Basic Undergraduate", 3, "KIM KYU RI"),

course("SJ006007", "í•œêµ­ë¬¸í™”ê°œë¡ ",
    DEPARTMENTS.BUSINESS, 1, "Basic Undergraduate", 3, null),


// ---------- YEAR 2 : MAJOR ----------

course("OA208001", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Cindy Paola Blanco Rada"),

course("OA208002", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Cindy Paola Blanco Rada"),

course("OA208003", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Cindy Paola Blanco Rada"),

course("OA208004", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA208005", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA208006", "Management Information Systems",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA209001", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Dandach Ghiwa",
    { program: "K-MEGA MD" }),

course("OA209002", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Dandach Ghiwa",
    { program: "K-MEGA MD" }),

course("OA209003", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Kim Bo Kyeong",
    { program: "K-MEGA MD" }),

course("OA209004", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "KIM KYU RI",
    { program: "K-MEGA MD" }),

course("OA209005", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null,
    { program: "K-MEGA MD" }),

course("OA209006", "Principles of Marketing",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null,
    { program: "K-MEGA MD" }),

course("OA211001", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Ihsan Ullah Jan"),

course("OA211002", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Ihsan Ullah Jan"),

course("OA211003", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA211004", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA211005", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA211006", "Sustainable Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null),

course("OA212001", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "KUMKUM JAISWAL",
    { program: "K-MEGA MD" }),

course("OA212002", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "KUMKUM JAISWAL",
    { program: "K-MEGA MD" }),

course("OA212003", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Si Thu Phyo",
    { program: "K-MEGA MD" }),

course("OA212004", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Si Thu Phyo",
    { program: "K-MEGA MD" }),

course("OA212005", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null,
    { program: "K-MEGA MD" }),

course("OA212006", "Human Resources Management",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, null,
    { program: "K-MEGA MD" }),

course("OA215001", "Applied Business Statistics",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Yi Junsub",
    { lab: true, program: "K-MEGA MD" }),

course("OA215002", "Applied Business Statistics",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Yi Junsub",
    { lab: true, program: "K-MEGA MD" }),

course("OA215003", "Applied Business Statistics",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Alessandro Vesprini",
    { lab: true, program: "K-MEGA MD" }),

course("OA215004", "Applied Business Statistics",
    DEPARTMENTS.BUSINESS, 2, "Major", 3, "Alessandro Vesprini",
    { lab: true, program: "K-MEGA MD" }),


// ---------- YEAR 3 ----------

course("OA305001", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA305002", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA305003", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA305004", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),
course("OA305005", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),
course("OA305006", "Organization Theory", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),

course("OA307001", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA307002", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA307003", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Jesse MP Cull"),
course("OA307004", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),
course("OA307005", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),
course("OA307006", "Service Operations Management", DEPARTMENTS.BUSINESS, 3, "Major", 3, null),

course("OA309001", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Sakshi Chhabra", { program: "K-MEGA MD" }),
course("OA309002", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, "ACHARYA SRIJANA", { program: "K-MEGA MD" }),
course("OA309003", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, null, { program: "K-MEGA MD" }),
course("OA309004", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, "ACHARYA SRIJANA", { program: "K-MEGA MD" }),
course("OA309005", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Cindy Paola Blanco Rada", { program: "K-MEGA MD" }),
course("OA309006", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, "Cindy Paola Blanco Rada", { program: "K-MEGA MD" }),
course("OA309007", "Digital Marketing", DEPARTMENTS.BUSINESS, 3, "Major", 3, null, { program: "K-MEGA MD" }),


// ---------- YEAR 4 ----------

course("OA404001", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Javier Herrera Del Cid"),
course("OA404002", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Javier Herrera Del Cid"),
course("OA404003", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Javier Herrera Del Cid"),
course("OA404004", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, null),
course("OA404005", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, null),
course("OA404006", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, null),
course("OA404007", "Distribution and Supply Chain Management", DEPARTMENTS.BUSINESS, 4, "Major", 3, null),

course("OA406001", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Sakshi Chhabra"),
course("OA406002", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, null),
course("OA406003", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, "RIANMAHARDHIKA"),
course("OA406004", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, "RIANMAHARDHIKA"),
course("OA406005", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, "JOEFFREY CALIMAG"),
course("OA406006", "International Business (Capstone Design)", DEPARTMENTS.BUSINESS, 4, "Major", 3, "JOEFFREY CALIMAG"),

course("OA407001", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Kim Bo Kyeong", { program: "K-MEGA MD" }),
course("OA407002", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Kim Bo Kyeong", { program: "K-MEGA MD" }),
course("OA407003", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Lee Sae Beul", { program: "K-MEGA MD" }),
course("OA407004", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Lee Sae Beul", { program: "K-MEGA MD" }),
course("OA407005", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Wang Jue", { program: "K-MEGA MD" }),
course("OA407006", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Wang Jue", { program: "K-MEGA MD" }),
course("OA407007", "Business Internship & Career Readiness", DEPARTMENTS.BUSINESS, 4, "Major", 3, "Ihsan Ullah Jan", { program: "K-MEGA MD" }),


/* =========================================================
   8. GLOBAL HOSPITALITY MANAGEMENT
========================================================= */

course("SJ005011", "Service Management", DEPARTMENTS.HOSPITALITY, 1, "Basic Undergraduate", 3, "Nathaniel Aaron Saul"),
course("SJ006011", "í•œêµ­ë¬¸í™”ê°œë¡ ", DEPARTMENTS.HOSPITALITY, 1, "Basic Undergraduate", 3, "SIMON SHINY"),

course("OB206001", "Introduction to Hotel Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "Laleesha Angelee Chamberlain"),
course("OB206002", "Introduction to Hotel Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "Laleesha Angelee Chamberlain"),

course("OB207001", "Hotel Front Office Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "BAN, HYUNJEONG"),
course("OB207002", "Hotel Front Office Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "BAN, HYUNJEONG"),
course("OB207003", "Hotel Front Office Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "SHRESTHA SHARAN HARI"),

course("OB210001", "Coffee Barista Practice", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "CHO JA YEON", { practical: true }),
course("OB210002", "Coffee Barista Practice", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "CHO JA YEON", { practical: true }),
course("OB210003", "Coffee Barista Practice", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "JUNG DAE SUNG", { practical: true }),
course("OB210004", "Coffee Barista Practice", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "JUNG DAE SUNG", { practical: true }),

course("OB212001", "Introduction to Tourism Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "Seieun Kim"),
course("OB212002", "Introduction to Tourism Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "Seieun Kim"),
course("OB212003", "Introduction to Tourism Management", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "Seieun Kim"),

course("OB213001", "Corporate Social Responsibility in Hospitality", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "MORENO BRITO YAHAIRA LISBETH"),
course("OB213002", "Corporate Social Responsibility in Hospitality", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "MORENO BRITO YAHAIRA LISBETH"),
course("OB213003", "Corporate Social Responsibility in Hospitality", DEPARTMENTS.HOSPITALITY, 2, "Major", 3, "MORENO BRITO YAHAIRA LISBETH"),

course("OB306001", "Hospitality Human Resource Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Sandy Kyunghwa Nam-Jo"),
course("OB306002", "Hospitality Human Resource Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Sandy Kyunghwa Nam-Jo"),
course("OB306003", "Hospitality Human Resource Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Sandy Kyunghwa Nam-Jo"),
course("OB306004", "Hospitality Human Resource Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Sandy Kyunghwa Nam-Jo"),
course("OB306005", "Hospitality Human Resource Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Sandy Kyunghwa Nam-Jo"),

course("OB307001", "Hotel Sales & Promotion", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "WANG NINGBO", { program: "K-MEGA MD" }),
course("OB307002", "Hotel Sales & Promotion", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "WANG NINGBO", { program: "K-MEGA MD" }),
course("OB307003", "Hotel Sales & Promotion", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "WANG NINGBO", { program: "K-MEGA MD" }),
course("OB307004", "Hotel Sales & Promotion", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, null, { program: "K-MEGA MD" }),

course("OB309001", "Hospitality Strategic Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Nathaniel Aaron Saul"),
course("OB309002", "Hospitality Strategic Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Nathaniel Aaron Saul"),
course("OB309003", "Hospitality Strategic Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Nathaniel Aaron Saul"),

course("OB310001", "Hotel Food & Beverage Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Jihhae Shin"),
course("OB310002", "Hotel Food & Beverage Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Jihhae Shin"),
course("OB310003", "Hotel Food & Beverage Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Jihhae Shin"),
course("OB310004", "Hotel Food & Beverage Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Jihhae Shin"),
course("OB310005", "Hotel Food & Beverage Management", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "Jihhae Shin"),

course("OB312001", "Internship in Hospitality & Tourism Industry", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "ZHANG SIYU", { practical: true, program: "K-MEGA MD" }),
course("OB312002", "Internship in Hospitality & Tourism Industry", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "ZHANG SIYU", { practical: true, program: "K-MEGA MD" }),
course("OB312003", "Internship in Hospitality & Tourism Industry", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "RISWANTO AURA LYDIA", { practical: true, program: "K-MEGA MD" }),
course("OB312004", "Internship in Hospitality & Tourism Industry", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "RISWANTO AURA LYDIA", { practical: true, program: "K-MEGA MD" }),
course("OB312005", "Internship in Hospitality & Tourism Industry", DEPARTMENTS.HOSPITALITY, 3, "Major", 3, "RISWANTO AURA LYDIA", { practical: true, program: "K-MEGA MD" }),

course("OB403001", "Project-based Service Innovation (Capstone Design)", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "Laleesha Angelee Chamberlain"),
course("OB403002", "Project-based Service Innovation (Capstone Design)", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "Laleesha Angelee Chamberlain"),
course("OB403003", "Project-based Service Innovation (Capstone Design)", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "Laleesha Angelee Chamberlain"),
course("OB403004", "Project-based Service Innovation (Capstone Design)", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, null),
course("OB403005", "Project-based Service Innovation (Capstone Design)", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, null),

course("OB404001", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "KIM GYU LEE"),
course("OB404002", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "KIM GYU LEE"),
course("OB404003", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "KIM GYU LEE"),
course("OB404004", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "Angellie Williady"),
course("OB404005", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, "Angellie Williady"),
course("OB404006", "Seminar in Career Development", DEPARTMENTS.HOSPITALITY, 4, "Major", 3, null),


/* =========================================================
   9. GLOBAL KOREAN STUDIES
========================================================= */

course("SJ005011", "Service Management",
    DEPARTMENTS.KOREAN, 1, "Basic Undergraduate", 3, "Nathaniel Aaron Saul"),

course("SJ006011", "í•œêµ­ë¬¸í™”ê°œë¡ ",
    DEPARTMENTS.KOREAN, 1, "Basic Undergraduate", 3, "SIMON SHINY"),

course("OC201002", "Understanding of Korean History",
    DEPARTMENTS.KOREAN, 2, "Major", 3, "YI MINA CHO",
    { track: "English Track", program: "K-MEGA MD" }),

course("OC213002", "Korean for Workplace Practice I",
    DEPARTMENTS.KOREAN, 2, "Major", 3, "Amarjargal Dagvadorj",
    { track: "English Track" }),

course("OC214002", "Korean Communication and Comprehension II",
    DEPARTMENTS.KOREAN, 2, "Major", 3, "PENG YILIN",
    { track: "English Track" }),

course("OC308002", "K-Culture Tourism Interpretation",
    DEPARTMENTS.KOREAN, 3, "Major", 3, "YI MINA CHO",
    { track: "English Track", program: "K-MEGA MD" }),

course("OC318002", "Korean Discussion and Presentation II",
    DEPARTMENTS.KOREAN, 3, "Major", 3, "YI MINA CHO",
    { track: "English Track" }),

course("OC319002", "Strategies and Mock Tests for TOPIK",
    DEPARTMENTS.KOREAN, 3, "Major", 3, "KIM JEE YOUNG",
    { track: "English Track" }),


/* =========================================================
   10. GLOBAL MECHANICAL DESIGN ENGINEERING
========================================================= */

// YEAR 1

course("OD103003", "Material Science",
    DEPARTMENTS.MECHANICAL, 1, "Major", 3, "Tran Le Hai"),

course("SN149006", "Electricity and Electronics Basics",
    DEPARTMENTS.MECHANICAL, 1, "Engineering Basic", 3, null),

course("SN150006", "Engineering Mathematics",
    DEPARTMENTS.MECHANICAL, 1, "Engineering Basic", 3, null),

// YEAR 2

course("SJ013001", "Engineering Programming (LAB)",
    DEPARTMENTS.MECHANICAL, 2, "Basic Undergraduate", 3, null,
    { lab: true }),

course("SJ017001", "Smart Factory Basics",
    DEPARTMENTS.MECHANICAL, 2, "Basic Undergraduate", 3, null),

course("OD204001", "3D CAD 2 (LAB)",
    DEPARTMENTS.MECHANICAL, 2, "Major", 3, "Suresh Alapati",
    { lab: true }),

course("OD205001", "Thermodynamics",
    DEPARTMENTS.MECHANICAL, 2, "Major", 3, "Alireza Aslani"),

course("OD206001", "Solid Mechanics",
    DEPARTMENTS.MECHANICAL, 2, "Major", 3, "BAYE MISGANAW AB-EBE"),

// YEAR 3

course("SJ015001", "Capstone Design 1",
    DEPARTMENTS.MECHANICAL, 3, "Basic Undergraduate", 3, "Kim Mirae"),

course("OD306001", "Heat and Mass Transfer",
    DEPARTMENTS.MECHANICAL, 3, "Major", 3, "Alireza Aslani"),

course("OD307001", "Control Engineering",
    DEPARTMENTS.MECHANICAL, 3, "Major", 3, null,
    { lab: true, program: "Robot MD" }),

course("OD308001", "Mechanical Design",
    DEPARTMENTS.MECHANICAL, 3, "Major", 3, "BAYE MISGANAW AB-EBE",
    { lab: true, program: "Robot MD" }),

course("OD311001", "CAE applications",
    DEPARTMENTS.MECHANICAL, 3, "Major", 3, "Alireza Aslani"),

course("OD312001", "HVAC Systems Design",
    DEPARTMENTS.MECHANICAL, 3, "Major", 3, "Suresh Alapati"),


/* =========================================================
   11. GLOBAL IT ENGINEERING
========================================================= */

// YEAR 1

course("OE102004", "Introduction to Computer Science and Programming",
    DEPARTMENTS.IT, 1, "Major", 3, null),

course("SN149004", "Electricity and Electronics Basics",
    DEPARTMENTS.IT, 1, "Engineering Basic", 3, null),

course("SN150004", "Engineering Mathematics",
    DEPARTMENTS.IT, 1, "Engineering Basic", 3, "Abrar Siddique"),

// YEAR 2

course("SJ013002", "Engineering Programming (LAB)",
    DEPARTMENTS.IT, 2, "Basic Undergraduate", 3, null,
    { lab: true }),

course("SJ013003", "Engineering Programming (LAB)",
    DEPARTMENTS.IT, 2, "Basic Undergraduate", 3, null,
    { lab: true }),

course("SJ017002", "Smart Factory Basics",
    DEPARTMENTS.IT, 2, "Basic Undergraduate", 3, null),

course("SJ017003", "Smart Factory Basics",
    DEPARTMENTS.IT, 2, "Basic Undergraduate", 3, null),

course("OE205001", "Web Design Fundamentals (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, null, { lab: true }),

course("OE205002", "Web Design Fundamentals (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, "Julfikhsan Ahmad Mukhti",
    { lab: true }),

course("OE205003", "Web Design Fundamentals (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, null, { lab: true }),

course("OE206001", "Operating Systems and Systems Programming",
    DEPARTMENTS.IT, 2, "Major", 3, "Mulomba christian mukendi"),

course("OE206002", "Operating Systems and Systems Programming",
    DEPARTMENTS.IT, 2, "Major", 3, "Mulomba christian mukendi"),

course("OE206003", "Operating Systems and Systems Programming",
    DEPARTMENTS.IT, 2, "Major", 3, "Mulomba christian mukendi"),

course("OE207001", "Applied Data Science (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, "Julfikhsan Ahmad Mukhti",
    { lab: true }),

course("OE207002", "Applied Data Science (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, "Julfikhsan Ahmad Mukhti",
    { lab: true }),

course("OE207003", "Applied Data Science (LAB)",
    DEPARTMENTS.IT, 2, "Major", 3, "Julfikhsan Ahmad Mukhti",
    { lab: true }),

course("OE209001", "Introduction to The Internet of Things (IoT) and Edge Computing",
    DEPARTMENTS.IT, 2, "Major", 3, null),

course("OE209002", "Introduction to The Internet of Things (IoT) and Edge Computing",
    DEPARTMENTS.IT, 2, "Major", 3, null),

course("OE209003", "Introduction to The Internet of Things (IoT) and Edge Computing",
    DEPARTMENTS.IT, 2, "Major", 3, null),

// YEAR 3

course("SJ015002", "Capstone Design 1 (Practice)",
    DEPARTMENTS.IT, 3, "Basic Undergraduate", 3, "DELWAR TAHESIN SAMIRA",
    { practical: true }),

course("SJ015003", "Capstone Design 1 (Practice)",
    DEPARTMENTS.IT, 3, "Basic Undergraduate", 3, "Abrar Siddique",
    { practical: true }),

course("SJ015005", "Capstone Design 1 (Practice)",
    DEPARTMENTS.IT, 3, "Basic Undergraduate", 3, null,
    { practical: true }),

course("SJ015006", "Capstone Design 1 (Practice)",
    DEPARTMENTS.IT, 3, "Basic Undergraduate", 3, "Grace Firsta Lukman",
    { practical: true }),

course("OE305001", "Machine Learning with Applications (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Foroozossadat Tabatabaee",
    { lab: true }),

course("OE305002", "Machine Learning with Applications (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Foroozossadat Tabatabaee",
    { lab: true }),

course("OE305003", "Machine Learning with Applications (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Foroozossadat Tabatabaee",
    { lab: true }),

course("OE306001", "Computer Networks and the Internet",
    DEPARTMENTS.IT, 3, "Major", 3, "DELWAR TAHESIN SAMIRA"),

course("OE306002", "Computer Networks and the Internet",
    DEPARTMENTS.IT, 3, "Major", 3, "DELWAR TAHESIN SAMIRA"),

course("OE306003", "Computer Networks and the Internet",
    DEPARTMENTS.IT, 3, "Major", 3, "DELWAR TAHESIN SAMIRA"),

course("OE307001", "Computer Security",
    DEPARTMENTS.IT, 3, "Major", 3, "Foroozossadat Tabatabaee"),

course("OE307002", "Computer Security",
    DEPARTMENTS.IT, 3, "Major", 3, null),

course("OE307003", "Computer Security",
    DEPARTMENTS.IT, 3, "Major", 3, null),

course("OE308001", "Computer Vision",
    DEPARTMENTS.IT, 3, "Major", 3, null),

course("OE308002", "Computer Vision",
    DEPARTMENTS.IT, 3, "Major", 3, null),

course("OE308003", "Computer Vision",
    DEPARTMENTS.IT, 3, "Major", 3, null),

course("OE309001", "Mobile App Programming (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Pham Trung Hieu",
    { lab: true }),

course("OE309002", "Mobile App Programming (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Pham Trung Hieu",
    { lab: true }),

course("OE309003", "Mobile App Programming (LAB)",
    DEPARTMENTS.IT, 3, "Major", 3, "Pham Trung Hieu",
    { lab: true })

]; // END KSU_COURSES


/* =========================================================
   4. FINAL CONFLICT-FREE SCHEDULE GENERATOR
========================================================= */



/*
    KSU CLASS PERIODS

    Period 5 = 12:00 - 12:50
    Lunch break, so generated classes NEVER use period 5.
*/




/* =========================================================
   VALID CLASS BLOCKS
========================================================= */

const KSU_BLOCKS = {

    // 1 credit = 1 period
    1: [
        [1],
        [2],
        [3],
        [4],

        [6],
        [7],
        [8],
        [9],
        [10],
        [11],
        [12]
    ],

    // 2 credits = 2 consecutive periods
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

    // 3 credits = 3 consecutive periods
    3: [
        [1, 2, 3],
        [2, 3, 4],

        [6, 7, 8],
        [7, 8, 9],
        [8, 9, 10],
        [9, 10, 11],
        [10, 11, 12]
    ]
};


/* =========================================================
   PROFESSOR RESERVATIONS
========================================================= */

const professorReservations = new Map();


function normalizeProfessor(name) {

    if (!name) {
        return null;
    }

    const professor = String(name).trim();

    if (!professor) {
        return null;
    }

    const lower = professor.toLowerCase();

    /*
        Unknown professors must NOT be considered
        the same professor.
    */

    if (
        lower.includes("new professor") ||
        lower === "unknown" ||
        lower === "tba" ||
        lower === "n/a"
    ) {
        return null;
    }

    return lower;
}


/* =========================================================
   CREDIT â†’ PERIOD COUNT
========================================================= */

function getRequiredPeriods(course) {

    const credits = Number(course.credits);

    if (!Number.isFinite(credits)) {
        return null;
    }

    if (credits === 1) {
        return 1;
    }

    if (credits === 2) {
        return 2;
    }

    if (credits >= 3) {
        return 3;
    }

    return null;
}


/* =========================================================
   PERIOD â†’ CLOCK TIME
========================================================= */

function getScheduleTimes(periods) {

    if (
        !Array.isArray(periods) ||
        periods.length === 0
    ) {
        return {
            startTime: null,
            endTime: null
        };
    }

    const firstPeriod =
        KSU_PERIODS[periods[0]];

    const lastPeriod =
        KSU_PERIODS[
            periods[periods.length - 1]
        ];

    /*
        Example:
        Online period 13/14 may exist,
        but clock time is not defined here.

        Therefore NEVER invent a time.
    */

    if (!firstPeriod || !lastPeriod) {
        return {
            startTime: null,
            endTime: null
        };
    }

    return {
        startTime: firstPeriod.start,
        endTime: lastPeriod.end
    };
}


/* =========================================================
   PROFESSOR AVAILABILITY
========================================================= */

function isProfessorAvailable(
    professor,
    day,
    periods
) {

    const professorKey =
        normalizeProfessor(professor);

    /*
        No known professor:
        don't create fake conflict.
    */

    if (!professorKey) {
        return true;
    }

    const existing =
        professorReservations.get(
            professorKey
        );

    if (!existing) {
        return true;
    }

    return !existing.some(reservation => {

        if (reservation.day !== day) {
            return false;
        }

        return periods.some(period =>
            reservation.periods.includes(period)
        );
    });
}


/* =========================================================
   RESERVE PROFESSOR SLOT
========================================================= */

function reserveProfessor(
    professor,
    day,
    periods,
    courseCode
) {

    const professorKey =
        normalizeProfessor(professor);

    if (!professorKey) {
        return;
    }

    if (
        !professorReservations.has(
            professorKey
        )
    ) {

        professorReservations.set(
            professorKey,
            []
        );
    }

    professorReservations
        .get(professorKey)
        .push({
            day: day,
            periods: [...periods],
            courseCode: courseCode
        });
}


/* =========================================================
   DETERMINISTIC HASH

   Same course code =
   same generated starting position.
========================================================= */


/* =========================================================
   PERIOD OVERLAP CHECK
========================================================= */

function periodsOverlap(periodsA, periodsB) {

    if (!Array.isArray(periodsA) || !Array.isArray(periodsB)) {
        return false;
    }

    return periodsA.some(period =>
        periodsB.includes(period)
    );
}
function courseCodeHash(text) {

    const value =
        String(text || "");

    let hash = 0;

    for (
        let i = 0;
        i < value.length;
        i++
    ) {

        hash =
            ((hash << 5) - hash) +
            value.charCodeAt(i);

        hash |= 0;
    }

    return Math.abs(hash);
}


/* =========================================================
   PRESERVE EXISTING / OFFICIAL SCHEDULE
========================================================= */

function preserveOfficialSchedules() {

    KSU_COURSES.forEach(course => {

        /*
            New structure:
            officialSchedule
        */

        if (course.officialSchedule) {

            const day =
                course.officialSchedule.day;

            const periods =
                course.officialSchedule.periods;

            if (
                day &&
                Array.isArray(periods)
            ) {

                const times =
                    getScheduleTimes(periods);

                course.schedule = {
                    day: day,
                    periods: [...periods],
                    startTime: times.startTime,
                    endTime: times.endTime,
                    source: "official"
                };

                reserveProfessor(
                    course.professor,
                    day,
                    periods,
                    course.code
                );

                return;
            }
        }


        /*
            Compatibility with any old data
            where schedule was already supplied.
        */

        if (
            course.schedule &&
            course.schedule.day &&
            Array.isArray(
                course.schedule.periods
            ) &&
            course.schedule.source === "official"
        ) {

            reserveProfessor(
                course.professor,
                course.schedule.day,
                course.schedule.periods,
                course.code
            );
        }
    });
}


/* =========================================================
   GENERATE REGULAR COURSE SCHEDULES

   RULES
   ---------------------------------------------------------
   - Regular 3-credit course = 2 weekly sessions
   - Each session occupies 3 consecutive periods
   - Sessions may be on different days
   - Sessions may also be on the same day
   - Same-day sessions must not overlap
   - Same professor must never have a time conflict
   - Morning / afternoon distribution is balanced
========================================================= */

function generateScheduleForCourse(course) {

    /*
        Never overwrite official schedules.
    */
    if (
        course.schedule &&
        (
            course.schedule.source === "official" ||
            (
                Array.isArray(course.schedule) &&
                course.schedule.some(
                    item => item?.source === "official"
                )
            )
        )
    ) {
        return;
    }


    /*
        These course types do not receive
        generated weekly classroom schedules.
    */
    if (
        course.deliveryType === "CELL" ||
        course.deliveryType === "KIIP" ||
        course.deliveryType === "Online"
    ) {
        course.schedule = [];
        return;
    }


    const requiredPeriods =
        getRequiredPeriods(course);


    if (
        !requiredPeriods ||
        !KSU_BLOCKS[requiredPeriods]
    ) {
        course.schedule = [];
        return;
    }


    /*
        3-credit regular courses:
        TWO weekly sessions.

        Other courses:
        Keep ONE generated session unless
        another rule is added later.
    */
    const requiredSessions =
        Number(course.credits) === 3
            ? 2
            : 1;


    /*
        Build every possible candidate.
    */
    const candidates = [];


    KSU_DAYS.forEach(day => {

        KSU_BLOCKS[
            requiredPeriods
        ].forEach(periods => {

            const firstPeriod =
                periods[0];


            /*
                Morning / afternoon classification.
            */
            const timeGroup =
                firstPeriod <= 4
                    ? "morning"
                    : "afternoon";


            candidates.push({
                day: day,
                periods: [...periods],
                timeGroup: timeGroup
            });

        });

    });


    /*
        Deterministic rotation.

        Same database always creates the
        same timetable after refresh.
    */
    const startIndex =
        courseCodeHash(course.code) %
        candidates.length;


    const rotatedCandidates = [];

    for (
        let offset = 0;
        offset < candidates.length;
        offset++
    ) {

        rotatedCandidates.push(
            candidates[
                (startIndex + offset) %
                candidates.length
            ]
        );
    }


    const selectedSessions = [];


    /*
        Helper:
        check whether this candidate conflicts
        with another session of THIS SAME COURSE.
    */
    function conflictsWithOwnSession(candidate) {

        return selectedSessions.some(existing => {

            if (
                existing.day !== candidate.day
            ) {
                return false;
            }

            return periodsOverlap(
                existing.periods,
                candidate.periods
            );
        });
    }


    /*
        Helper:
        score candidates.

        This does NOT force particular weekdays.

        It simply prefers:
        1. different day when practical
        2. morning + afternoon balance
        3. conflict-free professor slot
    */
    function candidateScore(candidate) {

        let score = 0;


        if (selectedSessions.length === 0) {

            /*
                Spread first sessions across
                morning and afternoon according
                to course hash.
            */
            const preferMorning =
                courseCodeHash(course.code) % 2 === 0;


            if (
                preferMorning &&
                candidate.timeGroup === "morning"
            ) {
                score += 20;
            }


            if (
                !preferMorning &&
                candidate.timeGroup === "afternoon"
            ) {
                score += 20;
            }


            return score;
        }


        const first =
            selectedSessions[0];


        /*
            Prefer another weekday,
            but SAME DAY remains valid.
        */
        if (
            candidate.day !== first.day
        ) {
            score += 30;
        }


        /*
            Prefer opposite time group so
            database is not concentrated only
            in morning or afternoon.
        */
        if (
            candidate.timeGroup !==
            first.timeGroup
        ) {
            score += 15;
        }


        return score;
    }


    /*
        Generate each weekly session.
    */
    for (
        let sessionNumber = 0;
        sessionNumber < requiredSessions;
        sessionNumber++
    ) {

        const availableCandidates =
            rotatedCandidates
                .filter(candidate => {

                    /*
                        Same course cannot overlap itself.
                    */
                    if (
                        conflictsWithOwnSession(
                            candidate
                        )
                    ) {
                        return false;
                    }


                    /*
                        Professor cannot teach another
                        class at the same time.
                    */
                    if (
                        !isProfessorAvailable(
                            course.professor,
                            candidate.day,
                            candidate.periods
                        )
                    ) {
                        return false;
                    }


                    return true;
                })
                .map((candidate, index) => ({
                    ...candidate,
                    originalOrder: index,
                    score:
                        candidateScore(candidate)
                }))
                .sort((a, b) => {

                    if (b.score !== a.score) {
                        return b.score - a.score;
                    }

                    return (
                        a.originalOrder -
                        b.originalOrder
                    );
                });


        if (
            availableCandidates.length === 0
        ) {

            console.warn(
                "No conflict-free session:",
                course.code,
                course.name,
                course.professor,
                "Session:",
                sessionNumber + 1
            );

            break;
        }


        const selected =
            availableCandidates[0];


        const times =
            getScheduleTimes(
                selected.periods
            );


        const session = {

            day:
                selected.day,

            periods:
                [...selected.periods],

            startTime:
                times.startTime,

            endTime:
                times.endTime,

            source:
                "generated"
        };


        selectedSessions.push(
            session
        );


        /*
            Immediately reserve professor.
            Therefore later courses cannot
            occupy this professor's time.
        */
        reserveProfessor(
            course.professor,
            selected.day,
            selected.periods,
            course.code
        );
    }


    /*
        Store ALL weekly sessions.
    */
    course.schedule =
        selectedSessions;
}


/* =========================================================
   GENERATE ALL COURSE SCHEDULES
========================================================= */

function generateAllCourseSchedules() {

    professorReservations.clear();


    /*
        STEP 1:
        Reserve official schedules first.
    */
    preserveOfficialSchedules();


    /*
        STEP 2:
        Count how many schedulable courses
        belong to each professor.

        Professors with heavier workloads
        are scheduled first so they receive
        enough conflict-free blocks.
    */
    const professorWorkload = new Map();


    KSU_COURSES.forEach(course => {

        const professorKey =
            normalizeProfessor(course.professor);

        if (!professorKey) {
            return;
        }

        if (
            course.deliveryType === "CELL" ||
            course.deliveryType === "KIIP" ||
            course.deliveryType === "Online"
        ) {
            return;
        }

        const requiredSessions =
            Number(course.credits) === 3
                ? 2
                : 1;

        professorWorkload.set(
            professorKey,
            (
                professorWorkload.get(
                    professorKey
                ) || 0
            ) + requiredSessions
        );
    });


    /*
        STEP 3:
        Sort courses.

        Heavy professor workloads first.

        Within the same workload,
        course code keeps the result
        deterministic after refresh.
    */
    const generationOrder =
        [...KSU_COURSES].sort((a, b) => {

            const professorA =
                normalizeProfessor(a.professor);

            const professorB =
                normalizeProfessor(b.professor);


            const workloadA =
                professorA
                    ? (
                        professorWorkload.get(
                            professorA
                        ) || 0
                    )
                    : 0;

            const workloadB =
                professorB
                    ? (
                        professorWorkload.get(
                            professorB
                        ) || 0
                    )
                    : 0;


            if (workloadB !== workloadA) {
                return workloadB - workloadA;
            }


            return String(a.code || "")
                .localeCompare(
                    String(b.code || "")
                );
        });


    /*
        STEP 4:
        Generate schedules in the
        workload-aware order.
    */
    generationOrder.forEach(course => {

        generateScheduleForCourse(
            course
        );

    });
}/* =========================================================
   RUN GENERATOR
========================================================= */

generateAllCourseSchedules();


/* =========================================================
   QUICK SCHEDULE CHECK
========================================================= */

/* =========================================================
   QUICK SCHEDULE CHECK
========================================================= */

console.log(
    "KSU Schedule Generator Finished"
);

console.log(
    "Total Courses:",
    KSU_COURSES.length
);


/*
    A course now stores weekly sessions as:

    schedule: [
        { day, periods, source },
        { day, periods, source }
    ]
*/

console.log(
    "Generated:",
    KSU_COURSES.filter(course =>
        Array.isArray(course.schedule) &&
        course.schedule.some(
            session =>
                session?.source === "generated"
        )
    ).length
);


console.log(
    "Official:",
    KSU_COURSES.filter(course =>
        Array.isArray(course.schedule) &&
        course.schedule.some(
            session =>
                session?.source === "official"
        )
    ).length
);


console.log(
    "Without Weekly Schedule:",
    KSU_COURSES.filter(course =>
        !Array.isArray(course.schedule) ||
        course.schedule.length === 0
    ).length
);


/* =========================================================
   6. VALIDATION
========================================================= */

function validateProfessorConflicts(courses) {

    const conflicts = [];


    for (
        let i = 0;
        i < courses.length;
        i++
    ) {

        const a = courses[i];


        if (
            !Array.isArray(a.schedule) ||
            a.schedule.length === 0
        ) {
            continue;
        }


        const professorA =
            normalizeProfessor(
                a.professor
            );


        /*
            No professor name =
            nothing meaningful to compare.
        */
        if (!professorA) {
            continue;
        }


        for (
            let j = i + 1;
            j < courses.length;
            j++
        ) {

            const b = courses[j];


            if (
                !Array.isArray(b.schedule) ||
                b.schedule.length === 0
            ) {
                continue;
            }


            const professorB =
                normalizeProfessor(
                    b.professor
                );


            if (
                !professorB ||
                professorA !== professorB
            ) {
                continue;
            }


            /*
                Compare EVERY session of course A
                against EVERY session of course B.
            */

            a.schedule.forEach(
                (sessionA, sessionAIndex) => {

                    b.schedule.forEach(
                        (sessionB, sessionBIndex) => {


                            if (
                                !sessionA ||
                                !sessionB
                            ) {
                                return;
                            }


                            if (
                                sessionA.day !==
                                sessionB.day
                            ) {
                                return;
                            }


                            const overlap =
                                periodsOverlap(
                                    sessionA.periods,
                                    sessionB.periods
                                );


                            if (!overlap) {
                                return;
                            }


                            conflicts.push({

                                professor:
                                    a.professor,

                                course1:
                                    a.code,

                                course1Session:
                                    sessionAIndex + 1,

                                course2:
                                    b.code,

                                course2Session:
                                    sessionBIndex + 1,

                                day:
                                    sessionA.day,

                                course1Periods:
                                    [
                                        ...sessionA.periods
                                    ],

                                course2Periods:
                                    [
                                        ...sessionB.periods
                                    ]
                            });

                        }
                    );

                }
            );

        }

    }


    return conflicts;
}


const PROFESSOR_CONFLICTS =
    validateProfessorConflicts(
        KSU_COURSES
    );


if (
    PROFESSOR_CONFLICTS.length === 0
) {

    console.log(
        "KSU SmartPlan schedule validation: PASSED"
    );

    console.log(
        "Professor conflicts: 0"
    );

} else {

    console.error(
        "Schedule validation FAILED",
        PROFESSOR_CONFLICTS
    );
}


/* =========================================================
   7. HELPER FUNCTIONS FOR COURSE FINDER
========================================================= */

function getCoursesByDepartment(department) {

    return KSU_COURSES.filter(
        course =>
            course.department === department
    );

}


function getCoursesByGrade(department, grade) {

    return KSU_COURSES.filter(
        course =>
            course.department === department &&
            course.grade === Number(grade)
    );

}


function searchCourses({
    department = "",
    grade = "",
    category = "",
    keyword = ""
} = {}) {

    const searchText =
        String(keyword)
            .trim()
            .toLowerCase();


    return KSU_COURSES.filter(course => {

        const departmentMatch =
            !department ||
            course.department === department;


        const gradeMatch =
            !grade ||
            course.grade === Number(grade);


        const categoryMatch =
            !category ||
            course.category === category;


        const keywordMatch =
            !searchText ||

            course.code
                .toLowerCase()
                .includes(searchText) ||

            course.name
                .toLowerCase()
                .includes(searchText) ||

            course.professor
                .toLowerCase()
                .includes(searchText);


        return (
            departmentMatch &&
            gradeMatch &&
            categoryMatch &&
            keywordMatch
        );

    });

}


/* =========================================================
   8. GLOBAL ACCESS
========================================================= */

window.KSU_DEPARTMENTS = KSU_DEPARTMENTS;
window.KSU_PERIODS = KSU_PERIODS;
window.KSU_COURSES = KSU_COURSES;

window.getCoursesByDepartment =
    getCoursesByDepartment;

window.getCoursesByGrade =
    getCoursesByGrade;

window.searchCourses =
    searchCourses;





