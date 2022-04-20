const express = require("express");
const { subjectsController: controller } = require("../../di");
const router = express.Router();

router.get("", (req, res, next) => controller.find(req, res, next));
router.get("/:id", (req, res, next) => controller.get(req, res, next));
router.post("", (req, res, next) => controller.create(req, res, next));
router.patch("/:id", (req, res, next) => controller.update(req, res, next));
router.delete("/:id", (req, res, next) => controller.delete(req, res, next));


module.exports = router;