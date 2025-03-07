const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const conn = require("./config");
const schema = require("./schemaValidate");
const calculateDistance = require("./calulateDistance");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

//====================== Get School list api ====================================
// app.get("/listSchools", async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;

//     if (!latitude || !longitude) {
//       return res
//         .status(400)
//         .json({ message: "Latitude and longitude are required" });
//     }

//     const [schools] = await conn.execute("SELECT * FROM schools");
//     const userLat = parseFloat(latitude);
//     const userLng = parseFloat(longitude);

//     const sortedSchools = schools
//       .map((school) => ({
//         ...school,
//         distance: calculateDistance(
//           userLat,
//           userLng,
//           school.latitude,
//           school.longitude
//         ),
//       }))
//       .sort((a, b) => a.distance - b.distance);

//     res.json(sortedSchools);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching schools", error });
//   }
// });

// //====================== Add School list api ====================================

// app.post("/addSchool", async (req, res) => {
//   try {
//     const data = req.body;
//     const validateRes = schema.validate(data);
//     console.log(validateRes);
//     if (validateRes.error) {
//       res.status(400).send("Validation error");
//       // console.log(data.error);
//     } else {
//       const sql =
//         "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
//       const values = [data.name, data.address, data.latitude, data.longitude];

//       const result = await conn.query(sql, values);
//       //const result = await conn.query("INSERT INTO schools SET?", data);
//       res.status(201).send(result);
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
