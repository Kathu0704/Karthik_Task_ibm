CREATE TABLE bank_branch (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    branch_address VARCHAR(255) NOT NULL,
    bank_code VARCHAR(10) NOT NULL
);
INSERT INTO bank_branch (branch_name, branch_address, bank_code)
VALUES
('Main Branch', 'MG Road, Bangalore', 'SBI001'),
('City Branch', 'Anna Nagar, Chennai', 'SBI001'),
('Central Branch', 'Connaught Place, Delhi', 'PNB001');

select * from bank_branch;

drop table accounts;

CREATE TABLE Accounts (
    Acc_no BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(15),
    email VARCHAR(100)
);

desc Accounts;

ALTER TABLE Accounts
ADD COLUMN branch_id INT;


UPDATE bank_branch
SET bank_code = 'SBI002'
WHERE branch_name = 'City Branch';

UPDATE bank_branch
SET bank_code = 'SBI003'
WHERE branch_name = 'Central Branch';


select * FROM bank_branch;

INSERT INTO Accounts (name, acc_no, mobile_number, email, branch_id)
VALUES
('Rahul Sharma', 100001, '9876543210', 'rahul@gmail.com', 1),
('Priya Singh', 100002, '9876543211', 'priya@gmail.com', 1),
('Amit Kumar', 100003, '9876543212', 'amit@gmail.com', 2),
('Sneha Patel', 100004, '9876543213', 'sneha@gmail.com', 2),
('Vikash Rao', 100005, '9876543214', 'vikash@gmail.com', 3),
('Neha Gupta', 100006, '9876543215', 'neha@gmail.com', 3),
('Arjun Mehta', 100007, '9876543216', 'arjun@gmail.com', 1),
('Kiran Das', 100008, '9876543217', 'kiran@gmail.com', 2);

select * FROM Accounts;

truncate Accounts;

select * FROM Accounts;

INSERT INTO Accounts
(name, acc_no, mobile_number, email, branch_id)
VALUES
('Rahul Sharma', 100001, '9876543210', 'rahul@gmail.com', 'SBI001'),
('Priya Singh', 100002, '9876543211', 'priya@gmail.com', 'SBI002'),
('Amit Kumar', 100003, '9876543212', 'amit@gmail.com', 'SBI002'),
('Sneha Patel', 100004, '9876543213', 'sneha@gmail.com', 'SBI003'),
('Vikram Rao', 100005, '9876543214', 'vikram@gmail.com', 'SBI003'),
('Neha Gupta', 100006, '9876543215', 'neha@gmail.com', 'SBI001'),
('Arjun Mehta', 100007, '9876543216', 'arjun@gmail.com', 'SBI001'),
('Kiran Das', 100008, '9876543217', 'kiran@gmail.com', 'SBI002');

select * from Accounts;

ALTER TABLE bank_branch
ADD CONSTRAINT bank PRIMARY KEY (bank_code);

select * from bank_branch;

UPDATE bank_branch
SET bank_id = 'SBI002'
WHERE branch_name = 'City Branch';

ALTER TABLE bank_branch
ALTER COLUMN branch_id TYPE VARCHAR(10);

select * from bank_branch;

UPDATE bank_branch
SET bank_id = 'SBI002'
WHERE branch_name = 'City Branch';

select * from bank_branch;
UPDATE bank_branch
SET branch_id = 'SBI002'
WHERE branch_name = 'City Branch';

select * from bank_branch;

UPDATE bank_branch
SET branch_id = 'SBI002'
WHERE branch_name = 'City Branch';

select * from bank_branch;

ALTER TABLE bank_branch
drop column branch_id;

commit;
select * from Accounts;

ALTER TABLE Accounts
ADD CONSTRAINT fk_accounts_branch
FOREIGN KEY (branch_id)
REFERENCES bank_branch(branch_id);


select * from bank_branch;

ALTER TABLE Accounts
ADD CONSTRAINT fk_accounts_branch
FOREIGN KEY (branch_id)
REFERENCES bank_branch(bank_code);

select * from bank_branch;

ALTER TABLE bank_branch
ADD CONSTRAINT bank_branch_pkey
PRIMARY KEY (bank_code);

ALTER TABLE Accounts
ADD CONSTRAINT fk_accounts_branch
FOREIGN KEY (branch_id)
REFERENCES bank_branch(bank_code);

select * from Accounts;

INSERT INTO Accounts
(acc_no, name, mobile_number, email, branch_id)
VALUES
(100009, 'Rakesh Kumar', '9876543218', 'rakesh@gmail.com', 'SBI001'),
(100010, 'Pooja Verma', '9876543219', 'pooja@gmail.com', 'SBI002'),
(100011, 'Manoj Reddy', '9876543220', 'manoj@gmail.com', 'SBI003');

commit;

begin;
INSERT INTO Accounts
(acc_no, name, mobile_number, email, branch_id)
VALUES
(100009, 'Rakesh Kumar', '9876543218', 'rakesh@gmail.com', 'SBI001'),
(100010, 'Pooja Verma', '9876543219', 'pooja@gmail.com', 'SBI002'),
(100008, 'Manoj Reddy', '9876543220', 'manoj@gmail.com', 'SBI003');
commit;

select * from Accounts;

select * from Accounts;

DELETE FROM Accounts
WHERE acc_no=10008;

select * from Accounts;

ALTER TABLE Accounts
ADD CONSTRAINT uq_accounts_mobile
UNIQUE (mobile_number);

select * from Accounts;

ALTER TABLE Accounts
ADD COLUMN balance DECIMAL(12,2);

select * from Accounts;

