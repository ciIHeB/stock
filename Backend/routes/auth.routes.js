const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");



router.get("/check", verifyToken, async (req, res) => {
    // check user token validation on request
    try {
        const user = await prisma.secUser.findUnique({
            where: {
                UserID: req.verifiedUser.data.UserID,
            },
        });

        if (!user) {
            return res.status(404).json("User not found");
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    const { UserName, UserLoginPassword } = req.body;
console.log("userName:" ,UserName , "|pass:" , UserLoginPassword)
    try {
        const userExist = await prisma.secUser.findFirst({
            where: {
                UserIsActive: true,
                UserName: UserName,
            },
        });
console.log('user:', userExist)
       if (!userExist)
            return res.status(403).send(`no user found with login ${UserName}`);
        const verifiedPassword = await bcrypt.compare(
            UserLoginPassword,
            userExist.UserLoginPassword
        );

        if (!verifiedPassword)
            return res.status(403).send("wrong username or password");
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    UserID: userExist.UserID,
                    UserName: userExist.UserName,
                },
            },
            process.env.TOKEN_KEY
        );
       // console.log(token);
       console.log('user loggin in')
        return res.status(200).send(token);
    } catch (err) {
        console.error(err);
        return err;
    }
});
module.exports = router;
