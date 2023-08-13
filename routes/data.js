const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { authenticateJwt } = require("../middleware/auth");
const { Data } = require("../db/mongo");

const router = express.Router();

router.post("/product", authenticateJwt, async (req, res) => {
  try {
    const { url } = req.body;

    const existingData = await Data.findOne({ url });
    if (existingData) {
      return res.json({
        message: "URL already exists in the database",
        data: existingData,
      });
    }

    const response = await axios.get(url);
    const responseData = response.data;

    const title = extractData(responseData, "._9E25nV");
    const price = extractData(responseData, "._30jeq3._16Jk6d");
    const description = extractData(responseData, "._1mXcCf._3v2SvE");
    const reviewAndRatings = extractData(responseData, "._3Qw4XM div", 1);
    const ratings = extractData(responseData, "._3LWZlK");
    const mediaCounts = countMedia(responseData, ".CXW8mj");

    const scrapedData = new Data({
      url,
      title,
      price,
      description,
      reviewAndRatings,
      ratings,
      mediaCounts,
    });

    await scrapedData.save();

    res.json({
      message: "Data scraped and saved successfully",
      data: scrapedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function extractData(responseData, selector, index = 0) {
  const $ = cheerio.load(responseData);
  return $(selector).eq(index).text();
}

function countMedia(responseData, selector) {
  const $ = cheerio.load(responseData);
  return $(selector).length;
}

module.exports = router;
