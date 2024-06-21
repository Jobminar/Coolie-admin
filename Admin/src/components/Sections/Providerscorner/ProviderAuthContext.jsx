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
        setProviderId,
        phone,
        setPhone,
        providerDetailsSubmitted,
        setProviderDetailsSubmitted,
      }}
    >
      {children}
    </ProviderAuthContext.Provider>
  );
};