UPDATE Accounts
SET balance =
CASE acc_no
    WHEN 100001 THEN 75000
    WHEN 100002 THEN 60000
    WHEN 100003 THEN 90000
    WHEN 100004 THEN 45000
    WHEN 100005 THEN 120000
    WHEN 100006 THEN 30000
    WHEN 100007 THEN 80000
    WHEN 100008 THEN 55000
    WHEN 100009 THEN 70000
    WHEN 100010 THEN 65000
END;

select * from Accounts;

select * from Accounts where branch_id="SBI001";
ALTER TABLE Accounts
ADD CONSTRAINT chk_balance
CHECK (balance > 500);

INSERT INTO Accounts
(acc_no, name, mobile_number, email, branch_id, balance)
VALUES
(100011, 'Test User', '9876543221', 'test@gmail.com', 'SBI001', 400);

select * from Accounts where branch_id="SB001";

select * from Accounts where branch_id='SBI002';

select * from Accounts order by balance;

select * from Accounts order by balance DESC limit 5;

SELECT * FROM Accounts a
JOIN bank_branch b
ON a.branch_id = b.bank_code;

SELECT *
FROM Accounts a
LEFT JOIN bank_branch b
ON a.branch_id = b.bank_code;

SELECT
    a.acc_no,
    a.name,
    a.branch_id,
    b.branch_name,
    b.branch_address
FROM Accounts a
LEFT JOIN bank_branch b
ON a.branch_id = b.bank_code;

CREATE TABLE Project (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100)
);

CREATE TABLE Front_End_Developer (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    project_id INT,
    FOREIGN KEY (project_id)
    REFERENCES Project(project_id)
);
CREATE TABLE Back_End_Developer (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    project_id INT,
    FOREIGN KEY (project_id)
    REFERENCES Project(project_id)
);

INSERT INTO Project VALUES
(101, 'E-Commerce'),
(102, 'Banking App'),
(103, 'Hospital System'),
(104, 'Food Delivery'),
(105, 'CRM Portal');

INSERT INTO Front_End_Developer VALUES
(1, 'Rahul', 101),
(2, 'Priya', 102),
(3, 'Amit', 103);

INSERT INTO Back_End_Developer VALUES
(11, 'Karan', 101),
(12, 'Neha', 105),
(13, 'Arjun', 102),
(14, 'Pooja', 101),
(15, 'Manoj', 103);

INSERT INTO Front_End_Developer VALUES
(4, 'Sneha', 104),
(5, 'Vikram', 105);

select * from Front_End_Developer;
select * from Back_End_Developer;

INSERT INTO Back_End_Developer VALUES
(11, 'Karan', 101),
(12, 'Neha', 105),
(13, 'Arjun', 102),
(14, 'Pooja', 101),
(15, 'Manoj', 103);

SELECT
    f.emp_name AS front_end_dev,
    b.emp_name AS back_end_dev,
    f.project_id
FROM Front_End_Developer f
LEFT JOIN Back_End_Developer b
ON f.project_id = b.project_id;

select * from Front_End_Developer;

delete from Front_End_Developer where project_id=105;
delete from Front_End_Developer where project_id=102;

SELECT
    f.emp_name AS front_end_dev,
    b.emp_name AS back_end_dev,
    f.project_id
FROM Front_End_Developer f
LEFT JOIN Back_End_Developer b
ON f.project_id = b.project_id;

SELECT
    f.emp_name AS front_end_dev,
    b.emp_name AS back_end_dev,
    f.project_id
FROM Front_End_Developer f
right outer JOIN Back_End_Developer b
ON f.project_id = b.project_id;

SELECT
    *
FROM Front_End_Developer f
INNER JOIN Back_End_Developer b
ON f.project_id = b.project_id;

SELECT *FROM Front_End_Developer f
left outer JOIN Back_End_Developer b
ON f.project_id = b.project_id;

SELECT
    f.emp_name AS front_end_dev,
    b.emp_name AS back_end_dev
FROM Front_End_Developer f
CROSS JOIN Back_End_Developer b;



CREATE INDEX idx_mobile_number
ON Accounts(mobile_number);

SELECT *
FROM pg_indexes
WHERE indexname = 'idx_mobile_number';

CREATE INDEX idx_high_balance
ON Accounts(balance)
WHERE balance > 50000;

SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'accounts';

CREATE SCHEMA banking;

CREATE TABLE banking.Accounts (
    acc_no BIGINT PRIMARY KEY,
    name VARCHAR(100),
    mobile_number VARCHAR(15),
    email VARCHAR(100),
    branch_id VARCHAR(10)
);
SELECT * FROM banking.Accounts;

INSERT INTO banking.Accounts
(acc_no, name, mobile_number, email, branch_id)
VALUES
(100001, 'Rahul Sharma', '9876543210', 'rahul@gmail.com', 'SBI001'),
(100002, 'Priya Singh', '9876543211', 'priya@gmail.com', 'SBI002'),
(100003, 'Amit Kumar', '9876543212', 'amit@gmail.com', 'SBI003'),
(100004, 'Sneha Patel', '9876543213', 'sneha@gmail.com', 'SBI001'),
(100005, 'Vikram Rao', '9876543214', 'vikram@gmail.com', 'SBI002'),
(100006, 'Neha Gupta', '9876543215', 'neha@gmail.com', 'SBI003'),
(100007, 'Arjun Mehta', '9876543216', 'arjun@gmail.com', 'SBI001'),
(100008, 'Kiran Das', '9876543217', 'kiran@gmail.com', 'SBI002');

SELECT * FROM banking.Accounts;





select * from bank_branch;
