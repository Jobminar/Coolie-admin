import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Alert, Form } from "antd";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify"; // Import DOMPurify
import "react-quill/dist/quill.snow.css"; // Quill styles
import "./EditFAQPopup.css";

const EditFAQPopup = ({ faq, isOpen, onClose, onUpdate }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleUpdate = () => {
    if (!question.trim() || !answer.trim()) {
      setError("Both question and answer fields are required.");
      return;
    }

    // Sanitize the input to remove any HTML tags
    const sanitizedQuestion = stripHtmlTags(DOMPurify.sanitize(question));
    const sanitizedAnswer = stripHtmlTags(DOMPurify.sanitize(answer));

    setLoading(true);
    axios
      .put(`https://api.coolieno1.in/v1.0/users/faq/${faq._id}`, {
        question: sanitizedQuestion,
        answer: sanitizedAnswer,
      })
      .then((response) => {
        onUpdate(response.data); // Pass the updated FAQ back to the parent
        onClose(); // Close the popup
      })
      .catch((error) => {
        console.error("Error updating FAQ:", error);
        setError("Failed to update FAQ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Edit FAQ"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="popup-cancel-button">
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={handleUpdate}
          loading={loading}
          disabled={loading}
          className="popup-update-button"
        >
          {loading ? "Updating..." : "Update FAQ"}
        </Button>,
      ]}
      className="edit-faq-modal"
    >
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="popup-error-alert"
        />
      )}
      <Form layout="vertical" className="popup-form-group">
        <Form.Item
          label="Question"
          required
          help={`${question.length}/150`}
          validateStatus={question.length > 150 ? "error" : ""}
        >
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter FAQ question"
            className="popup-input"
            maxLength={150}
          />
        </Form.Item>
        <Form.Item label="Answer" required>
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            className="popup-textarea"
            placeholder="Enter FAQ answer"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFAQPopup;
