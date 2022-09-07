var express = require("express");
var app = express();
var fs = require("fs");
var session = require("express-session");
var fileUpload = require("express-fileupload");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: "kjhwkjhwkjerh" }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "web_giorgos",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connection !!");
});

app.get("/", function (req, res) {
  var code = fs.readFileSync(__dirname + "/html/menu1.html");
  code += fs.readFileSync(__dirname + "/html/index.html");
  res.send(code);
});

app.get("/signup", function (req, res) {
  var code = fs.readFileSync(__dirname + "/html/menu1.html");
  code += fs.readFileSync(__dirname + "/html/signup.html");
  res.send(code);
});

app.post("/insertuser", function (req, res) {
  var usr = req.body.usr;
  var pss = req.body.pwd;
  var email = req.body.email;

  var sql =
    "INSERT INTO user (username,password, email) VALUES ('" +
    usr +
    "', '" +
    pss +
    "','" +
    email +
    "')";

  con.query(sql, function (err, result) {
    if (err) res.send("2");
    else res.send("1");
  });
});

app.post("/inskat2", function (req, res) {
  var natom = req.body.natom;
  var pid = req.query.pid;
  var usr = req.session.usr;

  var sql =
    "INSERT INTO user_visit (username,idp, date1,persons) VALUES ('" +
    usr +
    "', '" +
    pid +
    "',now(),'" +
    natom +
    "')";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) res.send("2");
    else res.send("1");
  });
});

app.post("/saveprofile", function (req, res) {
  var usr2 = req.body.usr;
  var pss = req.body.pwd;
  var email = req.body.email;

  var usr = req.session.usr;

  var sql =
    "update user set username='" +
    usr2 +
    "',password='" +
    pss +
    "', email='" +
    email +
    "' where username='" +
    usr +
    "'";

  con.query(sql, function (err, result) {
    if (err) res.send("2");
    else {
      req.session.usr = usr2;
      res.send("1");
    }
  });
});

app.post("/saveprofile2", function (req, res) {
  var usr2 = req.body.usr;
  var pss = req.body.pwd;

  var usr = req.session.admin;

  var sql =
    "update admin set username='" +
    usr2 +
    "',password='" +
    pss +
    "'  where username='" +
    usr +
    "'";

  con.query(sql, function (err, result) {
    if (err) res.send("2");
    else {
      req.session.admin = usr2;
      res.send("1");
    }
  });
});

app.get("/login", function (req, res) {
  var code = fs.readFileSync(__dirname + "/html/menu1.html");
  code += fs.readFileSync(__dirname + "/html/login.html");
  res.send(code);
});

app.get("/admin", function (req, res) {
  var code = fs.readFileSync(__dirname + "/html/menu1.html");
  code += fs.readFileSync(__dirname + "/html/admin.html");
  res.send(code);
});

app.post("/login2", function (req, res) {
  var usr = req.body.usr;
  var pss = req.body.pwd;

  var sql =
    "select * from user where username='" +
    usr +
    "' and password='" +
    pss +
    "'";

  con.query(sql, function (err, result) {
    if (result.length > 0) {
      req.session.usr = result[0].username;
      res.send("1");
    } else {
      req.session.usr = "";
      res.send("0");
    }
  });
});

app.post("/login3", function (req, res) {
  var usr = req.body.usr;
  var pss = req.body.pwd;

  var sql =
    "select * from admin where username='" +
    usr +
    "' and password='" +
    pss +
    "'";

  con.query(sql, function (err, result) {
    if (result.length > 0) {
      req.session.admin = result[0].username;
      res.send("1");
    } else {
      req.session.admin = "";
      res.send("0");
    }
  });
});

app.get("/loginuser", function (req, res) {
  var usr = req.session.usr;
  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu2.html");
    code += fs.readFileSync(__dirname + "/html/xartis2.html");
    res.send(code);
  }
});

app.get("/loginadmin", function (req, res) {
  var usr = req.session.admin;
  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu3.html");
    code += fs.readFileSync(__dirname + "/html/xartis2.html");
    res.send(code);
  }
});

app.get("/logout", function (req, res) {
  req.session.usr = "";
  var code = fs.readFileSync(__dirname + "/html/menu1.html");
  code += fs.readFileSync(__dirname + "/html/index.html");
  res.send(code);
});

app.get("/profile", function (req, res) {
  var usr = req.session.usr;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu2.html");
    code += fs.readFileSync(__dirname + "/html/profile.html");
    res.send(code);
  }
});

app.get("/profile2", function (req, res) {
  var usr = req.session.admin;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu3.html");
    code += fs.readFileSync(__dirname + "/html/profile2.html");
    res.send(code);
  }
});

