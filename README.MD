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

1 - npm init -y \
2 - touch server.js .env \
3 - mkdir config models views controllers routes middleware util \
4 - install npm packages :- npm i express express-validator mysql2 jsonwebtoken bcryptjs nodemon cors dotenv \

##

- clone the project git clone -b master https://github.com/chavdahitesh/node_mysql_user_authentication.githttps://github.com/chavdahitesh/node_mysql_user_authentication.git 
- go to project root folder 
- create .env file (touch .env) 
- copy example.env variables and add in .env 
- install dependency (npm install) 
- run project with command: npm start 

## ROUTES
GET USER INFO :- localhost:3000/api/v1/user/getuser \
REGISTER USER :- localhost:3000/api/v1/user/register \
LOGIN USER    :- localhost:3000/api/v1/user/login
