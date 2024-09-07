const express = require("express");
const {
  summaryController,
  // paragraphController,
  // chatbotController,
  // jsconverterController,
  // scifiImageController,
  // codeCorrectionController,
} = require("../controllers/openaiController"); 

const router = express.Router(); 

//route
router.post("/summary", summaryController);
// router.post("/code-correction", codeCorrectionController);
// router.post("/paragraph", paragraphController);
// router.post("/chatbot", chatbotController);
// router.post("/js-converter", jsconverterController);
// router.post("/scifi-image", scifiImageController);

module.exports = router; 