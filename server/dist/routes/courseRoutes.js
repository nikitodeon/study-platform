"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import multer from "multer";
const courseController_1 = require("../controllers/courseController");
// import { requireAuth } from "@clerk/express";
const router = express_1.default.Router();
// const upload = multer({ storage: multer.memoryStorage() });
router.get("/", courseController_1.listCourses);
// router.post("/", requireAuth(), createCourse);
router.get("/:courseId", courseController_1.getCourse);
// router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse);
// router.delete("/:courseId", requireAuth(), deleteCourse);
// router.post(
//   "/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url",
//   requireAuth(),
//   getUploadVideoUrl
// );
exports.default = router;
