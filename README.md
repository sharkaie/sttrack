# sttrack
Study Tracker Mangement IFSD Project

```
 CREATE TABLE classroom(
    building VARCHAR(15),
    room_number VARCHAR(7),
    capacity INT NOT NULL,
    PRIMARY KEY(building, room_number)
);
CREATE TABLE department(
    dept_name VARCHAR(50),
    building VARCHAR(15) NOT NULL,
    budget INT NOT NULL,
    PRIMARY KEY (dept_name)
);
CREATE TABLE course(
    course_id VARCHAR(8),
    title VARCHAR(50) NOT NULL,
    dept_name VARCHAR(50) NOT NULL,
    credits NUMBER(1,0) NOT NULL,
    PRIMARY KEY (course_id)
);
CREATE TABLE instructor(
    instructor_id INT,
    name VARCHAR(50) NOT NULL,
    dept_name VARCHAR(50) NOT NULL,
    salary NUMBER(7,0) NOT NULL,
    PRIMARY KEY (instructor_id),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);
CREATE TABLE time_slot(
    time_slot_id VARCHAR(4),
    day VARCHAR(1) check (day in ('M', 'T', 'W', 'R', 'F', 'S', 'U')),
    start_time VARCHAR(5),
    end_time VARCHAR(5),
    PRIMARY KEY (time_slot_id, day, start_time)
);
CREATE TABLE section(
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester VARCHAR(6),
    year number (4,0) check (year > 1701 and year < 2100),
    building VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(4),
    PRIMARY KEY (course_id, sec_id, semester, year),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (building, room_number) REFERENCES classroom(building, room_number)
);
CREATE TABLE teaches(
    instructor_id INT,
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester VARCHAR(6),
    year number (4,0) check (year > 1701 and year < 2100),
    PRIMARY KEY (instructor_id, course_id, sec_id, semester, year),
    FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section(course_id, sec_id, semester, year)
);
CREATE TABLE student(
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_name VARCHAR(50) NOT NULL,
    tot_cred NUMBER(3,0) NOT NULL,
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);
CREATE TABLE takes(
    student_id INT,
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester VARCHAR(6),
    year number (4,0) check (year > 1701 and year < 2100),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id, sec_id, semester, year),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section(course_id, sec_id, semester, year)
);
CREATE TABLE advisor(
    student_id INT PRIMARY KEY,
    instructor_id INT,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id)
);
CREATE TABLE prereq(
    course_id VARCHAR(8),
    prereq_id VARCHAR(8),
    PRIMARY KEY (course_id, prereq_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (prereq_id) REFERENCES course(course_id)
);

-- drop table prereq;
-- drop table advisor;
-- drop table takes;
-- drop table student;
-- drop table teaches;
-- drop table section;
-- drop table time_slot;
-- drop table instructor;
-- drop table course;
-- drop table department;
-- drop table classroom;


INSERT INTO classroom VALUES ('Packard', '101', 500);
INSERT INTO classroom VALUES ('Painter', '514', 10);
INSERT INTO classroom VALUES ('Taylor', '3128', 70);
INSERT INTO classroom VALUES ('Watson', '100', 30);
INSERT INTO classroom VALUES ('Watson', '120', 50);

INSERT INTO department VALUES ('Biology', 'Watson', 90000);
INSERT INTO department VALUES ('Comp. Sci.', 'Taylor', 100000);
INSERT INTO department VALUES ('Elec. Eng.', 'Taylor', 85000);
INSERT INTO department VALUES ('Finance', 'Painter', 120000);
INSERT INTO department VALUES ('History', 'Painter', 50000);
INSERT INTO department VALUES ('Music', 'Packard', 80000);
INSERT INTO department VALUES ('Physics', 'Watson', 70000);

INSERT INTO course VALUES ('BIO-101', 'Intro. to Biology', 'Biology', 4);
INSERT INTO course VALUES ('BIO-301', 'Genetics', 'Biology', 4);
INSERT INTO course VALUES ('BIO-399', 'Computational Biology', 'Biology', 3);
INSERT INTO course VALUES ('CS-101', 'Intro. to Computer Science', 'Comp. Sci.', 4);
INSERT INTO course VALUES ('CS-190', 'Game Design', 'Comp. Sci.', 4);
INSERT INTO course VALUES ('CS-315', 'Robotics', 'Comp. Sci.', 3);
INSERT INTO course VALUES ('CS-319', 'Image Processing', 'Comp. Sci.', 3);
INSERT INTO course VALUES ('CS-347', 'Database System Concepts', 'Comp. Sci.', 3);
INSERT INTO course VALUES ('EE-181', 'Intro. to Digital Systems', 'Elec. Eng.', 3);
INSERT INTO course VALUES ('FIN-201', 'Investment Banking', 'Finance', 3);
INSERT INTO course VALUES ('HIS-351', 'World History', 'History', 3);
INSERT INTO course VALUES ('MU-199', 'Music Video Production', 'Music', 3);
INSERT INTO course VALUES ('PHY-101', 'Physical Principles', 'Physics', 4);

INSERT INTO instructor VALUES (10101, 'Srinivasan', 'Comp. Sci.', 65000);
INSERT INTO instructor VALUES (12121, 'Wu', 'Finance', 90000);
INSERT INTO instructor VALUES (15151, 'Mozart', 'Music', 40000);
INSERT INTO instructor VALUES (22222, 'Einstein', 'Physics', 95000);
INSERT INTO instructor VALUES (32343, 'El Said', 'History', 60000);
INSERT INTO instructor VALUES (33456, 'Gold', 'Physics', 87000);
INSERT INTO instructor VALUES (45565, 'Katz', 'Comp. Sci.', 75000);
INSERT INTO instructor VALUES (58583, 'Califieri', 'History', 62000);
INSERT INTO instructor VALUES (76543, 'Singh', 'Finance', 80000);
INSERT INTO instructor VALUES (76766, 'Crick', 'Biology', 72000);
INSERT INTO instructor VALUES (83821, 'Brandt', 'Comp. Sci.', 92000);
INSERT INTO instructor VALUES (98345, 'Kim', 'Elec. Eng.', 80000);

INSERT INTO time_slot VALUES ('A', 'M', '8:00', '8:50');
INSERT INTO time_slot VALUES ('A', 'W', '8:00', '8:50');
INSERT INTO time_slot VALUES ('A', 'F', '8:00', '8:50');
INSERT INTO time_slot VALUES ('B', 'M', '9:00', '9:50');
INSERT INTO time_slot VALUES ('B', 'W', '9:00', '9:50');
INSERT INTO time_slot VALUES ('B', 'F', '9:00', '9:50');
INSERT INTO time_slot VALUES ('C', 'M', '11:00', '11:50');
INSERT INTO time_slot VALUES ('C', 'W', '11:00', '11:50');
INSERT INTO time_slot VALUES ('C', 'F', '11:00', '11:50');
INSERT INTO time_slot VALUES ('D', 'M', '13:00', '13:50');
INSERT INTO time_slot VALUES ('D', 'W', '13:00', '13:50');
INSERT INTO time_slot VALUES ('D', 'F', '13:00', '13:50');
INSERT INTO time_slot VALUES ('E', 'T', '10:30', '11:45');
INSERT INTO time_slot VALUES ('E', 'R', '10:30', '11:45');
INSERT INTO time_slot VALUES ('F', 'T', '14:30', '15:45');
INSERT INTO time_slot VALUES ('F', 'R', '14:30', '15:45');
INSERT INTO time_slot VALUES ('G', 'M', '16:00', '16:50');
INSERT INTO time_slot VALUES ('G', 'W', '16:00', '16:50');
INSERT INTO time_slot VALUES ('G', 'F', '16:00', '16:50');
INSERT INTO time_slot VALUES ('H', 'W', '10:00', '12:30');

INSERT INTO section VALUES ('BIO-101', '1', 'Summer', 2009, 'Painter', '514', 'B');
INSERT INTO section VALUES ('BIO-301', '1', 'Summer', 2010, 'Painter', '514', 'A');
INSERT INTO section VALUES ('CS-101', '1', 'Fall', 2009, 'Packard', '101', 'H');
INSERT INTO section VALUES ('CS-101', '1', 'Spring', 2010, 'Packard', '101', 'F');
INSERT INTO section VALUES ('CS-190', '1', 'Spring', 2009, 'Taylor', '3128', 'E');
INSERT INTO section VALUES ('CS-190', '2', 'Spring', 2009, 'Taylor', '3128', 'A');
INSERT INTO section VALUES ('CS-315', '1', 'Spring', 2010, 'Watson', '120', 'D');
INSERT INTO section VALUES ('CS-319', '1', 'Spring', 2010, 'Watson', '100', 'B');
INSERT INTO section VALUES ('CS-319', '2', 'Spring', 2010, 'Taylor', '3128', 'C');
INSERT INTO section VALUES ('CS-347', '1', 'Fall', 2009, 'Taylor', '3128', 'A');
INSERT INTO section VALUES ('EE-181', '1', 'Spring', 2009, 'Taylor', '3128', 'C');
INSERT INTO section VALUES ('FIN-201', '1', 'Spring', 2010, 'Packard', '101', 'B');
INSERT INTO section VALUES ('HIS-351', '1', 'Spring', 2010, 'Painter', '514', 'C');
INSERT INTO section VALUES ('MU-199', '1', 'Spring', 2010, 'Packard', '101', 'D');
INSERT INTO section VALUES ('PHY-101', '1', 'Fall', 2009, 'Watson', '100', 'A');

INSERT INTO teaches VALUES (10101, 'CS-101', '1', 'Fall', 2009);
INSERT INTO teaches VALUES (10101, 'CS-315', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (10101, 'CS-347', '1', 'Fall', 2009);
INSERT INTO teaches VALUES (12121, 'FIN-201', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (15151, 'MU-199', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (22222, 'PHY-101', '1', 'Fall', 2009);
INSERT INTO teaches VALUES (32343, 'HIS-351', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (45565, 'CS-101', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (45565, 'CS-319', '1', 'Spring', 2010);
INSERT INTO teaches VALUES (76766, 'BIO-101', '1', 'Summer', 2009);
INSERT INTO teaches VALUES (76766, 'BIO-301', '1', 'Summer', 2010);
INSERT INTO teaches VALUES (83821, 'CS-190', '1', 'Spring', 2009);
INSERT INTO teaches VALUES (83821, 'CS-190', '2', 'Spring', 2009);
INSERT INTO teaches VALUES (83821, 'CS-319', '2', 'Spring', 2010);
INSERT INTO teaches VALUES (98345, 'EE-181', '1', 'Spring', 2009);

INSERT INTO student VALUES (00128, 'Zhang', 'Comp. Sci.', 102);
INSERT INTO student VALUES (12345, 'Shankar', 'Comp. Sci.', 32);
INSERT INTO student VALUES (19991, 'Brandt', 'History', 80);
INSERT INTO student VALUES (23121, 'Chavez', 'Finance', 110);
INSERT INTO student VALUES (44553, 'Peltier', 'Physics', 56);
INSERT INTO student VALUES (45678, 'Levy', 'Physics', 46);
INSERT INTO student VALUES (54321, 'Williams', 'Comp. Sci.', 54);
INSERT INTO student VALUES (55739, 'Sanchez', 'Music', 38);
INSERT INTO student VALUES (70557, 'Snow', 'Physics', 0);
INSERT INTO student VALUES (76543, 'Brown', 'Comp. Sci.', 58);
INSERT INTO student VALUES (76653, 'Aoi', 'Elec. Eng.', 60);
INSERT INTO student VALUES (98765, 'Bourikas', 'Elec. Eng.', 98);
INSERT INTO student VALUES (98988, 'Tanaka', 'Biology', 120);

INSERT INTO takes VALUES (00128, 'CS-101', '1', 'Fall', 2009, 'A');
INSERT INTO takes VALUES (00128, 'CS-347', '1', 'Fall', 2009, 'A-');
INSERT INTO takes VALUES (12345, 'CS-101', '1', 'Fall', 2009, 'C');
INSERT INTO takes VALUES (12345, 'CS-190', '2', 'Spring', 2009, 'A');
INSERT INTO takes VALUES (12345, 'CS-315', '1', 'Spring', 2010, 'A');
INSERT INTO takes VALUES (12345, 'CS-347', '1', 'Fall', 2009, 'A');
INSERT INTO takes VALUES (19991, 'HIS-351', '1', 'Spring', 2010, 'B');
INSERT INTO takes VALUES (23121, 'FIN-201', '1', 'Spring', 2010, 'C+');
INSERT INTO takes VALUES (44553, 'PHY-101', '1', 'Fall', 2009, 'B-');
INSERT INTO takes VALUES (45678, 'CS-101', '1', 'Fall', 2009, 'F');
INSERT INTO takes VALUES (45678, 'CS-101', '1', 'Spring', 2010, 'B+');
INSERT INTO takes VALUES (45678, 'CS-319', '1', 'Spring', 2010, 'B');
INSERT INTO takes VALUES (54321, 'CS-101', '1', 'Fall', 2009, 'A-');
INSERT INTO takes VALUES (54321, 'CS-190', '2', 'Spring', 2009, 'B+');
INSERT INTO takes VALUES (55739, 'MU-199', '1', 'Spring', 2010, 'A-');
INSERT INTO takes VALUES (76543, 'CS-101', '1', 'Fall', 2009, 'A');
INSERT INTO takes VALUES (76543, 'CS-319', '2', 'Spring', 2010, 'A');
INSERT INTO takes VALUES (76653, 'EE-181', '1', 'Spring', 2009, 'C');
INSERT INTO takes VALUES (98765, 'CS-101', '1', 'Fall', 2009, 'C-');
INSERT INTO takes VALUES (98765, 'CS-315', '1', 'Spring', 2010, 'B');
INSERT INTO takes VALUES (98988, 'BIO-101', '1', 'Summer', 2009, 'A');
INSERT INTO takes VALUES (98988, 'BIO-301', '1', 'Summer', 2010, null);

INSERT INTO advisor VALUES (00128, 45565);
INSERT INTO advisor VALUES (12345, 10101);
INSERT INTO advisor VALUES (23121, 76543);
INSERT INTO advisor VALUES (44553, 22222);
INSERT INTO advisor VALUES (45678, 22222);
INSERT INTO advisor VALUES (76543, 45565);
INSERT INTO advisor VALUES (76653, 98345);
INSERT INTO advisor VALUES (98765, 98345);
INSERT INTO advisor VALUES (98988, 76766);

INSERT INTO prereq VALUES ('BIO-301', 'BIO-101');
INSERT INTO prereq VALUES ('BIO-399', 'BIO-101');
INSERT INTO prereq VALUES ('CS-190', 'CS-101');
INSERT INTO prereq VALUES ('CS-315', 'CS-101');
INSERT INTO prereq VALUES ('CS-319', 'CS-101');
INSERT INTO prereq VALUES ('CS-347', 'CS-101');
INSERT INTO prereq VALUES ('EE-181', 'PHY-101');



-- Alter the datatypes of any 3 columns
ALTER TABLE department MODIFY building CHAR(15);
ALTER TABLE student MODIFY name CHAR(50);
ALTER TABLE course MODIFY title CHAR(50);


-- Increase salary of each intructor by 10% of comp.sci department
UPDATE instructor SET salary = salary * 1.1 WHERE dept_name = 'Comp. Sci.';

-- Delete all courses that have never been offered
DELETE FROM course WHERE course_id NOT IN (SELECT course_id FROM section);

-- Delete all tuples in the instructor relation for those instructors associated with a department located in the Bren Building.
INSERT INTO department VALUES ('Comp. Tech.', 'Bren', 80000);
INSERT INTO department VALUES ('Quantum Phy.', 'Wayen Tower', 100000);
INSERT INTO instructor VALUES (11111, 'John', 'Comp. Tech.', 80000);

DELETE FROM instructor WHERE dept_name IN (SELECT dept_name FROM department WHERE building = 'Bren');

-- Give a 5% salary raise to those instructors who earn less than 70000
UPDATE instructor SET salary = salary * 1.05 WHERE salary < 70000;

-- a. Create a new course "CS-001", titled "Weekly Seminar", with 1 credits.
INSERT INTO course VALUES ('CS-001', 'Weekly Seminar', 'Comp. Sci.', 1);

-- b. Create a section of this course in Fall 2017, with sec_id of 1, and with the location of this section not yet specified.
INSERT INTO section VALUES ('CS-001', '1', 'Fall', 2017, null, null, null);

-- c. Delete the course CS-001. What will happen if you run this delete statement without first deleting offerings (sections) of this course?
DELETE FROM course WHERE course_id = 'CS-001';
-- It will throw an error because of the foreign key constraint

--From a given set of any relational tables, perform the following Creating Views (with and without check option, with and without read only), Dropping views, Selecting from a view
CREATE VIEW student_view AS SELECT * FROM student;
CREATE VIEW student_view_check AS SELECT * FROM student WHERE tot_cred > 100 WITH CHECK OPTION;
CREATE VIEW student_view_read_only AS SELECT * FROM student WHERE tot_cred > 100 WITH READ ONLY;
DROP VIEW student_view;
SELECT * FROM student_view;
SELECT * FROM student_view_check;
SELECT * FROM student_view_read_only;

-- Create any table, use sequence for insertion of the rows and drop the sequence.
CREATE TABLE table10(
    id INT,
    name VARCHAR(50)
);
CREATE SEQUENCE table10_seq;
INSERT INTO table10 VALUES (table10.nextval, 'test');
DROP SEQUENCE tabmodifyle10_seq;

-- Rename the above table.
ALTER TABLE table10 RENAME TO tab10;

-- Add a new column PINCODE with not null constraints to the above existing table.
DELETE FROM tab10 WHERE id = 1;
ALTER TABLE tab10 ADD pincode INT NOT NULL;

-- Drop the column with the use cascade constraints.
ALTER TABLE tab10 DROP COLUMN pincode CASCADE CONSTRAINTS;


-- 3. Write and execute SQL functions- aggregate, numeric, date, string, and
-- conversion for the following queries:
-- a) Find the average salary of instructors in the Computer Science department.
SELECT AVG(salary) FROM instructor WHERE dept_name = 'Comp. Sci.';

-- b) Find the average salary in each department.
SELECT dept_name, AVG(salary) FROM instructor GROUP BY dept_name;

-- c) What is the total salary of all teachers earning more than 30K?
SELECT SUM(salary) FROM instructor WHERE salary > 30000;

-- d) List the number of students enrolled in each course
SELECT course_id, COUNT(*) FROM takes GROUP BY course_id;

-- e) Find the names of all departments whose building name include the substring “Symbio”.
SELECT dept_name FROM department WHERE building LIKE '%Symbio%';

-- f) Find the names of the departments whose names contain the string “sci” as a substring, regardless the case.
SELECT dept_name FROM department WHERE UPPER(dept_name) LIKE '%SCI%';

-- g) Display the length of the name of all the students.
SELECT name, LENGTH(name) FROM student;

-- h) Retrieve total number of instructors.
SELECT COUNT(*) FROM instructor;

-- i) Add hiredate column in the instructor table. Insert 4 rows in the table. Display the names of instructor who are working for the past 5 years.
ALTER TABLE instructor ADD hiredate DATE;
INSERT INTO instructor VALUES (11111, 'Johnny', 'Music', 80000, '01-JAN-2012');
INSERT INTO instructor VALUES (25896, 'Einstein', 'Physics', 95000, '01-JAN-2015');
INSERT INTO instructor VALUES (33333, 'Mozart', 'Music', 40000, '01-JAN-2016');
INSERT INTO instructor VALUES (44444, 'El Said', 'History', 60000, '01-JAN-2006');
SELECT name FROM instructor WHERE hiredate < SYSDATE - 5*365;

-- j) Display the list of instructor who have joined before 30th June 90 or after 31st Dec 90.
SELECT name FROM instructor WHERE hiredate < TO_DATE('30-JUN-1990', 'DD-MM-YYYY') OR hiredate > TO_DATE('31-DEC-1990', 'DD-MM-YYYY');

-- k) Display name of those instructors who are going to retire 01-Jan-24. If the maximum job is period is 18 years.
SELECT name FROM instructor WHERE hiredate = ADD_MONTHS(TO_DATE('01-JAN-2024', 'DD-MM-YYYY'), -18*12);

-- l) Display those instructors whose salary contains at least 4 digits.
SELECT name FROM instructor WHERE salary LIKE '____%';

-- m) Print a list of instructors displaying ‘Less Salary’ if less than 60000 if exactly 60000 display as ‘Exact Salary’ and if greater than 60000 display 'More Salary'.
SELECT name, CASE WHEN salary < 60000 THEN 'Less Salary' WHEN salary = 60000 THEN 'Exact Salary' ELSE 'More Salary' END FROM instructor;

-- n) Display names of all the instructors concatenated with their department names.
SELECT name||' '||dept_name FROM instructor;

-- o) Retrieve distinct number of instructors.
SELECT COUNT(DISTINCT instructor_id) FROM instructor;

-- p) Find the names of all instructors whose salary is greater than at least one instructor in the Biology department.
SELECT name FROM instructor WHERE salary > ANY (SELECT salary FROM instructor WHERE dept_name = 'Biology');


-- Q.4. Write and execute SQL queries- Operators (and, or, not, like, between, in):
-- Display all employee names that starts with "a" and are at least 3 characters in length.
SELECT ename FROM emp WHERE UPPER(ename) LIKE 'A__%';

-- Display departments having Dallas, New York and Chicago locations.
SELECT deptno, dname FROM dept WHERE UPPER(loc) IN ('DALLAS', 'NEW YORK', 'CHICAGO');

-- Display the names of employees who are working as clerk, salesman or analyst and drawing a salary more than 3000.
SELECT ename from emp WHERE job IN ('CLERK', 'SALESMAN', 'ANALYST') AND sal > 3000;

-- Display the names of employees who are not working as managers.
SELECT ename FROM emp WHERE job NOT IN ('MANAGER');

-- Display the name of emp who earns highest salary
SELECT ename FROM emp WHERE sal = (SELECT MAX(sal) FROM emp);

-- Display the employee number and name of employee working as CLERK and earning highest salary among CLERKS.
SELECT empno, ename FROM emp WHERE job = 'CLERK' AND sal = (SELECT MAX(sal) FROM emp WHERE job = 'CLERK');

-- Display the names of clerks who earn salary more than that of James of that of sal lesser than that of Scott.
SELECT ename FROM emp WHERE job = 'CLERK' AND sal > (SELECT sal FROM emp WHERE ename = 'JAMES') AND sal < (SELECT sal FROM emp WHERE ename = 'SCOTT');

-- Display the names of the employees who earn highest salary in their respective departments.
SELECT ename FROM emp WHERE sal = (SELECT MAX(sal) FROM emp WHERE deptno = emp.deptno);

-- Display those employees who are working in the same dept where his manager is working.
SELECT ename, job, deptno FROM emp WHERE deptno IN (SELECT deptno FROM emp WHERE job = 'MANAGER') AND job != 'MANAGER';

-- 5. To study and execute different joins in SQL.
SELECT e1.ename||' works for '||e2.ename FROM emp e1, emp e2 WHERE e1.mgr = e2.empno;

SELECT * FROM emp INNER JOIN dept ON emp.deptno = dept.deptno;

SELECT * FROM emp LEFT OUTER JOIN dept ON emp.deptno = dept.deptno;

SELECT * FROM emp RIGHT OUTER JOIN dept ON emp.deptno = dept.deptno;

SELECT * FROM emp FULL OUTER JOIN dept ON emp.deptno = dept.deptno;

SELECT * FROM emp CROSS JOIN dept;

-- 6. To study PL/SQL Procedure and write procedures for:
-- i. Swapping of two numbers without using third variable,
-- CREATE OR REPLACE PROCEDURE swap_numbers(
--     i IN OUT NUMBER,
--     j IN OUT NUMBER
-- ) IS
-- BEGIN
--     i := i + j;
--     j := i - j;
--     i := i - j;
-- END;
DECLARE
    num1 NUMBER := &num1;
    num2 NUMBER := &num2;
BEGIN
    dbms_output.put_line('Before swapping: num1 = ' || num1 || ', num2 = ' || num2);
    num1 := num1 + num2;
    num2 := num1 - num2;
    num1 := num1 - num2;
    dbms_output.put_line('After swapping: num1 = ' || num1 || ', num2 = ' || num2);
END;
/

-- ii. Largest amongst three numbers.
DECLARE 
    num1 NUMBER := &num1;
    num2 NUMBER := &num2;
    num3 NUMBER := &num3;
    max_num NUMBER;
BEGIN
    IF num1 > num2 THEN
        max_num := num1;
    ELSE
        max_num := num2;
    END IF;
    IF num3 > max_num THEN
        max_num := num3;
    END IF;
    dbms_output.put_line('Largest number is ' || max_num);
END;

-- iii. Area of circle by radius as an argument.
DECLARE
    radius NUMBER := &radius;
    area NUMBER;
BEGIN
    area := 3.14 * radius * radius;
    dbms_output.put_line('Area of circle with radius ' || radius || ' is ' || area);
END;


-- 7. To study Control loops in PL/SQL
-- i. Sum of first 10 numbers using while loop.
CREATE OR REPLACE PROCEDURE sum_first_10_numbers(
    sum OUT NUMBER
) IS
    i NUMBER := 1;
BEGIN
    sum := 0;
    WHILE i <= 10 LOOP
        sum := sum + i;
        i := i + 1;
    END LOOP;
END;

-- ii. Sum of first 10 even numbers using for loop.
CREATE OR REPLACE PROCEDURE sum_first_10_even_numbers(
    sum OUT NUMBER
) IS
BEGIN
    sum := 0;
    FOR i IN 1..10 LOOP
        IF i MOD 2 = 0 THEN
            sum := sum + i;
        END IF;
    END LOOP;
END;

-- 8. Consider an examination system. It will accept the marks of 4 subjects.Write a procedure which will find the total and average of 4 subjects and display the grade.
CREATE OR REPLACE PROCEDURE grade(
    sub1 IN NUMBER,
    sub2 IN NUMBER,
    sub3 IN NUMBER,
    sub4 IN NUMBER
) IS
    total NUMBER := sub1 + sub2 + sub3 + sub4;
    avg_marks NUMBER := total / 4;
BEGIN
    dbms_output.put_line('Total marks: ' || total);
    dbms_output.put_line('Average marks: ' || avg_marks);
    IF avg_marks >= 90 THEN
        dbms_output.put_line('Grade: A');
    ELSIF avg_marks >= 80 THEN
        dbms_output.put_line('Grade: B');
    ELSIF avg_marks >= 70 THEN
        dbms_output.put_line('Grade: C');
    ELSIF avg_marks >= 60 THEN
        dbms_output.put_line('Grade: D');
    ELSE
        dbms_output.put_line('Grade: F');
    END IF;
END;

-- 9. Consider any Airline Reservation System. Design a database containing tables/fields as route_id, origin, destination, fare,distance, capacity. Write a procedure to satisfy the following conditions accepting the route_id as the user input.
CREATE TABLE route(
    route_id INT PRIMARY KEY,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    fare INT NOT NULL,
    distance INT NOT NULL,
    capacity INT NOT NULL
);

INSERT INTO route VALUES (1, 'Delhi', 'Mumbai', 5000, 1000, 100);
INSERT INTO route VALUES (2, 'Delhi', 'Kolkata', 4000, 800, 100);
INSERT INTO route VALUES (3, 'Delhi', 'Chennai', 6000, 1200, 100);
INSERT INTO route VALUES (4, 'Mumbai', 'Kolkata', 3000, 600, 100);
INSERT INTO route VALUES (5, 'Mumbai', 'Chennai', 4000, 800, 100);
INSERT INTO route VALUES (6, 'Kolkata', 'Chennai', 2000, 400, 100);
INSERT INTO route VALUES (7, 'Kolkata', 'Delhi', 2000, 400, 100);

-- i. If the distance is less than 500 then update the fare to be 190.98
CREATE OR REPLACE PROCEDURE update_fare(
    route_id IN NUMBER
) IS
BEGIN
    UPDATE route SET fare = 190.98 WHERE route_id = route_id AND distance < 500;
END;

-- ii. If the distance is between 501-1000 then update fare to be 876
CREATE OR REPLACE PROCEDURE update_fare2(
    route_id IN NUMBER
) IS
BEGIN
    UPDATE route SET fare = 876 WHERE route_id = route_id AND distance BETWEEN 501 AND 1000;
END;

-- iii. If the distance is greater than 1000 then display a message.
CREATE OR REPLACE PROCEDURE update_fare3(
    route_id IN NUMBER
) IS
BEGIN
    dbms_output.put_line('Distance is 1000 Kms');
END;





CREATE TABLE VEDANT_ROUTE_HEADER
  (
  ROUTE_ID INTEGER,
  ORIGIN VARCHAR(20),
  DESTINATION VARCHAR(20),
  FARE INTEGER,
  DISTANCE INTEGER,
  CAPACITY INTEGER
  );




INSERT INTO VEDANT_ROUTE_HEADER VALUES(102,'TRICHY','MADHURAI',33,450,56);
INSERT INTO VEDANT_ROUTE_HEADER VALUES(103,'MADHURAI','MADRAS',35,250,50);
INSERT INTO VEDANT_ROUTE_HEADER VALUES(104,'MAHURAI','MADRAS',35,250,50);
INSERT INTO VEDANT_ROUTE_HEADER VALUES(105,'MAHURAI','MADRAS',35,250,50);



-- 10)Write a PL\SQL procedure to demonstrate the use of Exceptions for the above
-- case study.
CREATE OR REPLACE PROCEDURE VEDANT_FARE_CAL
(V_ROUTE_ID VEDANT_ROUTE_HEADER.ROUTE_ID%TYPE)
AS
D VEDANT_ROUTE_HEADER.DISTANCE%TYPE;
BEGIN
dbms_output.put_line('Program run by VEDANT and PRN no. 21070521108');
SELECT DISTANCE INTO D FROM VEDANT_ROUTE_HEADER WHERE ROUTE_ID=V_ROUTE_ID;
IF(D<500) THEN
UPDATE VEDANT_ROUTE_HEADER SET FARE=191 WHERE ROUTE_ID=V_ROUTE_ID;
ELSIF (D>500 AND D<1000) THEN
UPDATE VEDANT_ROUTE_HEADER SET FARE =876 WHERE ROUTE_ID =V_ROUTE_ID;
ELSE
DBMS_OUTPUT.PUT_LINE('NO FARE SET');
END IF;

EXCEPTION
	WHEN no_data_found THEN
		dbms_output.put_line('No such route exists');
	WHEN others THEN
		dbms_output.put_line('Error!');
END;
/

EXECUTE VEDANT_FARE_CAL(102);

SQL> CREATE OR REPLACE PROCEDURE VEDANT_FARE_CAL
  2  (V_ROUTE_ID VEDANT_ROUTE_HEADER.ROUTE_ID%TYPE)
  3  AS
  4  D VEDANT_ROUTE_HEADER.DISTANCE%TYPE;
  5  BEGIN
  6  dbms_output.put_line('Program run by VEDANT and PRN no. 21070521108');
  7  SELECT DISTANCE INTO D FROM VEDANT_ROUTE_HEADER WHERE ROUTE_ID=V_ROUTE_ID;
  8  IF(D<500) THEN
  9  UPDATE VEDANT_ROUTE_HEADER SET FARE=191 WHERE ROUTE_ID=V_ROUTE_ID;
 10  ELSIF (D>500 AND D<1000) THEN
 11  UPDATE VEDANT_ROUTE_HEADER SET FARE =876 WHERE ROUTE_ID =V_ROUTE_ID;
 12  ELSE
 13  DBMS_OUTPUT.PUT_LINE('NO FARE SET');
 14  END IF;
 15
 16  EXCEPTION
 17     WHEN no_data_found THEN
 18             dbms_output.put_line('No such route exists');
 19     WHEN others THEN
 20             dbms_output.put_line('Error!');
 21  END;
 22  /

Procedure created.
SQL> EXECUTE VEDANT_FARE_CAL(10);
Program run by VEDANT and PRN no. 21070521108
No such route exists
PL/SQL procedure successfully completed.



-- 11)Write a PL/SQL function to find the reverse of a number.
CREATE or REPLACE function rev_num(n1 in NUMBER)
RETURN NUMBER
AS
rev NUMBER;
num NUMBER;
BEGIN
num:=n1;
rev:=0;

WHILE num > 0 LOOP
rev:=(rev*10) + mod(num,10);
num:=floor(num/10);
END LOOP;

dbms_output.put_line('Reverse of the number is: ' || rev);
RETURN rev;
END;
/

-- SQL> CREATE or REPLACE function rev_num(n1 in NUMBER)
--   2  RETURN NUMBER
--   3  AS
--   4  rev NUMBER;
--   5  num NUMBER;
--   6  BEGIN
--   7  num:=n1;
--   8  rev:=0;
--   9
--  10  WHILE num > 0 LOOP
--  11  rev:=(rev*10) + mod(num,10);
--  12  num:=floor(num/10);
--  13  END LOOP;
--  14
--  15  dbms_output.put_line('Reverse of the number is: ' || rev);
--  16  RETURN rev;
--  17  END;
--  18  /
-- Function created.

-- SQL> SELECT rev_num(1234) FROM dual;
-- REV_NUM(1234)
-- -------------
--          4321
-- Reverse of the number is: 4321



-- 12)1  To find the largest number amongst given two numbers.
CREATE or REPLACE function largest_among_two(n1 number, n2 number)
RETURN number
AS
res number;
BEGIN 
IF n1 > n2 THEN
	res:=n1;
ELSE
	res:=n2;
END IF;

RETURN res;
END;
/

DECLARE
a number;
b number;
c number;
BEGIN
a:=50;
b:=34;

c:=largest_among_two(a,b);
dbms_output.put_line('Largest of (50,34): ' || c);
dbms_output.put_line('Program created by VEDANT BHOYAR 21070521108');
END;
/

SQL> CREATE or REPLACE function largest_among_two(n1 number, n2 number)
  2  RETURN number
  3  AS
  4  res number;
  5  BEGIN
  6  IF n1 > n2 THEN
  7     res:=n1;
  8  ELSE
  9     res:=n2;
 10  END IF;
 11
 12  RETURN res;
 13  END;
 14  /

Function created.

SQL> DECLARE
  2  a number;
  3  b number;
  4  c number;
  5  BEGIN
  6  a:=50;
  7  b:=34;
  8
  9  c:=largest_among_two(a,b);
 10  dbms_output.put_line('Largest of (50,34): ' || c);
 11  dbms_output.put_line('Program created by VEDANT BHOYAR 21070521108');
 12  END;
 13  /
Largest of (50,34): 50
Program created by VEDANT BHOYAR 21070521108

-- 12)2 To find the total number of employees from emp relation given the employee
-- number.

CREATE or REPLACE function total_emp
RETURN number
AS
v_count number;
BEGIN 
select count(*) into v_count from emp;
RETURN v_count;
END; 
/

BEGIN 
dbms_output.put_line('Total number of employees are: ' || total_emp);
dbms_output.put_line('Program created by Vedant Bhoyar 21070521108');
END;
/

-- SQL> CREATE or REPLACE function total_emp
--   2  RETURN number
--   3  AS
--   4  v_count number;
--   5  BEGIN
--   6  select count(*) into v_count from emp;
--   7  RETURN v_count;
--   8  END;
--   9  /

-- Function created.

-- SQL> BEGIN
--   2  dbms_output.put_line('Total number of employees are: ' || total_emp);
--   3  dbms_output.put_line('Program created by Vedant Bhoyar 21070521108');
--   4  END;
--   5  /
-- Total number of employees are: 14
-- Program created by Vedant Bhoyar 21070521108

-- 12)3 To return the email id of the employee consisting of firstname and lastname.
CREATE OR REPLACE FUNCTION EMPLOYEE_EMAIL(V_FIRSTNAME VARCHAR2, V_LASTNAME VARCHAR2) RETURN VARCHAR2 AS V_EMPLOYEE_EMAIL VARCHAR2(100);
BEGIN
V_EMPLOYEE_EMAIL := V_FIRSTNAME || '.' || V_LASTNAME || '@kodecs.in'; 
RETURN V_EMPLOYEE_EMAIL;
END;
/

DECLARE
EmployeeEmail VARCHAR2(100);
BEGIN
 EmployeeEmail := EMPLOYEE_EMAIL('Vedant', 'Bhoyar');
 dbms_output.put_line('Program run by Vedant Bhoyar 21070521108');
 DBMS_OUTPUT.PUT_LINE(EmployeeEmail);
END;
/

SQL> CREATE OR REPLACE FUNCTION EMPLOYEE_EMAIL
(V_FIRSTNAME VARCHAR2, V_LASTNAME VARCHAR2)
RETURN VARCHAR2 AS V_EMPLOYEE_EMAIL VARCHAR2(100);
  2  BEGIN
  3  V_EMPLOYEE_EMAIL := V_FIRSTNAME || '.' || V_LASTNAME || '@kodecs.in';
  4  RETURN V_EMPLOYEE_EMAIL;
  5  END;
  6  /

Function created.

SQL> DECLARE
  2  EmployeeEmail VARCHAR2(100);
  3  BEGIN
  4   EmployeeEmail := EMPLOYEE_EMAIL('Vedant', 'Bhoyar');
  5   dbms_output.put_line('Program run by Vedant Bhoyar 21070521108');
  6   DBMS_OUTPUT.PUT_LINE(EmployeeEmail);
  7  END;
  8  /
Program run by Vedant Bhoyar 21070521108
Vedant.Bhoyar@kodecs.in


-- 13) Write a trigger to demonstrate the use of Row level trigger and Statement level
-- trigger.

CREATE OR REPLACE TRIGGER case_tr_insr_del_up
BEFORE INSERT
on VEDANT_ROUTE_HEADER
FOR each ROW
BEGIN 
	:new.origin := upper(:new.origin);
	:new.destination := upper(:new.destination);
END;
/

-- INSERT
INSERT INTO VEDANT_ROUTE_HEADER VALUES(6, 'Nagpur', 'Bangalore', 1000, 900, 250);


CREATE OR REPLACE TRIGGER tableselector_tr_insr_del_up
BEFORE INSERT OR DELETE OR UPDATE
ON VEDANT_ROUTE_HEADER
BEGIN 
dbms_output.put_line('Statement got triggered');
END;
/

INSERT INTO VEDANT_ROUTE_HEADER VALUES(7, 'Nagpur', 'Odisha', 800, 750, 100);

SQL> CREATE OR REPLACE TRIGGER case_tr_insr_del_up
  2  BEFORE INSERT
  3  on VEDANT_ROUTE_HEADER
  4  FOR each ROW
  5  BEGIN
  6     :new.origin := upper(:new.origin);
  7     :new.destination := upper(:new.destination);
  8  END;
  9  /

Trigger created.

SQL> INSERT INTO VEDANT_ROUTE_HEADER VALUES(6, 'Nagpur', 'Bangalore', 1000, 900, 250);

1 row created.

SQL> CREATE OR REPLACE TRIGGER tableselector_tr_insr_del_up
  2  BEFORE INSERT OR DELETE OR UPDATE
  3  ON VEDANT_ROUTE_HEADER
  4  BEGIN
  5  dbms_output.put_line('Statement got triggered');
  6  END;
  7  /

Trigger created.

SQL> INSERT INTO VEDANT_ROUTE_HEADER VALUES(7, 'Nagpur', 'Odisha', 800, 750, 100);
Statement got triggered

1 row created.

SQL> SELECT * FROM VEDANT_ROUTE_HEADER;

  ROUTE_ID ORIGIN               DESTINATION                FARE   DISTANCE   CAPACITY
---------- -------------------- -------------------- ---------- ---------- ----------
       102 TRICHY               MADHURAI                    191        450         56
       103 MADHURAI             MADRAS                       35        250         50
       104 MAHURAI              MADRAS                       35        250         50
       105 MAHURAI              MADRAS                       35        250         50
         6 NAGPUR               BANGALORE                  1000        900        250
         7 NAGPUR               ODISHA                      800        750        100

6 rows selected.

-- 14)1
CREATE OR REPLACE TRIGGER case_tr_insr_del_up
BEFORE INSERT
ON VEDANT_ROUTE_HEADER
FOR each ROW
BEGIN 
    :new.origin := upper(:new.origin);
    :new.destination := upper(:new.destination);
END;
/

INSERT INTO VEDANT_ROUTE_HEADER VALUES(8, 'Nagpur', 'Delhi', 1000, 1200, 250);

SELECT * FROM VEDANT_ROUTE_HEADER;

SQL> CREATE OR REPLACE TRIGGER case_tr_insr_del_up
  2  BEFORE INSERT
  3  ON VEDANT_ROUTE_HEADER
  4  FOR each ROW
  5  BEGIN
  6      :new.origin := upper(:new.origin);
  7      :new.destination := upper(:new.destination);
  8  END;
  9  /

Trigger created.

SQL> INSERT INTO VEDANT_ROUTE_HEADER VALUES(8, 'Nagpur', 'Delhi', 1000, 1200, 250);
Statement got triggered

1 row created.

SQL> SELECT * FROM VEDANT_ROUTE_HEADER;

  ROUTE_ID ORIGIN               DESTINATION                FARE   DISTANCE   CAPACITY
---------- -------------------- -------------------- ---------- ---------- ----------
       102 TRICHY               MADHURAI                    191        450         56
       103 MADHURAI             MADRAS                       35        250         50
       104 MAHURAI              MADRAS                       35        250         50
       105 MAHURAI              MADRAS                       35        250         50
         6 NAGPUR               BANGALORE                  1000        900        250
         7 NAGPUR               ODISHA                      800        750        100
         8 NAGPUR               DELHI                      1000       1200        250

7 rows selected.


-- 14)2
CREATE OR REPLACE TRIGGER reduce_capacity_insr_del_up
BEFORE UPDATE
ON VEDANT_ROUTE_HEADER
FOR each ROW
BEGIN
    IF(:new.CAPACITY < :old.CAPACITY) then
        raise_application_error(-20001, 'Sorry! capacity cannot be reduced');
    END IF;
END;
/

UPDATE VEDANT_ROUTE_HEADER SET CAPACITY=200 WHERE ROUTE_ID=8;

SQL> CREATE OR REPLACE TRIGGER reduce_capacity_insr_del_up
  2  BEFORE UPDATE
  3  ON VEDANT_ROUTE_HEADER
  4  FOR each ROW
  5  BEGIN
  6      IF(:new.CAPACITY < :old.CAPACITY) then
  7          raise_application_error(-20001, 'Sorry! capacity cannot be reduced');
  8      END IF;
  9  END;
 10  /

Trigger created.

SQL> UPDATE VEDANT_ROUTE_HEADER SET CAPACITY=200 WHERE ROUTE_ID=8;
Statement got triggered
UPDATE VEDANT_ROUTE_HEADER SET CAPACITY=200 WHERE ROUTE_ID=8
       *
ERROR at line 1:
ORA-20001: Sorry! capacity cannot be reduced
ORA-06512: at "SCOTT.REDUCE_CAPACITY_INSR_DEL_UP", line 3
ORA-04088: error during execution of trigger 'SCOTT.REDUCE_CAPACITY_INSR_DEL_UP'


-- 15)

CREATE TABLE PERSON (
PersonID INT PRIMARY KEY,
Fname VARCHAR(50),
Lname VARCHAR(50),
PhoneNumber VARCHAR(20),
City VARCHAR(50),
TaxIdentifier VARCHAR(20)
);

CREATE OR REPLACE TRIGGER weekday_operations
BEFORE INSERT OR UPDATE OR DELETE ON PERSON
FOR EACH ROW
DECLARE
    current_day NUMBER;
BEGIN
    SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'D')) INTO current_day FROM dual;
    
    IF current_day IN (1, 4) THEN
        RAISE_APPLICATION_ERROR(-20001, 'Cannot perform operations on weekends');
    END IF;
END;
/


INSERT INTO PERSON VALUES(1, 'Vedant', 'Bhoyar','1234567890', 'Nagpur', 'MHRT2');


-- SQL> CREATE TABLE PERSON (
--   2  PersonID INT PRIMARY KEY,
--   3  Fname VARCHAR(50),
--   4  Lname VARCHAR(50),
--   5  PhoneNumber VARCHAR(20),
--   6  City VARCHAR(50),
--   7  TaxIdentifier VARCHAR(20)
--   8  );

-- Table created.

-- SQL> CREATE OR REPLACE TRIGGER weekday_operations
--   2  BEFORE INSERT OR UPDATE OR DELETE ON PERSON
--   3  FOR EACH ROW
--   4  DECLARE
--   5      current_day NUMBER;
--   6  BEGIN
--   7      SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'D')) INTO current_day FROM dual;
--   8
--   9      IF current_day IN (1, 4) THEN
--  10          RAISE_APPLICATION_ERROR(-20001, 'Cannot perform operations on weekends');
--  11      END IF;
--  12  END;
--  13  /

-- Trigger created.

-- SQL> INSERT INTO PERSON VALUES(1, 'Vedant', 'Bhoyar','1234567890', 'Nagpur', 'MHRT2');
-- INSERT INTO PERSON VALUES(1, 'Vedant', 'Bhoyar','1234567890', 'Nagpur', 'MHRT2')
--             *
-- ERROR at line 1:
-- ORA-20001: Cannot perform operations on weekends
-- ORA-06512: at "SCOTT.WEEKDAY_OPERATIONS", line 7
-- ORA-04088: error during execution of trigger 'SCOTT.WEEKDAY_OPERATIONS'


-- 16)
CREATE OR REPLACE TRIGGER salary_check
BEFORE INSERT ON EMP
FOR EACH ROW
DECLARE
    v_min_salary NUMBER;
    v_max_salary NUMBER;
BEGIN
    SELECT MIN(sal) INTO v_min_salary FROM EMP;
    SELECT MAX(sal) INTO v_max_salary FROM EMP;

    IF :new.sal > (v_min_salary * 10) OR :new.sal < (v_max_salary / 10) THEN
        RAISE_APPLICATION_ERROR(-20001, 'Salary is not within the allowed range.');
    END IF;
END;
/


INSERT INTO EMP VALUES(7370, 'JHON', 'SECRETARY', 7839, '17-JAN-22', 50000, 300, 10);

-- SQL> CREATE OR REPLACE TRIGGER salary_check
--   2  BEFORE INSERT ON EMP
--   3  FOR EACH ROW
--   4  DECLARE
--   5      v_min_salary NUMBER;
--   6      v_max_salary NUMBER;
--   7  BEGIN
--   8      SELECT MIN(sal) INTO v_min_salary FROM EMP;
--   9      SELECT MAX(sal) INTO v_max_salary FROM EMP;
--  10
--  11      IF :new.sal > (v_min_salary * 10) OR :new.sal < (v_max_salary / 10) THEN
--  12          RAISE_APPLICATION_ERROR(-20001, 'Salary is not within the allowed range.');
--  13      END IF;
--  14  END;
--  15  /

-- Trigger created.

-- SQL> INSERT INTO EMP VALUES(7370, 'JHON', 'SECRETARY', 7839, '17-JAN-22', 50000, 300, 10);
-- INSERT INTO EMP VALUES(7370, 'JHON', 'SECRETARY', 7839, '17-JAN-22', 50000, 300, 10)
--             *
-- ERROR at line 1:
-- ORA-20001: Salary is not within the allowed range.
-- ORA-06512: at "SCOTT.SALARY_CHECK", line 9
-- ORA-04088: error during execution of trigger 'SCOTT.SALARY_CHECK'


CREATE TABLE AUDIT_EMP(
    EMPNO INT PRIMARY KEY,
    ENAME VARCHAR(10),
    JOB VARCHAR(9),
    MGR INT,
    HIREDATE DATE,
    SAL INT,
    COMM INT,
    DEPTNO INT,
    OPERATION VARCHAR(10),
    USER_NAME VARCHAR(30)
);

-- 17)
CREATE OR REPLACE TRIGGER emp_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON EMP
FOR EACH ROW
DECLARE
    operation_type VARCHAR2(10);
BEGIN

    IF INSERTING THEN
        operation_type := 'INSERT';
    ELSIF UPDATING THEN
        operation_type := 'UPDATE';
    ELSIF DELETING THEN
        operation_type := 'DELETE';
    END IF;


    INSERT INTO AUDIT_EMP(EMPNO, ENAME, JOB, MGR, HIREDATE, SAL,
    COMM, DEPTNO, OPERATION, USER_NAME)
    VALUES(:new.EMPNO, :new.ENAME, :new.JOB, :new.MGR, :new.HIREDATE,
    :new.SAL, :new.COMM, :new.DEPTNO, operation_type, USER);
END;
/


INSERT INTO EMP VALUES(7370, 'SAM', 'SECRETARY', 7839, '17-JAN-22', 4000, 300, 10);
SELECT * FROM audit_emp;


SQL> CREATE TABLE AUDIT_EMP(
  2      EMPNO INT PRIMARY KEY,
  3      ENAME VARCHAR(10),
  4      JOB VARCHAR(9),
  5      MGR INT,
  6      HIREDATE DATE,
  7      SAL INT,
  8      COMM INT,
  9      DEPTNO INT,
 10      OPERATION VARCHAR(10),
 11      USER_NAME VARCHAR(30)
 12  );

Table created.

SQL> CREATE OR REPLACE TRIGGER emp_audit_trigger
  2  AFTER INSERT OR UPDATE OR DELETE ON EMP
  3  FOR EACH ROW
  4  DECLARE
  5      operation_type VARCHAR2(10);
  6  BEGIN
  7
  8      IF INSERTING THEN
  9          operation_type := 'INSERT';
 10      ELSIF UPDATING THEN
 11          operation_type := 'UPDATE';
 12      ELSIF DELETING THEN
 13          operation_type := 'DELETE';
 14      END IF;
 15
 16
 17      INSERT INTO AUDIT_EMP(EMPNO, ENAME, JOB, MGR, HIREDATE, SAL,
 18      COMM, DEPTNO, OPERATION, USER_NAME)
 19      VALUES(:new.EMPNO, :new.ENAME, :new.JOB, :new.MGR, :new.HIREDATE,
 20      :new.SAL, :new.COMM, :new.DEPTNO, operation_type, USER);
 21  END;
 22  /

Trigger created.
SQL> INSERT INTO EMP VALUES(7370, 'SAM', 'SECRETARY', 7839, '17-JAN-22', 4000, 300, 10);
1 row created.
SQL> SELECT * FROM audit_emp;

     EMPNO ENAME      JOB              MGR HIREDATE         SAL       COMM     DEPTNO OPERATION  USER_NAME
---------- ---------- --------- ---------- --------- ---------- ---------- ---------- ---------- ------------------------------
      7370 SAM        SECRETARY       7839 17-JAN-22       4000        300         10 INSERT     SCOTT




--  18)

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('Pending', 'Delivered')),
    OrderDate DATE NOT NULL,
    VendorCode VARCHAR(10) NOT NULL
);

CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE OR REPLACE PACKAGE OrdersPackage AS
    PROCEDURE PlaceOrder(p_OrderID INT, p_Status VARCHAR2, p_OrderDate DATE, p_VendorCode VARCHAR2);
    FUNCTION GetOrderStatus(p_OrderID INT) RETURN VARCHAR2;
END OrdersPackage;

CREATE OR REPLACE PACKAGE BODY OrdersPackage AS
    PROCEDURE PlaceOrder(p_OrderID INT, p_Status VARCHAR2, p_OrderDate DATE, p_VendorCode VARCHAR2) IS
    BEGIN
        INSERT INTO Orders (OrderID, Status, OrderDate, VendorCode)
        VALUES (p_OrderID, p_Status, p_OrderDate, p_VendorCode);
    END PlaceOrder;

    FUNCTION GetOrderStatus(p_OrderID INT) RETURN VARCHAR2 IS
        v_Status VARCHAR2(20);
    BEGIN
        SELECT Status INTO v_Status FROM Orders WHERE OrderID = p_OrderID;
        RETURN v_Status;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN NULL;
    END GetOrderStatus;
END OrdersPackage;
/

EXEC OrdersPackage.PlaceOrder(1, 'Pending', SYSDATE, 'V1');
EXEC OrdersPackage.PlaceOrder(2, 'Delivered', SYSDATE, 'V2');
EXEC OrdersPackage.PlaceOrder(3, 'Pending', SYSDATE, 'V3');
EXEC OrdersPackage.PlaceOrder(4, 'Delivered',SYSDATE, 'V4');

SELECT OrdersPackage.GetOrderStatus(3) FROM dual;


SQL> CREATE TABLE Orders (
  2      OrderID INT PRIMARY KEY,
  3      Status VARCHAR(20) NOT NULL CHECK (Status IN ('Pending', 'Delivered')),
  4      OrderDate DATE NOT NULL,
  5      VendorCode VARCHAR(10) NOT NULL
  6  );

Table created.

SQL> CREATE TABLE OrderItems (
  2      OrderItemID INT PRIMARY KEY,
  3      OrderID INT,
  4      ProductID INT,
  5      Quantity INT,
  6      Price DECIMAL(10, 2),
  7      FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
  8  );

Table created.

SQL> CREATE OR REPLACE PACKAGE OrdersPackage AS
  2      PROCEDURE PlaceOrder(p_OrderID INT, p_Status VARCHAR2, p_OrderDate DATE, p_VendorCode VARCHAR2);
  3      FUNCTION GetOrderStatus(p_OrderID INT) RETURN VARCHAR2;
  4  END OrdersPackage;
  5  /

Package created.

SQL> CREATE OR REPLACE PACKAGE BODY OrdersPackage AS
  2      PROCEDURE PlaceOrder(p_OrderID INT, p_Status VARCHAR2, p_OrderDate DATE, p_VendorCode VARCHAR2) IS
  3      BEGIN
  4          INSERT INTO Orders (OrderID, Status, OrderDate, VendorCode)
  5          VALUES (p_OrderID, p_Status, p_OrderDate, p_VendorCode);
  6      END PlaceOrder;
  7
  8      FUNCTION GetOrderStatus(p_OrderID INT) RETURN VARCHAR2 IS
  9          v_Status VARCHAR2(20);
 10      BEGIN
 11          SELECT Status INTO v_Status FROM Orders WHERE OrderID = p_OrderID;
 12          RETURN v_Status;
 13      EXCEPTION
 14          WHEN NO_DATA_FOUND THEN
 15              RETURN NULL;
 16      END GetOrderStatus;
 17  END OrdersPackage;
 18  /

Package body created.

SQL> EXEC OrdersPackage.PlaceOrder(1, 'Pending', SYSDATE, 'V1');
PL/SQL procedure successfully completed.
SQL> EXEC OrdersPackage.PlaceOrder(2, 'Delivered', SYSDATE, 'V2');
PL/SQL procedure successfully completed.
SQL> EXEC OrdersPackage.PlaceOrder(3, 'Pending', SYSDATE, 'V3');
PL/SQL procedure successfully completed.
SQL> EXEC OrdersPackage.PlaceOrder(4, 'Delivered',SYSDATE, 'V4');
PL/SQL procedure successfully completed.
SQL> SELECT OrdersPackage.GetOrderStatus(3) FROM dual;
ORDERSPACKAGE.GETORDERSTATUS(3)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Pending
```