app.get("/statistics", function (req, res) {
  var usr = req.session.admin;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu3.html");
    code += fs.readFileSync(__dirname + "/html/stats.html");
    res.send(code);
  }
});

app.get("/profilejson", function (req, res) {
  var usr = req.session.usr;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var sql = "select * from user where username='" + usr + "'";

    con.query(sql, function (err, result) {
      res.send(result);
    });
  }
});

app.get("/profile2json", function (req, res) {
  var usr = req.session.admin;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var sql = "select * from admin where username='" + usr + "'";

    con.query(sql, function (err, result) {
      res.send(result);
    });
  }
});

app.get("/epafes", function (req, res) {
  var usr = req.session.usr;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu2.html");
    code += fs.readFileSync(__dirname + "/html/epafes.html");
    res.send(code);
  }
});

app.get("/inpkat", function (req, res) {
  var usr = req.session.usr;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu2.html");
    code += fs.readFileSync(__dirname + "/html/inpkat.html");
    res.send(code);
  }
});

app.get("/setcovid", function (req, res) {
  var usr = req.session.usr;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu2.html");
    code += fs.readFileSync(__dirname + "/html/setcovid.html");
    res.send(code);
  }
});

app.post("/setcovid2", function (req, res) {
  var d1 = req.body.ttest;
  var usr = req.session.usr;
  var sql2 =
    "select * from covid where username='" +
    usr +
    "' and abs(DATEDIFF(date1, '" +
    d1 +
    "'))<14";
  con.query(sql2, function (err, result2) {
    if (result2.length == 0) {
      var sql =
        "INSERT INTO covid (username,date1) VALUES ('" +
        usr +
        "', '" +
        d1 +
        "')";

      con.query(sql, function (err, result) {
        if (err) res.send("2");
        else res.send("1");
      });
    } else {
      res.send("3");
    }
  });
});

app.get("/episkepseis", function (req, res) {
  var usr = req.session.usr;
  var sql2 =
    "select * from user_visit,points where username='" +
    usr +
    "' and points.id=user_visit.idp";
  con.query(sql2, function (err, result2) {
    res.send(result2);
  });
});

app.get("/diloseis", function (req, res) {
  var usr = req.session.usr;
  var sql2 = "select * from covid where username='" + usr + "' ";
  con.query(sql2, function (err, result2) {
    res.send(result2);
  });
});

app.get("/episkepseis2", function (req, res) {
  var usr = req.session.usr;
  var sql2 =
    "select * from (select * from user_visit,points where username='" +
    usr +
    "' and points.id=user_visit.idp) as p1";
  var sql2 =
    sql2 +
    "(select *, user_visit.date1 as d1, covid.date1 as d2 from user_visit,points,covid  and points.id=user_visit.idp and user_visit.username=covid.username) as p2";
  var sql2 =
    sql2 +
    " and p1.id=p2.id and p1.username<>p2.username and abs(timestampdiff(hour,p1.date1,p2.d1))<=2 and datediff(p2.d1,p2.d2) between 0 and 7";

  con.query(sql2, function (err, result2) {
    res.send(result2);
  });
});

app.get("/upload", function (req, res) {
  var usr = req.session.admin;
  console.log(usr);
  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var code = fs.readFileSync(__dirname + "/html/menu3.html");
    code += fs.readFileSync(__dirname + "/html/upload.html");
    res.send(code);
  }
});

function escape_html(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return str.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

function ins(D) {
  var sql = "delete from points where id= '" + D.id + "'";

  con.query(sql, (err, result) => {
    var sql2 =
      "insert into points (id,name,address,lat,lng) values ('" +
      D.id +
      "','" +
      escape_html(D.name) +
      "','" +
      escape_html(D.address) +
      "','" +
      D.coordinates.lat +
      "','" +
      D.coordinates.lng +
      "')";

    con.query(sql2, (err, result) => {
      var Types = D.types;
      var PT = D.populartimes;

      var recs = "";
      var comma = "";
      for (var i = 0; i < Types.length; i++) {
        recs += comma + "('" + D.id + "','" + Types[i] + "')";
        comma = ",";
      }

      var sql3 = "insert into type (idp,type) values " + recs;

      con.query(sql3);

      var recs = "";
      var comma = "";
      for (var i = 0; i < PT.length; i++) {
        var e = PT[i];
        for (j = 0; j < e.data.length; j++) {
          recs +=
            comma +
            "('" +
            D.id +
            "','" +
            e.name +
            "','" +
            j +
            "','" +
            e.data[j] +
            "')";
          comma = ",";
        }
      }

      var sql4 =
        "insert into populartimes (idp,day,time,popularity) values " + recs;

      con.query(sql4);
    });
  });
}

app.post("/uploadfile", function (req, res) {
  var usr = req.session.admin;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    let f = req.files.fn;
    f.mv("./uploads/" + f.name);

    fs.readFile("./uploads/" + f.name, (err, data) => {
      if (err) res.send("2");
      let D = JSON.parse(data);
      D.forEach((e) => ins(e));

      fs.unlinkSync("./uploads/" + f.name);
      res.send("1");
    });
  }
});

