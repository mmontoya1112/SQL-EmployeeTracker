USE employees;
INSERT INTO department (name)
VALUES ('engineering'),
    ('finance'),
    ('legal'),
    ('sales')
INSERT INTO role (title, salary, departmentID)
VALUES ('legal lead', 550000, 1),
    ('lawyer', 200000, 1),
    ('sales person', 100000, 2),
    ('sales lead', 120000, 2),
    ('engineer', 200000, 3),
    ('lead engineer', 400000, 3),
    ('banker', 200000, 4),
    ('lead banker', 250000, 4);

INSERT INTO employee (
    firstName,
    lastName,
    titleID,
    managerID,
    managerConfirm
)

VALUES ('trixie', 'mattel', 1, null, true),
    ('bob', 'the drag queen', 2, 2, false),
    ('roxxxie', 'andrews', 2, 2, true),
    ('gia', 'gunn', 3, 1, true),
    ('yuhua', 'hamasaki', 3, null, false),
    ('katya', 'zam', 4, 3, false),
    ('tia', 'koffee', 4, null, true),
    ('monet', 'exchange', 5, null, true),
    ('plastique', 'tiara', 5, 4, false),
    ('violet', 'chachki', 6, 4, false),
    ('jinx', 'monsoon', 6, null, true);
INSERT INTO manager (firstName, lastName)
SELECT  firstName, lastName
FROM employee
WHERE managerConfirm = 1;
