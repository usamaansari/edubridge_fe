import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  FileClock,
  FilePlus2,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Library,
  LineChart,
  MessageCircleQuestion,
  NotebookPen,
  UserCog,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Portal, Role } from "@/types";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  match?: string;
  roles?: Role[];
};

export const portalNav: Record<Portal, NavItem[]> = {
  student: [
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/student/learn/physics/motion-in-a-straight-line",
      label: "Learn",
      icon: BookOpen,
      match: "/student/learn",
    },
    { href: "/student/tests", label: "Tests", icon: ClipboardList },
    { href: "/student/doubts", label: "Doubts", icon: MessageCircleQuestion },
    { href: "/student/mentor", label: "Mentor", icon: Handshake },
    { href: "/student/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/student/schedule", label: "Schedule", icon: CalendarClock },
  ],
  parent: [
    { href: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/parent/performance/ST-2041", label: "Performance", icon: LineChart, match: "/parent/performance" },
    { href: "/parent/fees", label: "Fees", icon: Wallet },
  ],
  teacher: [
    { href: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/content", label: "Content", icon: Library },
    { href: "/teacher/content/upload", label: "Upload", icon: Video },
    { href: "/teacher/tests/builder", label: "Test builder", icon: FilePlus2 },
    { href: "/teacher/doubts", label: "Doubts", icon: MessageCircleQuestion },
    { href: "/teacher/batch/jee-2027-a/analytics", label: "Batch analytics", icon: BarChart3, match: "/teacher/batch" },
  ],
  mentor: [
    { href: "/mentor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/mentor/students/ST-2041", label: "Mentees", icon: Users, match: "/mentor/students" },
    { href: "/mentor/sessions", label: "Sessions", icon: NotebookPen },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/batches", label: "Batches", icon: GraduationCap },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/staff", label: "Staff", icon: UserCog },
    { href: "/admin/fees", label: "Fees", icon: Wallet },
    { href: "/admin/timetable", label: "Timetable", icon: CalendarDays },
    { href: "/admin/scholarships", label: "Scholarships", icon: Award },
    {
      href: "/admin/organisations",
      label: "Organisations",
      icon: Building2,
      roles: ["super_admin"],
    },
    {
      href: "/admin/audit-logs",
      label: "Audit logs",
      icon: FileClock,
      roles: ["super_admin"],
    },
  ],
};

export const portalLabels: Record<Portal, string> = {
  student: "Student",
  parent: "Parent",
  teacher: "Faculty",
  mentor: "Mentor",
  admin: "Admin",
};
