const request = require("request");

const router = require("express").Router();

router.post("/stock", (req, resp) => {
  const { symbol } = req.body;
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=demo`;

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        return resp.status(500).json({ message: err });
      } else if (res.statusCode !== 200) {
        return resp.status(404).json({ message: "not found" });
      } else {
        // data is successfully parsed as a JSON object:
        // return res.json({data: data["Weekly Time Series"]["2023-05-19"]});
        return resp.json({ data: data["Weekly Time Series"]["2023-05-19"] });
      }
    }
  );
});

module.exports = router;
