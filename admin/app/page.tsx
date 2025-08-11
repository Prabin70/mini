"use client"; // Keep this at the top as it uses client-side hooks and components

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for Tailwind classes

// Import components
import { Sidebar } from "@/components/sidebar/sidebar";
import { SidebarBody } from "@/components/sidebar/sidebar-body";
import { SidebarLink } from "@/components/sidebar/sidebar-link";
import { Links } from "@/components/sidebar/sidebar-context"; // Import Links interface

import { Button } from "@/components/ui/button";

// Import view components for the main content area
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { StudentsTable } from "@/components/dashboard/students-table";
import { CoursesTable } from "@/components/dashboard/courses-table";
import { AnalyticsView } from "@/components/dashboard/analytics-view";

// Import data
import { studentsData, coursesData } from "@/data";
import { AnimatedThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminPanel = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [studentsFilter, setStudentsFilter] = useState("");
  const [studentsSortField, setStudentsSortField] = useState<string>("");
  const [studentsSortDirection, setStudentsSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  const [coursesFilter, setCoursesFilter] = useState("");
  const [coursesSortField, setCoursesSortField] = useState<string>("");
  const [coursesSortDirection, setCoursesSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  const sidebarLinks: Links[] = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Courses",
      href: "/courses",
      icon: (
        <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Students",
      href: "/students",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const filteredStudents = useMemo(() => {
    let filtered = studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(studentsFilter.toLowerCase()) ||
        student.email.toLowerCase().includes(studentsFilter.toLowerCase()) ||
        student.course.toLowerCase().includes(studentsFilter.toLowerCase())
    );

    if (studentsSortField) {
      filtered.sort((a, b) => {
        const aValue = a[studentsSortField as keyof typeof a];
        const bValue = b[studentsSortField as keyof typeof b];

        // Basic comparison for string/number. Adjust for specific types if needed.
        if (typeof aValue === "string" && typeof bValue === "string") {
          return studentsSortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return studentsSortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        // Fallback for other types, or if values are mixed
        return 0;
      });
    }

    return filtered;
  }, [studentsFilter, studentsSortField, studentsSortDirection]);

  const filteredCourses = useMemo(() => {
    let filtered = coursesData.filter(
      (course) =>
        course.title.toLowerCase().includes(coursesFilter.toLowerCase()) ||
        course.instructor.toLowerCase().includes(coursesFilter.toLowerCase())
    );

    if (coursesSortField) {
      filtered.sort((a, b) => {
        const aValue = a[coursesSortField as keyof typeof a];
        const bValue = b[coursesSortField as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return coursesSortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return coursesSortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }

    return filtered;
  }, [coursesFilter, coursesSortField, coursesSortDirection]);

  const handleStudentsSort = (field: string) => {
    if (studentsSortField === field) {
      setStudentsSortDirection(
        studentsSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setStudentsSortField(field);
      setStudentsSortDirection("asc");
    }
  };

  const handleCoursesSort = (field: string) => {
    if (coursesSortField === field) {
      setCoursesSortDirection(coursesSortDirection === "asc" ? "desc" : "asc");
    } else {
      setCoursesSortField(field);
      setCoursesSortDirection("asc");
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />;
      case "students":
        return (
          <StudentsTable
            studentsFilter={studentsFilter}
            setStudentsFilter={setStudentsFilter}
            studentsSortField={studentsSortField}
            studentsSortDirection={studentsSortDirection}
            handleStudentsSort={handleStudentsSort}
            filteredStudents={filteredStudents}
          />
        );
      case "courses":
        return (
          <CoursesTable
            coursesFilter={coursesFilter}
            setCoursesFilter={setCoursesFilter}
            coursesSortField={coursesSortField}
            coursesSortDirection={coursesSortDirection}
            handleCoursesSort={handleCoursesSort}
            filteredCourses={filteredCourses}
          />
        );
      case "analytics":
        return <AnalyticsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex items-center gap-2 py-1">
                <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                {/* Motion.span is handled internally by SidebarLink, no need for it here outside SidebarLink */}
                <span className="font-medium text-foreground whitespace-pre">
                  EduAdmin
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setCurrentPage(link.label.toLowerCase())}
                    className={cn(
                      currentPage === link.label.toLowerCase() &&
                        "bg-accent text-accent-foreground rounded-md"
                    )}
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold capitalize">
                {currentPage}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <AnimatedThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="hidden md:inline">Admin User</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent isOpen={userDropdownOpen}>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserDropdownOpen(false)}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
