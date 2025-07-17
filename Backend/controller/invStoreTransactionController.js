
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStock = async (req, res) => {
    try {
        const { storeId, itemId } = req.params;
        const stock = await prisma.invStoreTransaction.aggregate({
            _sum: {
                ItemQty: true,
            },
            where: {
                StoreID: parseInt(storeId),
                ItemID: parseInt(itemId),
            },
        });
        res.json(stock._sum.ItemQty === null ? 0 : stock._sum.ItemQty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getStock,
};