app.get("/points", function (req, res) {
  var cat = req.query.cat;
  var sql =
    "select *, p0.popularity as pp0, p1.popularity as pp1, p2.popularity as pp2, p3.avgprs as avgprs ";
  sql = sql + " from points, type,  ";
  sql =
    sql +
    " (select * from populartimes where dayname(now())=populartimes.day and hour(now())=populartimes.time) as p0, ";
  sql =
    sql +
    " (select * from populartimes where dayname(date_add(now(),interval 1 hour))=populartimes.day and hour(date_add(now(),interval 1 hour))=populartimes.time) as p1, ";
  sql =
    sql +
    " (select * from populartimes where dayname(date_add(now(),interval 2 hour))=populartimes.day and hour(date_add(now(),interval 2 hour))=populartimes.time) as p2,";
  sql =
    sql +
    " ( select avg(persons) as avgprs,id from points left join ((select * from user_visit  where date1 between date_sub(now(),interval 2 hour) and now()) as p31) on p31.idp=points.id  group by id) as p3 ";
  sql =
    sql +
    " where p0.idp=points.id and p1.idp=points.id and p2.idp=points.id and p3.id=points.id and type.idp=points.id ";
  sql = sql + " and type.type like '%" + cat + "%' ";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/deldata", function (req, res) {
  var usr = req.session.admin;

  if (usr == "" || usr == undefined) res.send("No connection");
  else {
    var sql = "delete from points";

    con.query(sql);
    res.send("1");
  }
});

// statisika diaxeiristi

app.get("/episkall", function (req, res) {
  var sql = "select count(*) as e from user_visit";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/krousmataall", function (req, res) {
  var sql =
    "select count(*) as e from (select distinct username from covid) as p";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/episkkrou", function (req, res) {
  var sql =
    "select count(*) as e from user_visit, covid where covid.username=user_visit.username and datediff(covid.date1,user_visit.date1) between -7 and 14";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/simiacateg", function (req, res) {
  var sql =
    "select type.type as t , count(*) as c from points, user_visit, type where points.id=user_visit.idp and type.idp=points.id group by type.type order by c desc";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/krousmcateg", function (req, res) {
  var sql =
    "select type.type as t , count(*) as c from points, user_visit, type, covid";
  sql +=
    "	where points.id=user_visit.idp and type.idp=points.id and covid.username=user_visit.username and datediff(covid.date1,user_visit.date1) between -7 and 14";
  sql += " group by type.type order by c desc";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/diag1a", function (req, res) {
  var y = req.query.y;
  var w = req.query.w;

  var sql =
    "select date_format(user_visit.date1,'%y-%m-%d') as dd , count(*) as c from  user_visit where week(user_visit.date1)=" +
    w +
    " and year(user_visit.date1)=" +
    y +
    " group by dd";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/diag1b", function (req, res) {
  var d = req.query.d;
  var sql = "select  count(*) as c from points, user_visit, covid";
  sql +=
    "	where points.id=user_visit.idp and covid.username=user_visit.username and datediff(covid.date1,user_visit.date1) between -7 and 14";
  sql += " and date(user_visit.date1)='" + d + "'";

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/diag2a", function (req, res) {
  var d = req.query.dd;
  var h = req.query.h;

  var sql =
    "select  count(*) as c from  user_visit where date(user_visit.date1)='" +
    d +
    "' and hour(user_visit.date1)=" +
    h;

  con.query(sql, function (err, result) {
    res.send(result);
  });
});

app.get("/diag2b", function (req, res) {
  var d = req.query.dd;
  var h = req.query.h;
  var sql = "select  count(*) as c from points, user_visit, covid";
  sql +=
    "	where points.id=user_visit.idp and covid.username=user_visit.username and datediff(covid.date1,user_visit.date1) between -7 and 14";
  sql +=
    " and  date(user_visit.date1)='" + d + "' and hour(user_visit.date1)=" + h;

  con.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

/// main server

app.get("/css", function (req, res) {
  res.sendFile(__dirname + "/html/my.css");
});

app.get("/js", function (req, res) {
  res.sendFile(__dirname + "/html/my.js");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listen to port http://%s:%s", host, port);
});
