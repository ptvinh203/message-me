import getPrismaInstance from "../utils/PrismaClient.js";
import { ResponseWithError, ResponseWithSuccess } from "../utils/Response.js";

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
