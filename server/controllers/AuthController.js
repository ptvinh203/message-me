import getPrismaInstance from "../utils/PrismaClient.js";
import { ResponseWithError, ResponseWithSuccess } from "../utils/Response.js";
import { generateToken04 } from "../utils/TokenGenerator.js";

export const checkUser = async (req, res, next) => {
   try {
      const { email } = req.body;
      if (!email) return res.json(ResponseWithError("Email is required!"));

      const prisma = getPrismaInstance();
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return res.json(ResponseWithError("Email is not found!"));
      else return res.json(ResponseWithSuccess(user));
   } catch (error) {
      next(error);
   }
};

export const onBoardUser = async (req, res, next) => {
   try {
      const { email, name, about, image: profilePicture } = req.body;
      if (!email || !name || !profilePicture) {
         return res.json(ResponseWithError("Email, name and profile picture are required!"));
      }
      const prisma = getPrismaInstance();
      let user = await prisma.user.create({
         data: { email, name, about, profilePicture },
      });
      return res.json(ResponseWithSuccess(user));
   } catch (e) {
      console.log(e);
   }
};

export const getAllUsers = async (req, res, next) => {
   try {
      const prisma = getPrismaInstance();
      const users = await prisma.user.findMany({
         orderBy: { name: "asc" },
         select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
            about: true,
         },
      });
      const usersGroupedByInitialLetter = {};

      users.forEach((user) => {
         const initialLetter = user.name.charAt(0).toUpperCase();
         if (!usersGroupedByInitialLetter[initialLetter]) {
            usersGroupedByInitialLetter[initialLetter] = [];
         }
         usersGroupedByInitialLetter[initialLetter].push(user);
      });
      return res.json(ResponseWithSuccess(usersGroupedByInitialLetter));
   } catch (error) {
      next(error);
   }
};

export const generateToken = async (req, res, next) => {
   try {
      const appId = parseInt(process.env.ZEGO_APP_ID);
      const serverSecret = process.env.ZEGO_SERVER_SECRET;
      const userId = req.params.userId;
      const effectiveTime = 3600;
      const payload = "";
      if (appId && serverSecret && userId) {
         const token = await generateToken04(appId, userId, serverSecret, effectiveTime, payload);
         return res.status(200).json(ResponseWithSuccess(token));
      }
      return res.status(400).json(ResponseWithError("App ID, server secret and user ID are required!"));
   } catch (error) {
      next(error);
   }
};
