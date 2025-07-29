const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Test endpoint to check if backend is working
router.get("/ping", (req, res) => {
    res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

// Test endpoint to get all users
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.hhUser.findMany({
            select: {
                HHUserID: true,
                HHUserName: true,
                HHUserIsActive: true
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint to get all owners
router.get("/owners", async (req, res) => {
    try {
        const owners = await prisma.hhOwner.findMany({
            select: {
                OwnerID: true,
                OwnerDescLan1: true,
                OwnerDescLan2: true,
                UserID: true,
                OwnerIsActive: true
            }
        });
        res.json(owners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint to get owner by user ID
router.get("/owner/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const owner = await prisma.hhOwner.findFirst({
            where: {
                UserID: userId,
                OwnerIsActive: true,
            },
        });
        
        if (owner) {
            res.json({
                success: true,
                owner: {
                    OwnerID: owner.OwnerID,
                    OwnerDescLan1: owner.OwnerDescLan1,
                    OwnerDescLan2: owner.OwnerDescLan2,
                    UserID: owner.UserID
                }
            });
        } else {
            res.json({
                success: false,
                message: "No owner found for this user"
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 