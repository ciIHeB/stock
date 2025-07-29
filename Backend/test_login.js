const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function testLogin() {
    try {
        console.log('Testing login functionality...');
        
        // Test with a sample user (replace with actual credentials)
        const HHUserName = 'iheb'; // Replace with actual username
        const HHUserPassword = 'password'; // Replace with actual password
        
        console.log(`Testing login for user: ${HHUserName}`);
        
        // Find user
        const userExist = await prisma.hhUser.findFirst({
            where: {
                HHUserIsActive: true,
                HHUserName: HHUserName,
            },
        });
        
        console.log('User found:', userExist ? 'Yes' : 'No');
        
        if (!userExist) {
            console.log('No user found');
            return;
        }
        
        // Verify password
        const verifiedPassword = await bcrypt.compare(
            HHUserPassword,
            userExist.HHUserPassword
        );
        
        console.log('Password verified:', verifiedPassword ? 'Yes' : 'No');
        
        if (!verifiedPassword) {
            console.log('Wrong password');
            return;
        }
        
        // Find owner
        const owner = await prisma.hhOwner.findFirst({
            where: {
                UserID: userExist.HHUserID,
                OwnerIsActive: true,
            },
        });
        
        console.log('Owner found:', owner ? 'Yes' : 'No');
        if (owner) {
            console.log('Owner details:', {
                OwnerID: owner.OwnerID,
                OwnerDescLan1: owner.OwnerDescLan1,
                OwnerDescLan2: owner.OwnerDescLan2,
                UserID: owner.UserID
            });
        }
        
        // Create token
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    HHUserID: userExist.HHUserID,
                    HHUserName: userExist.HHUserName,
                },
            },
            process.env.TOKEN_KEY || 'your-secret-key'
        );
        
        // Create response
        const responseData = {
            token: token,
            owner: owner ? {
                OwnerID: owner.OwnerID,
                OwnerDescLan1: owner.OwnerDescLan1,
                OwnerDescLan2: owner.OwnerDescLan2,
                UserID: owner.UserID
            } : null
        };
        
        console.log('Response data:', JSON.stringify(responseData, null, 2));
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin(); 