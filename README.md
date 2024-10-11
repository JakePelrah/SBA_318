create table main.posts ( postUUID TEXT primary key, title    TEXT not null, category TEXT not null, text     TEXT not null, tags     TEXT, username TEXT, password TEXT not null, dateTime text );

create table main.users
(
    userUUID TEXT
        primary key,
    username TEXT,
    password TEXT
);


create table main.comments
(
    postUUID TEXT,
    commentId TEXT,
    text TEXT,    
)