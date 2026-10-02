import type {
  Doubt,
  Question,
  StudentSummary,
  Subject,
  SubjectKey,
  Test,
} from "@/types";

export const subjectLabels: Record<SubjectKey, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  maths: "Mathematics",
  biology: "Biology",
};

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    progress: 62,
    chapters: [
      {
        id: "kinematics",
        title: "Kinematics",
        topics: [
          {
            id: "motion-in-a-straight-line",
            title: "Motion in a Straight Line",
            kind: "video",
            durationMin: 42,
            completed: true,
            summary:
              "Displacement, velocity and acceleration in one dimension, with graphical interpretation of motion.",
            keyPoints: [
              "Slope of an x–t graph gives velocity; slope of a v–t graph gives acceleration.",
              "Area under a v–t graph equals displacement.",
              "Equations of motion hold only for constant acceleration.",
            ],
          },
          {
            id: "projectile-motion",
            title: "Projectile Motion",
            kind: "video",
            durationMin: 38,
            completed: false,
            summary:
              "Two-dimensional motion under gravity — time of flight, range and maximum height.",
            keyPoints: [
              "Horizontal and vertical motions are independent.",
              "Range is maximum at 45° on level ground: R = u²/g.",
              "Trajectory is a parabola: y = x tanθ − gx²/(2u²cos²θ).",
            ],
          },
          {
            id: "kinematics-dpp",
            title: "Daily Practice Problems",
            kind: "practice",
            durationMin: 30,
            completed: false,
            summary: "20 mixed JEE Main level problems on 1D and 2D kinematics.",
            keyPoints: ["Attempt without a calculator.", "Target time: 30 minutes."],
          },
        ],
      },
      {
        id: "rotational-dynamics",
        title: "Rotational Dynamics",
        topics: [
          {
            id: "torque-and-angular-momentum",
            title: "Torque & Angular Momentum",
            kind: "video",
            durationMin: 51,
            completed: false,
            summary:
              "Rotational analogues of force and momentum, and conservation of angular momentum.",
            keyPoints: [
              "τ = r × F; direction by the right-hand rule.",
              "L = Iω is conserved when net external torque is zero.",
              "Rolling without slipping: v = ωR.",
            ],
          },
          {
            id: "moment-of-inertia-notes",
            title: "Moment of Inertia — Notes",
            kind: "pdf",
            durationMin: 20,
            completed: false,
            summary: "Formula sheet with parallel and perpendicular axis theorems.",
            keyPoints: [
              "Parallel axis: I = I_cm + Md².",
              "Perpendicular axis applies only to planar bodies.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    progress: 48,
    chapters: [
      {
        id: "chemical-bonding",
        title: "Chemical Bonding",
        topics: [
          {
            id: "hybridisation",
            title: "Hybridisation & VSEPR",
            kind: "video",
            durationMin: 45,
            completed: true,
            summary: "Predicting molecular shapes from electron-pair repulsion.",
            keyPoints: [
              "Steric number = bonded atoms + lone pairs.",
              "Lone pairs compress bond angles (NH₃: 107°, H₂O: 104.5°).",
            ],
          },
          {
            id: "mo-theory-notes",
            title: "Molecular Orbital Theory — Notes",
            kind: "pdf",
            durationMin: 25,
            completed: false,
            summary: "MO diagrams for homonuclear diatomics and bond order.",
            keyPoints: [
              "Bond order = (bonding − antibonding electrons) / 2.",
              "O₂ is paramagnetic with two unpaired electrons.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "maths",
    name: "Mathematics",
    progress: 71,
    chapters: [
      {
        id: "integral-calculus",
        title: "Integral Calculus",
        topics: [
          {
            id: "definite-integrals",
            title: "Definite Integrals",
            kind: "video",
            durationMin: 56,
            completed: true,
            summary: "Properties of definite integrals and area under curves.",
            keyPoints: [
              "∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b − x) dx.",
              "Odd functions integrate to zero over symmetric limits.",
            ],
          },
          {
            id: "area-under-curves",
            title: "Area Under Curves",
            kind: "practice",
            durationMin: 35,
            completed: false,
            summary: "15 problems on bounded regions between curves.",
            keyPoints: ["Sketch the curves before integrating."],
          },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    progress: 55,
    chapters: [
      {
        id: "human-physiology",
        title: "Human Physiology",
        topics: [
          {
            id: "nephron-structure",
            title: "Nephron Structure & Function",
            kind: "video",
            durationMin: 40,
            completed: false,
            summary: "Filtration, reabsorption and secretion along the nephron.",
            keyPoints: [
              "Glomerular filtration rate ≈ 125 mL/min.",
              "Loop of Henle establishes the medullary concentration gradient.",
            ],
          },
        ],
      },
    ],
  },
];

export function findTopic(subjectId: string, topicId: string) {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return null;
  for (const chapter of subject.chapters) {
    const index = chapter.topics.findIndex((t) => t.id === topicId);
    if (index !== -1) {
      return {
        subject,
        chapter,
        topic: chapter.topics[index],
        next: chapter.topics[index + 1] ?? null,
      };
    }
  }
  return null;
}

export const tests: Test[] = [
  {
    id: "jee-main-mock-07",
    title: "JEE Main Full Mock #7",
    exam: "JEE Main",
    subjects: ["physics", "chemistry", "maths"],
    durationMin: 180,
    totalMarks: 300,
    questionCount: 75,
    scheduledAt: "2026-09-25T09:00:00+05:30",
    status: "live",
  },
  {
    id: "physics-kinematics-ct",
    title: "Kinematics Chapter Test",
    exam: "Chapter test",
    subjects: ["physics"],
    durationMin: 45,
    totalMarks: 60,
    questionCount: 15,
    scheduledAt: "2026-09-27T17:00:00+05:30",
    status: "upcoming",
  },
  {
    id: "neet-mock-04",
    title: "NEET Full Mock #4",
    exam: "NEET",
    subjects: ["physics", "chemistry", "biology"],
    durationMin: 200,
    totalMarks: 720,
    questionCount: 180,
    scheduledAt: "2026-09-29T10:00:00+05:30",
    status: "upcoming",
  },
  {
    id: "jee-main-mock-06",
    title: "JEE Main Full Mock #6",
    exam: "JEE Main",
    subjects: ["physics", "chemistry", "maths"],
    durationMin: 180,
    totalMarks: 300,
    questionCount: 75,
    scheduledAt: "2026-09-18T09:00:00+05:30",
    status: "completed",
    score: 212,
    rank: 38,
  },
  {
    id: "chemistry-bonding-ct",
    title: "Chemical Bonding Chapter Test",
    exam: "Chapter test",
    subjects: ["chemistry"],
    durationMin: 40,
    totalMarks: 48,
    questionCount: 12,
    scheduledAt: "2026-09-12T17:00:00+05:30",
    status: "completed",
    score: 36,
    rank: 12,
  },
];

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    subject: "physics",
    type: "single",
    text: "A ball is projected at 30° above the horizontal with speed 20 m/s. Taking g = 10 m/s², its time of flight is:",
    options: [
      { id: "a", text: "1 s" },
      { id: "b", text: "2 s" },
      { id: "c", text: "3 s" },
      { id: "d", text: "4 s" },
    ],
    correct: ["b"],
    marks: 4,
    negative: 1,
    explanation: "T = 2u sinθ / g = 2 × 20 × 0.5 / 10 = 2 s.",
  },
  {
    id: "q2",
    subject: "physics",
    type: "numeric",
    text: "A disc of moment of inertia 2 kg·m² rotates at 10 rad/s. Its rotational kinetic energy (in J) is:",
    correct: ["100"],
    marks: 4,
    negative: 0,
    explanation: "K = ½Iω² = ½ × 2 × 100 = 100 J.",
  },
  {
    id: "q3",
    subject: "chemistry",
    type: "single",
    text: "The hybridisation of the central atom in SF₆ is:",
    options: [
      { id: "a", text: "sp³" },
      { id: "b", text: "sp³d" },
      { id: "c", text: "sp³d²" },
      { id: "d", text: "dsp²" },
    ],
    correct: ["c"],
    marks: 4,
    negative: 1,
    explanation: "Six bonding pairs, no lone pairs → steric number 6 → sp³d².",
  },
  {
    id: "q4",
    subject: "chemistry",
    type: "multiple",
    text: "Which of the following species are paramagnetic?",
    options: [
      { id: "a", text: "O₂" },
      { id: "b", text: "N₂" },
      { id: "c", text: "B₂" },
      { id: "d", text: "F₂" },
    ],
    correct: ["a", "c"],
    marks: 4,
    negative: 2,
    explanation: "O₂ and B₂ each have two unpaired electrons in their MO configuration.",
  },
  {
    id: "q5",
    subject: "maths",
    type: "single",
    text: "The value of ∫₀^π x sin x dx is:",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "π/2" },
      { id: "c", text: "π" },
      { id: "d", text: "2π" },
    ],
    correct: ["c"],
    marks: 4,
    negative: 1,
    explanation: "Integrating by parts: [−x cos x]₀^π + ∫₀^π cos x dx = π.",
  },
  {
    id: "q6",
    subject: "maths",
    type: "numeric",
    text: "The area (in sq. units) enclosed between y = x² and y = 2x is k/3. Find k.",
    correct: ["4"],
    marks: 4,
    negative: 0,
    explanation: "∫₀² (2x − x²) dx = 4 − 8/3 = 4/3.",
  },
];

export const doubts: Doubt[] = [
  {
    id: "DB-441",
    subject: "physics",
    topic: "Rotational Dynamics — Torque",
    question:
      "Why is torque zero when the force passes through the axis, even if the force is very large?",
    student: "Aarav Mehta",
    createdAt: "2026-09-25T11:20:00+05:30",
    status: "answered",
    replies: [
      {
        id: "r1",
        author: "Dr. Ananya Rao",
        role: "teacher",
        body: "Torque is r × F. If the line of action passes through the axis, the perpendicular distance r⊥ is zero, so τ = r⊥F = 0 regardless of how large F is.",
        createdAt: "2026-09-25T12:05:00+05:30",
      },
    ],
  },
  {
    id: "DB-438",
    subject: "maths",
    topic: "Definite Integrals — King's property",
    question: "When should I use f(a + b − x) instead of substitution?",
    student: "Aarav Mehta",
    createdAt: "2026-09-23T18:40:00+05:30",
    status: "resolved",
    replies: [
      {
        id: "r2",
        author: "Prof. Neha Kapoor",
        role: "teacher",
        body: "Try it whenever the integrand has a symmetric partner, e.g. sin x and cos x over [0, π/2], or x and (a − x). Adding the original and transformed integral usually cancels the hard term.",
        createdAt: "2026-09-23T20:10:00+05:30",
      },
    ],
  },
  {
    id: "DB-445",
    subject: "chemistry",
    topic: "Chemical Bonding — Bond angles",
    question: "Why is the bond angle in H₂O smaller than in NH₃?",
    student: "Aarav Mehta",
    createdAt: "2026-09-25T08:15:00+05:30",
    status: "open",
    replies: [],
  },
];

export const students: StudentSummary[] = [
  {
    id: "ST-2041",
    name: "Aarav Mehta",
    className: "11",
    batch: "JEE 2027 — Batch A",
    target: "JEE",
    avgScore: 71,
    attendance: 92,
    streak: 14,
    weakTopics: ["Rotational Dynamics", "Chemical Equilibrium", "Probability"],
  },
  {
    id: "ST-2042",
    name: "Priya Sharma",
    className: "12",
    batch: "NEET 2026 — Evening",
    target: "NEET",
    avgScore: 78,
    attendance: 88,
    streak: 6,
    weakTopics: ["Genetics", "Electrochemistry"],
  },
  {
    id: "ST-2043",
    name: "Kabir Singh",
    className: "12",
    batch: "JEE 2026 — Elite",
    target: "JEE",
    avgScore: 86,
    attendance: 96,
    streak: 31,
    weakTopics: ["Complex Numbers"],
  },
  {
    id: "ST-2044",
    name: "Ananya Gupta",
    className: "10",
    batch: "Class 11 Foundation",
    target: "NEET",
    avgScore: 58,
    attendance: 81,
    streak: 2,
    weakTopics: ["Motion", "Atomic Structure", "Cell Biology"],
  },
  {
    id: "ST-2045",
    name: "Rohan Das",
    className: "11",
    batch: "JEE 2027 — Batch A",
    target: "JEE",
    avgScore: 64,
    attendance: 90,
    streak: 9,
    weakTopics: ["Thermodynamics", "Sequences & Series"],
  },
];

export const findStudent = (id: string) => students.find((s) => s.id === id) ?? null;

export const batches = [
  { id: "jee-2027-a", name: "JEE 2027 — Batch A", students: 42, avgScore: 67, attendance: 91 },
  { id: "neet-2026-eve", name: "NEET 2026 — Evening", students: 56, avgScore: 72, attendance: 87 },
  { id: "jee-2026-elite", name: "JEE 2026 — Elite", students: 24, avgScore: 81, attendance: 95 },
  { id: "foundation-11", name: "Class 11 Foundation", students: 64, avgScore: 61, attendance: 84 },
];

export const findBatch = (id: string) => batches.find((b) => b.id === id) ?? null;

export const scoreTrend = [
  { label: "Mock 1", value: 58 },
  { label: "Mock 2", value: 61 },
  { label: "Mock 3", value: 59 },
  { label: "Mock 4", value: 66 },
  { label: "Mock 5", value: 68 },
  { label: "Mock 6", value: 71 },
];

export const topicMastery: { subject: string; topics: { name: string; score: number }[] }[] = [
  {
    subject: "Physics",
    topics: [
      { name: "Kinematics", score: 84 },
      { name: "Laws of Motion", score: 76 },
      { name: "Work & Energy", score: 69 },
      { name: "Rotation", score: 42 },
      { name: "Gravitation", score: 63 },
      { name: "Electrostatics", score: 55 },
    ],
  },
  {
    subject: "Chemistry",
    topics: [
      { name: "Mole Concept", score: 88 },
      { name: "Atomic Structure", score: 79 },
      { name: "Bonding", score: 72 },
      { name: "Equilibrium", score: 38 },
      { name: "Thermo", score: 58 },
      { name: "Organic Basics", score: 66 },
    ],
  },
  {
    subject: "Maths",
    topics: [
      { name: "Quadratics", score: 91 },
      { name: "Sequences", score: 74 },
      { name: "Trigonometry", score: 68 },
      { name: "Probability", score: 45 },
      { name: "Limits", score: 81 },
      { name: "Integrals", score: 77 },
    ],
  },
];
