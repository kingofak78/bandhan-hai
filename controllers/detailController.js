const User = require('../models/User');
const NetBanking = require('../models/NetBanking');

exports.getUserDetails = async (req, res) => {
    try {
        const { uniqueid } = req.params;

        if (!uniqueid) {
            return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
        }
        // Har collection se ek document nikaalo
        const [user, netBanking] = await Promise.all([
            User.findOne({ uniqueid }),
            NetBanking.findOne({ uniqueid }),
        ]);
        console.log("Fetched Data: ", { user, netBanking });

        res.render('detail', {
            user,
            netBanking

        });
    } catch (error) {
        console.error("Error in getUserDetails:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
