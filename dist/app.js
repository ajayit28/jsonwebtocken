"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jwt = __importStar(require("jsonwebtoken"));
var app = express_1.default();
var add = function (a, b) {
    return a + b;
};
app.get("/api", function (req, res) {
    res.send("Welcome to json web token api");
});
app.post("/api/login", function (req, res) {
    var user = {
        id: 1,
        username: "ajay",
        email: "ajay@gmail.com"
    };
    jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, function (err, token) {
        res.json({
            token: token
        });
    });
});
app.post("/api/post", verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: "Post Created",
                authData: authData
            });
        }
    });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access token>
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    var token = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof token !== 'undefined') {
        // Set the token
        req.token = token;
        // Next middleware
        next();
    }
    else {
        // Forbidden
        res.sendStatus(403);
    }
}
app.listen(5000, function () {
    console.log("Server listening on 5000 port");
});
