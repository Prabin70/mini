// Make sure this is a client component because it uses hooks
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Make sure you have this utility from shadcn setup

const AddStudentPage = () => {
  // State to hold the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState<string>(); // Use string | undefined for the Select placeholder
  const [enrolledDate, setEnrolledDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      name,
      email,
      course,
      status,
      enrolledDate: enrolledDate ? format(enrolledDate, "yyyy-MM-dd") : null,
    };
    // In a real application, you would send this data to your API
    console.log("Form Submitted:", studentData);
    alert("Student data logged to console. Check the developer tools.");
    // Here you can add logic to post the data to your backend,
    // show a success message, and reset the form.
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Student</CardTitle>
          <CardDescription>
            Fill in the details below to enroll a new student in the system.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Course Field */}
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                type="text"
                placeholder="e.g., Computer Science"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>

            {/* Status & Enrolled Date (in a grid for alignment) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Field */}
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Select student status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Enrolled Date Field */}
              <div className="grid gap-2">
                <Label htmlFor="enrolled-date">Enrolled Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !enrolledDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {enrolledDate ? (
                        format(enrolledDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={enrolledDate}
                      onSelect={setEnrolledDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Add Student
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddStudentPage;
