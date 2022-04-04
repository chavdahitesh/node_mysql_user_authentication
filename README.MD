# setup db tables

- db name:- db_node_mysql_user_authentication
- table name:- users

CREATE TABLE users (
id int(11) NOT NULL AUTO_INCREMENT,
name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
PRIMARY KEY (id),
UNIQUE KEY email (email)
)

# setup file structue

1 - npm init -y
2 - touch server.js .env
3 - mkdir config models views controllers routes middleware util
4 - install npm packages :- npm i express express-validator mysql2 jsonwebtoken bcryptjs nodemon cors dotenv
