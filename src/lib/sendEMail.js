

const sendEmail = async (email, content) => {

  try {
    fetch("https://emrms-express.vercel.app/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        subject: "Use this to log in to EMRMS",
        message: content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send OTP email");
        }
        return response.json();
      })
      .then((data) => {
        console.log("[OTP] Email sent successfully:", data);
      })
      .catch((error) => {
        console.error("[OTP] Email sending error:", error);
      });
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;