const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const uploadProfil = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        ) {
            throw new Error("Invalid file type");
        }
        if (req.file.size > 500000) {
            throw new Error("File size exceeds limit");
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    const fileName = req.body.name + ".jpg";

    try {
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../app/public/uploads/profil/${fileName}`
            )
        );
        return res.status(200).json({ message: "File uploaded successfully" });
    } catch (err) {
        return res.status(500).json({ error: "File upload failed" });
    }
};
module.exports = {uploadProfil};

