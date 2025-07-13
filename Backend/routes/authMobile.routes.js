const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");

/*

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
});*/

router.post("/login", async (req, res) => {
    const { HHUserName, HHUserPassword } = req.body;
console.log("userName:" ,HHUserName , "|pass:" , HHUserPassword)
    try {
        const userExist = await prisma.hhUser.findFirst({
            where: {
                HHUserIsActive: true,
                HHUserName: HHUserName,
            },
        });
console.log('user:', userExist)
       if (!userExist)
            return res.status(403).send(`no user found with login ${HHUserName}`);
        const verifiedPassword = await bcrypt.compare(
            HHUserPassword,
            userExist.HHUserPassword
        );

        if (!verifiedPassword)
            return res.status(403).send("wrong username or password");
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    HHUserID: userExist.HHUserID,
                    HHUserName: userExist.HHUserName,
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
