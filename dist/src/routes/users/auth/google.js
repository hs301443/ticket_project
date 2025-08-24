"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("../../../config/passport");
const router = express_1.default.Router();
// الدخول عبر جوجل
router.get("/", passport_1.default.authenticate("google", { scope: ["profile", "email"], session: false }));
// الكولباك بعد تسجيل الدخول
router.get("/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}), (req, res) => {
    const { user, token } = req.user;
    if (!user || !token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // تحويل للفرونت إند مع التوكن والبيانات
    return res.redirect(`${process.env.FRONTEND_URL}/google-auth?token=${token}&email=${user.email}&name=${user.name}`);
});
exports.default = router;
