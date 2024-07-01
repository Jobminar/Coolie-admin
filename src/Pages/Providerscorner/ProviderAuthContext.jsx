import React, { createContext, useState, useEffect } from "react";

export const ProviderAuthContext = createContext();

export const ProviderAuthProvider = ({ children }) => {
  const [providerId, setProviderId] = useState(() =>
    sessionStorage.getItem("providerId"),
  );
  const [phone, setPhone] = useState(() => sessionStorage.getItem("phone"));
  const [providerDetailsSubmitted, setProviderDetailsSubmitted] = useState(
    () => sessionStorage.getItem("providerDetailsSubmitted") === "true",
  );
  const [loading, setLoading] = useState(false); // Loading state

  const handleSetProviderId = (id) => {
    if (window.confirm("Are you sure you want to set this provider ID?")) {
      setLoading(true);
      setProviderId(id);
      alert("Provider ID set successfully.");
      setLoading(false);
    }
  };

  const handleSetPhone = (phoneNumber) => {
    if (window.confirm("Are you sure you want to set this phone number?")) {
      setLoading(true);
      setPhone(phoneNumber);
      alert("Phone number set successfully.");
      setLoading(false);
    }
  };

  const handleSetProviderDetailsSubmitted = (submitted) => {
    if (
      window.confirm(
        `Are you sure you want to ${
          submitted ? "mark as submitted" : "mark as not submitted"
        }?`,
      )
    ) {
      setLoading(true);
      setProviderDetailsSubmitted(submitted);
      alert("Provider details submission status updated.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) {
      sessionStorage.setItem("providerId", providerId);
    } else {
      sessionStorage.removeItem("providerId");
    }
  }, [providerId]);

  useEffect(() => {
    if (phone) {
      sessionStorage.setItem("phone", phone);
    } else {
      sessionStorage.removeItem("phone");
    }
  }, [phone]);

  useEffect(() => {
    sessionStorage.setItem(
      "providerDetailsSubmitted",
      providerDetailsSubmitted,
    );
  }, [providerDetailsSubmitted]);

  return (
    <ProviderAuthContext.Provider
      value={{
        providerId,
        setProviderId: handleSetProviderId,
        phone,
        setPhone: handleSetPhone,
        providerDetailsSubmitted,
        setProviderDetailsSubmitted: handleSetProviderDetailsSubmitted,
        loading,
      }}
    >
      {loading && <div className="loading">Loading...</div>}
      {children}
    </ProviderAuthContext.Provider>
  );
};
