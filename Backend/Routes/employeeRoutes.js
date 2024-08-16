const express = require("express");
const loginData = require("../Controllers/login");
const mySqlPool = require("../config/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/login", async (req, res) => {
  // const data=req.body;
  // alert("hello")
  console.log(req.body);
  try {
    const dataquery = await mySqlPool.query(
      `SELECT * FROM employee_info WHERE Email=? LIMIT 1`,
      [req.body.email]
    );
    // console.log(dataquery);
    if (!dataquery) {
      return res.send({
        sucess: false,
        message: "Something Went Wrong",
      });
    }
    // console.log()
    if (dataquery[0][0].Password === req.body.password) {
      const token = jwt.sign(
        {
          Name: dataquery[0][0].Name,
          Email: dataquery[0][0].Email,
          Role: dataquery[0][0].Role,
        },
        process.env.SECRET_KEY
      );
      // obj.token=token;
      return res.status(200).send({
        sucess: true,
        message: "Login SucessFul",
        data: {
          Name: dataquery[0][0].Name,
          Email: dataquery[0][0].Email,
          Password: dataquery[0][0].Password,
          token: token,
        },
      });
    }
    return res.status(400).send({
      sucess: false,
      message: "Something Went Wrong",
    });
  } catch (e) {
    console.log("There is Error in login" + e);
    res.status(500).send({
      sucess: false,
      message: "Something Went Wrong",
      err: e,
    });
  }
});
router.post("/signup", async (req, res) => {
  // console.log("sign up is hited");
  let role = "Admin";
  const urlData = req.body;
  // console.log("this is auth body");
  // console.log(urlData);
  // console.log(urlData);
  const obj = {
    Name: urlData.name,
    Email: urlData.email,
    Password: urlData.password,
    token: "",
    role: "Admin",
  };
  try {
    const data = await mySqlPool.query(
      `INSERT INTO employee_info (Name,Email,Password,Role) VALUES (?,?,?,?)`,
      [obj.Name, obj.Email, obj.Password, role]
    );
    console.log(data);
    if (!data) {
      return res.status(404).send({
        sucess: false,
        message: "Something Went Wrong",
        err: e,
      });
    }

    const token = jwt.sign(
      { Name: urlData.name, Email: urlData.email, Role: "Admin" },
      process.env.SECRET_KEY
    );
    obj.token = token;
    // console.log("This is Token")
    // console.log(token);
    // res.cookie('jwt', token, { httpOnly: true });
    // const sql = 'SELECT * FROM employee_info WHERE Email = ? LIMIT 1';

    return res.status(200).send({
      sucess: true,
      message: "You Are Sign In",
      data: obj,
    });
  } catch (e) {
    console.log("There is an error in Sign up " + e);
    res.status(500).send({
      sucess: false,
      message: "Something Went Wrong",
      err: e,
    });
  }
});

