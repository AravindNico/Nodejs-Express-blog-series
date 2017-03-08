// Cassandra Query Commands
// ============================

// Creating a KEYSPACE named 'booklist' with class and replication factor.
// ========================================================================


CREATE KEYSPACE booklist WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

// To access the created KEYSPACE
// ================================

USE booklist;

// Creating a table named 'books' with following columns
// =======================================================

CREATE TABLE books(id text, bookname text, authorname text, price text,PRIMARY KEY(id));

// Adding books to the book store (sample book catalog - book list)
// =================================================================

INSERT INTO books(id, bookname, authorname, price) VALUES('1','Harry potter', 'Rowling jk', '500');
INSERT INTO books(id, bookname, authorname, price) VALUES('2','Malgudi Days', 'R K Narayan', '320');
INSERT INTO books(id, bookname, authorname, price) VALUES('3','Great Expectations', 'Charles Dickens', '750');
INSERT INTO books(id, bookname, authorname, price) VALUES('4','Game Of Thrones', 'George RR Martin', '2000');
INSERT INTO books(id, bookname, authorname, price) VALUES('5','Thirukural', 'Thiruvalluvar', '3000');
INSERT INTO books(id, bookname, authorname, price) VALUES('6','Hamlet', 'William Shakespeare', '2000');
INSERT INTO books(id, bookname, authorname, price) VALUES('7','My passion', 'Aravind', '3000');

// To list all the books available in the bookcatalog
// ========================================================

SELECT * FROM books;
