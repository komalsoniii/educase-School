const express = require("express");
const conn = require("./config");
const schema = require("./schemaValidate");
const calculateDistance = require("./calulateDistance");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//====================== Get School list api ====================================
app.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  } else {
    conn.query("select * from schools", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const schools = result;
        console.log(schools);
        const sortedSchools = schools
          .map((school) => ({
            ...school,
            distance: calculateDistance(
              latitude,
              longitude,
              school.latitude,
              school.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance);
        //console.log(sortedSchools);
        res.send(sortedSchools);
      }
    });
  }
});

//====================== Add School list api ====================================

app.post("/addSchool", (req, res) => {
  const data = req.body;
  const validateRes = schema.validate(data);
  console.log(validateRes);
  if (validateRes.error) {
    res.status(400).send("Validation error");
    // console.log(data.error);
  } else {
    conn.query("INSERT INTO schools SET?", data, (err, result, fields) => {
      if (err) {
        //console.log(err);
        res.status(400).send(err);
      }
      res.send(result);
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
