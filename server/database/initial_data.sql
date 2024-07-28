-- User table
CREATE TABLE public."User" (
    id int PRIMARY KEY,
    email character varying(255) NOT NULL UNIQUE,
    about text,
    name character varying(255),
    "profilePicture" character varying(255)
);

-- User table's data
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (6, 'vinh0348219257@gmail.com', 'I am software developer', 'Phạm Thành Vinh', '/avatars/3.png');
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (7, 'ptvinh203@gmail.com', 'I am software developer', 'Nguyễn Chương', '/avatars/1.png');
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (9, 'giang@gmail.com', 'I am software developer', 'Hương Giang', '/avatars/4.png');
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (10, 'truong@gmail.com', 'I am software developer', 'Mậu Trường', '/avatars/5.png');
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (11, 'tin@gmail.com', 'I am software developer', 'Duy Tin', '/avatars/6.png');
INSERT INTO public."User" (id, email, about, name, "profilePicture") VALUES (8, 'son@gmail.com', 'I am software developer', 'Hồng Sơn', '/avatars/2.png');

-- Messages table
CREATE TABLE public."Messages" (
    id int PRIMARY KEY,
    "senderId" int NOT NULL,
    "receiverId" int NOT NULL,
    type character varying(255) NOT NULL DEFAULT 'text',
    message character varying(2000),
    "messageStatus" character varying(255),
    "createdAt" timestamp NOT NULL,
    FOREIGN KEY ("senderId")
        REFERENCES public."User" (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    FOREIGN KEY ("receiverId")
        REFERENCES public."User" (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Messages table's data
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (2, 7, 6, 'text', '123123', 'read', '2024-07-19 11:49:44.14');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (3, 7, 6, 'text', 'hello', 'read', '2024-07-19 11:49:47.57');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (5, 7, 6, 'text', 'hi', 'read', '2024-07-20 03:04:52.053');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (4, 6, 7, 'text', 'hi', 'read', '2024-07-20 03:04:42.542');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (6, 7, 6, 'text', 'hi', 'read', '2024-07-20 03:06:47.553');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (7, 7, 6, 'text', 'hi', 'read', '2024-07-20 03:07:25.43');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (8, 7, 6, 'text', '123', 'read', '2024-07-20 03:07:47.679');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (9, 6, 7, 'text', '321', 'read', '2024-07-20 03:07:53.18');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (10, 7, 6, 'text', '123', 'read', '2024-07-20 03:09:32.195');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (11, 7, 6, 'text', 'hello', 'read', '2024-07-20 03:09:36.832');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (12, 7, 6, 'text', 'dsfsdf', 'read', '2024-07-20 03:10:45.661');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (1, 6, 9, 'text', 'hello', 'delivered', '2024-07-19 11:30:39.048');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (22, 6, 8, 'text', '123', 'delivered', '2024-07-27 10:08:35.379');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (13, 6, 7, 'text', 'hello emoji 😊', 'read', '2024-07-20 03:23:59.976');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (23, 7, 6, 'text', 'hi', 'read', '2024-07-27 10:21:05.452');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (24, 7, 6, 'text', 'hi', 'read', '2024-07-27 10:21:16.836');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (25, 7, 6, 'text', 'Hi', 'read', '2024-07-28 07:44:12.661');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (26, 6, 7, 'text', 'hi', 'read', '2024-07-28 07:46:42.528');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (27, 7, 6, 'text', 'Hi', 'read', '2024-07-28 07:47:13.034');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (28, 6, 7, 'text', 'hi', 'read', '2024-07-28 07:56:22.831');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (32, 7, 6, 'text', 'Hello', 'read', '2024-07-28 08:00:11.565');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (29, 6, 7, 'text', 'hi', 'read', '2024-07-28 07:58:46.75');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (30, 6, 7, 'text', 'hi', 'read', '2024-07-28 07:59:27.554');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (31, 6, 7, 'text', 'hi', 'read', '2024-07-28 07:59:27.808');
INSERT INTO public."Messages" (id, "senderId", "receiverId", type, message, "messageStatus", "createdAt") VALUES (33, 7, 6, 'text', 'hi', 'read', '2024-07-28 08:46:07.195');
