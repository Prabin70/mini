import React from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { coursesData } from "@/data"; // Import coursesData for type inference

interface CoursesTableProps {
  coursesFilter: string;
  setCoursesFilter: (value: string) => void;
  coursesSortField: string;
  coursesSortDirection: "asc" | "desc";
  handleCoursesSort: (field: string) => void;
  filteredCourses: typeof coursesData;
}

export const CoursesTable: React.FC<CoursesTableProps> = ({
  coursesFilter,
  setCoursesFilter,
  coursesSortField,
  coursesSortDirection,
  handleCoursesSort,
  filteredCourses,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Courses</h1>
        <p className="text-muted-foreground">Manage your course catalog</p>
      </div>
      <Button>Add Course</Button>
    </div>

    <div className="flex gap-4 items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={coursesFilter}
          onChange={(e) => setCoursesFilter(e.target.value)}
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
                onClick={() => handleCoursesSort("title")}
              >
                <div className="flex items-center gap-2">
                  Title
                  {coursesSortField === "title" &&
                    (coursesSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleCoursesSort("instructor")}
              >
                <div className="flex items-center gap-2">
                  Instructor
                  {coursesSortField === "instructor" &&
                    (coursesSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleCoursesSort("students")}
              >
                <div className="flex items-center gap-2">
                  Students
                  {coursesSortField === "students" &&
                    (coursesSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleCoursesSort("duration")}
              >
                <div className="flex items-center gap-2">
                  Duration
                  {coursesSortField === "duration" &&
                    (coursesSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleCoursesSort("price")}
              >
                <div className="flex items-center gap-2">
                  Price
                  {coursesSortField === "price" &&
                    (coursesSortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleCoursesSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  {coursesSortField === "status" &&
                    (coursesSortDirection === "asc" ? (
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
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      course.status === "Active" &&
                        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      course.status === "Draft" &&
                        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    )}
                  >
                    {course.status}
                  </span>
                </TableCell>
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
