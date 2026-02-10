const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderMail = async (to, status) => {
  let subject = "";
  let text = "";

  if (status === "In Kitchen") {
    subject = "🍳 Your food is being prepared!";
    text = "Your order is now being prepared in our kitchen.";
  }

  if (status === "Out for Delivery") {
    subject = "🚚 Your order is on the way!";
    text = "Your order is out for delivery.";
  }

  if (!subject) return;

  await transporter.sendMail({
    from: `"Crustify 🍕" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = sendOrderMail;
