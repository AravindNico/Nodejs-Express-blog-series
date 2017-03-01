cassandra query
=====================


CREATE KEYSPACE booklist WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE booklist;

CREATE TABLE books(id text, bookname text, authorname text, price text,PRIMARY KEY(id));

SELECT * FROM books;

INSERT INTO books(id, bookname, authorname, price) VALUES(1,'ramayana', 'jai', 500);

UPDATE books SET bookname='Delhi_life',authorname='rai' WHERE id=2;

DELETE FROM books WHERE id=1;

sql query
====================

SELECT * from book

INSERT INTO book VALUES('',?,?,?)

UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?

DELETE FROM book WHERE id=?