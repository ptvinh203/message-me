import getPrismaInstance from "../utils/PrismaClient.js";
import { ResponseWithError, ResponseWithSuccess } from "../utils/Response.js";
import { renameSync } from "fs";

export const addMessage = async (req, res, next) => {
   try {
      const prisma = getPrismaInstance();
      const { message, from, to } = req.body;
      const getUser = onlineUsers.get(to);
      if (message && from && to) {
         const newMessage = await prisma.messages.create({
            data: {
               message,
               sender: { connect: { id: parseInt(from) } },
               receiver: { connect: { id: parseInt(to) } },
               messageStatus: getUser ? "delivered" : "sent",
            },
            include: { sender: true, receiver: true },
         });
         return res.status(200).send(ResponseWithSuccess(newMessage));
      }
      return res.status(400).send(ResponseWithError("From, to and message are required!"));
   } catch (error) {
      next(error);
   }
};

export const getMessages = async (req, res, next) => {
   try {
      const prisma = getPrismaInstance();
      const { from, to } = req.params;
      const messages = await prisma.messages.findMany({
         where: {
            OR: [
               {
                  senderId: parseInt(from),
                  receiverId: parseInt(to),
               },
               {
                  senderId: parseInt(to),
                  receiverId: parseInt(from),
               },
            ],
         },
         orderBy: {
            id: "asc",
         },
      });
      const unreadMessages = [];
      messages.forEach((message, index) => {
         if (message.messageStatus !== "read" && message.senderId === parseInt(to)) {
            messages[index].messageStatus = "read";
            unreadMessages.push(message.id);
         }
      });

      await prisma.messages.updateMany({
         where: {
            id: { in: unreadMessages },
         },
         data: {
            messageStatus: "read",
         },
      });
      return res.json(ResponseWithSuccess(messages));
   } catch (error) {
      next(error);
   }
};

export const addImageMessage = async (req, res, next) => {
   try {
      if (req.file) {
         const date = Date.now();
         let fileName = "uploads/images/" + date + req.file.originalname;
         renameSync(req.file.path, fileName);
         const prisma = getPrismaInstance();
         const { from, to } = req.query;
         if (from && to) {
            const message = await prisma.messages.create({
               data: {
                  message: fileName,
                  sender: { connect: { id: parseInt(from) } },
                  receiver: { connect: { id: parseInt(to) } },
                  type: "image",
               },
            });
            return res.status(200).json(ResponseWithSuccess(message));
         }
         return res.status(400).json(ResponseWithError("From, to are required!"));
      }
      return res.status(400).json(ResponseWithError("Image is required!"));
   } catch (error) {
      next(error);
   }
};

export const addAudioMessage = async (req, res, next) => {
   try {
      if (req.file) {
         const date = Date.now();
         let fileName = "uploads/recordings/" + date + req.file.originalname;
         renameSync(req.file.path, fileName);
         const prisma = getPrismaInstance();
         const { from, to } = req.query;
         if (from && to) {
            const message = await prisma.messages.create({
               data: {
                  message: fileName,
                  sender: { connect: { id: parseInt(from) } },
                  receiver: { connect: { id: parseInt(to) } },
                  type: "audio",
               },
            });
            return res.status(200).json(ResponseWithSuccess(message));
         }
         return res.status(400).json(ResponseWithError("From, to are required!"));
      }
      return res.status(400).json(ResponseWithError("Audio is required!"));
   } catch (error) {
      next(error);
   }
};

export const getInitialContactsWithMessages = async (req, res, next) => {
   try {
      const userId = parseInt(req.params.from);
      const prisma = getPrismaInstance();
      const user = await prisma.user.findUnique({
         where: {
            id: userId,
         },
         include: {
            sentMessages: {
               include: {
                  receiver: true,
                  sender: true,
               },
               orderBy: {
                  createdAt: "desc",
               },
            },
            receivedMessages: {
               include: {
                  receiver: true,
                  sender: true,
               },
               orderBy: {
                  createdAt: "desc",
               },
            },
         },
      });
      const messages = [...user.sentMessages, ...user.receivedMessages];
      messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const users = new Map();
      const messageStatusChange = [];

      messages.forEach((msg) => {
         const { id, type, message, messageStatus, createdAt, senderId, receiverId } = msg;
         const isSender = senderId === userId;
         const calculatedId = isSender ? receiverId : senderId;

         if (messageStatus === "sent") messageStatusChange.push(id);

         if (!users.get(calculatedId)) {
            let user = {
               messageId: id,
               type,
               message,
               messageStatus,
               createdAt,
               senderId,
               receiverId,
            };
            users.set(
               calculatedId,
               isSender
                  ? {
                       ...user,
                       ...msg.receiver,
                       totalUnreadMessages: 0,
                    }
                  : {
                       ...user,
                       ...msg.sender,
                       totalUnreadMessages: messageStatus !== "read" ? 1 : 0,
                    }
            );
         } else if (messageStatus !== "read" && !isSender) {
            const user = users.get(calculatedId);
            users.set(calculatedId, {
               ...user,
               totalUnreadMessages: user.totalUnreadMessages + 1,
            });
         }
      });

      if (messageStatusChange.length) {
         await prisma.messages.updateMany({
            where: {
               id: { in: messageStatusChange },
            },
            data: {
               messageStatus: "delivered",
            },
         });
      }

      return res.status(200).json(
         ResponseWithSuccess({
            users: Array.from(users.values()),
            onlineUsers: Array.from(onlineUsers.keys()),
         })
      );
   } catch (error) {
      next(error);
   }
};
