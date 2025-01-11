"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkClient = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dynamoose = __importStar(require("dynamoose"));
// import serverless from "serverless-http";
// import seed from "./seed/seedDynamodb";
const express_2 = require("@clerk/express");
// /* ROUTE IMPORTS */
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const userClerkRoutes_1 = __importDefault(require("./routes/userClerkRoutes"));
// import transactionRoutes from "./routes/transactionRoutes";
// import userCourseProgressRoutes from "./routes/userCourseProgressRoutes";
/* CONFIGURATIONS */
dotenv_1.default.config();
console.log("dotenv loaded");
///////////////
console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY);
/////////////
const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
    dynamoose.aws.ddb.local();
}
///////////////
console.log("Clerk Secret Key for Client:", process.env.CLERK_SECRET_KEY);
////////////
exports.clerkClient = (0, express_2.createClerkClient)({
    secretKey: process.env.CLERK_SECRET_KEY,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// app.use(clerkMiddleware());
/* ROUTES */
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/courses", courseRoutes_1.default);
app.use("/users/clerk", userClerkRoutes_1.default); /*requireAuth(),*/
// app.use("/transactions", requireAuth(), transactionRoutes);
// app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes);
/* SERVER */
const port = process.env.PORT || 3000;
if (!isProduction) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
// aws production environment
// const serverlessApp = serverless(app);
// export const handler = async (event: any, context: any) => {
//   if (event.action === "seed") {
//     await seed();
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Data seeded successfully" }),
//     };
//   } else {
//     return serverlessApp(event, context);
//   }
// };
