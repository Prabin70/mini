import React from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { studentsData } from "@/data"; // Import studentsData for type inference
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface StudentsTableProps {
  studentsFilter: string;
  setStudentsFilter: (value: string) => void;
  studentsSortField: string;
  studentsSortDirection: "asc" | "desc";
  handleStudentsSort: (field: string) => void;
  filteredStudents: typeof studentsData;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  studentsFilter,
  setStudentsFilter,
  studentsSortField,
  studentsSortDirection,
  handleStudentsSort,
  filteredStudents,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">Manage your student database</p>
      </div>
      <Button>Add Student</Button> {/* Changed to Button for consistency */}
    </div>

    <div className="flex gap-4 items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search students..."
          value={studentsFilter}
          onChange={(e) => setStudentsFilter(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>

    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentsSort("name")}
              >
                <div className="flex items-center gap-2">
                  Name
                  {studentsSortField === "name" &&
                    (studentsSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentsSort("email")}
              >
                <div className="flex items-center gap-2">
                  Email
                  {studentsSortField === "email" &&
                    (studentsSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentsSort("course")}
              >
                <div className="flex items-center gap-2">
                  Course
                  {studentsSortField === "course" &&
                    (studentsSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentsSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  {studentsSortField === "status" &&
                    (studentsSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentsSort("enrollDate")}
              >
                <div className="flex items-center gap-2">
                  Enroll Date
                  {studentsSortField === "enrollDate" &&
                    (studentsSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      student.status === "Active" &&
                        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      student.status === "Inactive" &&
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                      student.status === "Pending" &&
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    )}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>{student.enrollDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);