router.post("/organizationU/:id", async (req, res) => {
  // console.log("This is Eail"+req.body.NameData)
  // console.log(req.params.id);
  // console.log(process.env.SECRET_KEY);

  const Token = jwt.sign(
    {
      EmailOrganiser: req.params.id,
      EmailAuthor: req.body.name,
      role: "Organization",
    },
    process.env.SECRET_KEY
  );
  // console.log("THe Gerenerated Web Token");
  // console.log(Token);
  const link = `http://localhost:3000/authLogin/${Token}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parasnaulia88@gmail.com",
        pass: "yyxz zpqm xqcl pzeo",
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: req.params.id,
        address: req.body.EmailData,
      },
      to: `${req.body.EmailData}`, // List of receivers
      subject: "Create Account Here ✔", // Subject line
      text: link, // Plain text body
      html: ` Create Account ${link}`, // HTML body
    });

    // console.log("Mail sent:", info.response);
    return res.status(200).send({ message: "Mail sent successfully" });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/auth", async (req, res) => {
  // console.log(req.body)

  const tokenData = jwt.verify(req.body.token, process.env.SECRET_KEY);
  // console.log(tokenData);

  return res.status(200).send({
    message: "Auth SucessFully",
    data: tokenData,
  });

  console.log("Api is Hitted");
  return res.status(200).send({ message: "Done" });
});
const dataMiddle = async (req, res, next) => {
  try {
    // console.log("Checking if user already exists...");
    const [findData] = await mySqlPool.query(
      "SELECT * FROM employee_info WHERE Email = ?",
      [req.body.email]
    );

    if (findData.length > 0) {
      // User exists, return an error
      console.log("User already present");
      return res.status(409).send({
        message: "User already exists",
        success: false,
        error: "User already exists",
      });
    }

    // User does not exist, proceed to the next middleware/route handler
    next();
  } catch (err) {
    console.log("Error in dataMiddle: " + err);
    return res.status(500).send({
      message: "Database query failed",
      success: false,
      error: err.message,
    });
  }
};

router.post("/signupD/:id", dataMiddle, async (req, res) => {
  // console.log("this is org api");
  const urlData = req.body;
  // console.log(req.body);
  const obj = {
    Name: urlData.name,
    Email: urlData.email,
    Password: urlData.password,
    token: "",
    role: "",
  };

  const tokenVerify = jwt.verify(req.params.id, process.env.SECRET_KEY);

  obj.role = tokenVerify.role;
  // obj.token=req.params.id;

  // console.log(obj);
  // console.log(Ctoken+"this is Ctoken")

  try {
    const data = await mySqlPool.query(
      `INSERT INTO employee_info (Name,Email,Password,Role) VALUES (?,?,?,?)`,
      [obj.Name, obj.Email, obj.Password, obj.role]
    );
    // console.log(data);
    if (!data) {
      return res.status(404).send({
        sucess: false,
        message: "Something Went Wrong",
        err: e,
      });
    }

    const Ctoken = jwt.sign(
      { Name: obj.Name, Email: obj.Email, Role: tokenVerify.role },
      process.env.SECRET_KEY
    );
    obj.token = Ctoken;
    // console.log("This is Token")
    // console.log(token);
    // res.cookie('jwt', token, { httpOnly: true });
    // const sql = 'SELECT * FROM employee_info WHERE Email = ? LIMIT 1';
    // console.log("yha bhi aagya")
    return res.status(200).send({
      sucess: true,
      message: "You Are Sign In",
      data: obj,
    });
  } catch (e) {
    // console.log("There is an error in Sign up "+e);
    return res.status(500).send({
      sucess: false,
      message: "Something Went Wrong",
      err: e,
    });
  }

  res.status(200).send({
    message: "Api is Hitt",
    sucess: true,
  });
});

router.post("/package", async (req, res) => {
  //   console.log("The PAcakge Api is Hitted ");
  //   console.log(req.body);
  const { Name, Start_date, End_date, Start_Time, endTime, Project, Users } =
    req.body;

  try {
    const data = await mySqlPool.query(
      `INSERT INTO package (Name,Start_Date,End_Date,Start_Time,End_Time,Project,Users) VALUES (?,?,?,?,?,?,?)`,
      [Name, Start_date, End_date, Start_Time, endTime, Project, Users]
    );
    // console.log("Package Data Inserted Sucesscfully");
    // console.log(data);
    return res.status(200).send({
      name: "Paras",
      sucess: "true",
      data: data,
    });
  } catch (e) {
    console.log("There is Some Error In PAckage Insertion " + e);
    return res.send(500).send({
      message: "Something went Wrong in Package Insertion",
      success: false,
    });
  }
});

router.get("/package", async (req, res) => {
  console.log("pkage Get Api Is hitted");

  try {
    const [rows, fields] = await mySqlPool.query(`SELECT * FROM package`);
    // console.log(data[0][0]);
    console.log(rows);
    return res.send({
      data: rows,
    });
  } catch (e) {
    console.log("there is an error in Package Data" + e);
    return res.status(500).send({
      message: "Something Went Wrong In fetching Data",
      sucess: false,
      error: e,
    });
  }

  return res.status(200).send({
    message: "Sucess",
    success: true,
  });
});
router.delete("/package", async (req, res) => {
  console.log(req.body);
  console.log("this is Backend api of delete package");
  try {
    // const
    const data = await mySqlPool.query(
      `DELETE from package where Name=${req.body.name}`
    );
  } catch (e) {}

  return res.status(200).send({
    sucess: true,
    message: "Dats is here",
  });
});

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTXVrZXNoIiwiRW1haWwiOiJwYXJhc0BnbWFpbC5jb20iLCJpYXQiOjE3MjM1NTg3NDh9.fZhX5od_5yxrEZGfdSX1o_dA6C7t7b2AVByTQuyRd2w
