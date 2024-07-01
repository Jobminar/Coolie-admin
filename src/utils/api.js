import emailjs from "emailjs-com";

// Function to generate OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
export const sendOtpEmail = (otp, recipient) => {
  const templateParams = {
    otp: otp,
    recipient: recipient,
  };

  return emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID")
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      return response;
    })
    .catch((error) => {
      console.error("FAILED...", error);
      throw error;
    });
};

// Function to send form data to multiple APIs
export const sendFormDataToApis = async (formData) => {
  const apiUrls = [
    "https://api1.example.com/endpoint",
    "https://api2.example.com/endpoint",
    "https://api3.example.com/endpoint",
  ];

  const requests = apiUrls.map((url) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Error from ${url}: ${response.statusText}`);
      }
      return response.json();
    }),
  );

  try {
    const results = await Promise.all(requests);
    console.log("API responses:", results);
    return results;
  } catch (error) {
    console.error("Error sending form data to APIs:", error);
    throw error;
  }
};

// Add your validation logic here
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }
  if (!formData.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Mobile number must be 10 digits";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.aadhar.trim()) {
    errors.aadhar = "Aadhar number is required";
  } else if (!/^\d{12}$/.test(formData.aadhar)) {
    errors.aadhar = "Aadhar number must be 12 digits";
  }
  if (!formData.pan.trim()) {
    errors.pan = "PAN is required";
  } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan)) {
    errors.pan = "PAN format is invalid";
  }
  // Add more validations as needed

  return errors;
};
