import { useState } from "react";

export default ({ visible = false }) => {
  const [toastVisible, setToastVisible] = useState(visible);
  const toggleToast = () => setToastVisible(!toastVisible);
  return [toastVisible, toggleToast];
};
