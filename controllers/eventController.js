const User = require("../models/User");
const Hackathon = require("../models/event")
// const { google } = require("googleapis");
// const { Readable } = require("stream");
// const cloudinary = require("cloudinary").v2;

const getHackathonData = async (req, res) => {

  try {
    const { hackathonId } = req.params;
    const {user} = req.body;

    const dbUser = await User.findById(user.id);

    if (!dbUser || !dbUser.profile) {
      return res.status(404).json({ error: "Profile not found", success: false });
    }


    // Step 1: Validate registration
    const registration = dbUser.profile.registeredHackathon.find(
      (h) => h.id?.toString() === hackathonId
    )

    if (!registration) {
      return res.status(400).json({ message: 'User not registered for this hackathon', success: false });
    }

    const teamId = registration.teamId;
    const teamName = registration.teamName;

    if (!teamId) {
      return res.status(400).json({ message: 'No other team member found', success: false });
    }

    // Step 2: Find all teammates with same hackathonId & teamId
    const teamMembers = await User.find({
      'registeredHackathon.id': hackathonId,
      'registeredHackathon.teamId': teamId
    }).select('name email profile.organisation registeredHackathon.isLead');

    // Step 3: Format member details
    const members = teamMembers.map(u => {
      const reg = u.registeredHackathon.find(h => h.id === hackathonId);
      return {
        name: u.name,
        email: u.email,
        org: u.profile.organisation,
        isLeader: reg?.isLeader,
      };
    });

    // Step 4: Fetch hackathon details
    const hackathonDetails = await Hackathon.findById(hackathonId);

    // Create final response
    const responseData = {
      hackathon: {
        id: hackathonDetails.id,
        title: hackathonDetails.title,
        date: hackathonDetails.date,
        vanue: hackathonDetails.vanue,
        desc: hackathonDetails.desc,
        Agenda: hackathonDetails.Agenda,
        addInfo: hackathonDetails.addInfo,
        link: hackathonDetails.link,
        timing: hackathonDetails.timing,
        isProblemStatementAvailable: hackathonDetails.isProblemStatementAvailable,
        problemStatemt: hackathonDetails.problemStatemt,
        startSubmission: hackathonDetails.startSubmission,
      },
      team: {
        hackathonId,
        teamId,
        teamName,
        members,
        totalMembers: registration.members
      }
    };

    res.status(200).json({ responseData, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message, success: false });
  }

};

// const submitHachathonPpt = async (req, res) => {
//   try {
//     const user = req.cookies.user;
//     let fileUrl;

//     // 1️⃣ Validate login
//     if (!user || !user.profile) {
//       return res.status(404).json({ error: "Profile not found", success: false });
//     }

//     // 2️⃣ Validate file
//     if (!req.file) {
//       return res.status(400).json({ error: "No file received", success: false });
//     }

//     // 3️⃣ Parse JSON sent inside FormData
//     const hackathonDetails = JSON.parse(req.body.hackathonDetails);
//     const teamDetails = JSON.parse(req.body.teamDetails);

//     // 4️⃣ Find hackathon
//     const hackathon = await Hackathon.findById(hackathonDetails.id);
//     if (!hackathon)
//       return res.status(404).json({ error: "Hackathon not found", success: false });

//     // 5️⃣ Check if already submitted
//     const teamId = hackathon.ideaSubmitedBy.find(
//       (id) => id === teamDetails.teamId
//     );

//     if (teamId) {
//       return res.status(409).json({
//         error: "Presentation already submitted",
//         success: false,
//         presentationAlreadySumitted: true,
//       });
//     }

//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     // get original filename
//     const originalName = `${hackathonDetails.title}_${teamDetails.teamName}_${req.file.originalname}`;

//     const pdfName = originalName.replace(/\s+/g, "");

//     const uploadStream = await cloudinary.uploader.upload_stream(
//       {
//         resource_type: "raw",
//         folder: process.env.CLOUDINARY_FOLDER || "hackathon_pdfs",
//         public_id: pdfName,
//         type: "upload",
//         format: "pdf",
//       },
//       async (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload error:", error);
//           return res.status(500).json({ success: false, error: "Cloudinary upload failed", detail: error.message });
//         }

//         console.log(result.secure_url)
//         const viewUrl = result.secure_url
//           .replace("/raw/upload/", "/upload/")
//           .replace(pdfName, encodeURIComponent(pdfName));


//         // fileUrl = result.secure_url;
//         console.log(viewUrl)
//       }
//     );

//     // Finish the upload by writing buffer to the stream
//     uploadStream.end(req.file.buffer);

//     console.log("✔ File Uploaded:", fileUrl);
//     // uploadStream.end(req.file.buffer);


//     // 7️⃣ Save submission (optional: push teamId)
//     hackathon.ideaSubmitedBy.push(teamDetails.teamId);
//     await hackathon.save();

//     res.status(200).json({ success: true, fileUrl });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message, success: false });
//   }
// };



module.exports = {
  getHackathonData,
  // submitHachathonPpt
};
