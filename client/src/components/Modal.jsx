import React, { useState } from "react";
import styled from "styled-components";
import { addDoneTask } from "../api";

const Modal = ({ task, onClose, onTaskCompleted }) => {
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [mood, setMood] = useState(null); // Initialize as null to easily check for empty value
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("fittrack-app-token");

  const handleSave = async () => {
    if (!mood || !duration) {
      setErrorMessage("Mood and duration cannot be empty.");
      return;
    }

    setButtonLoading(true);

    try {
      // Call addNewDoneTask with appropriate parameters
      await addDoneTask(token, {
        treatment: task.treatment._id,
        duration,
        mood,
        note,
        task: task._id,
      });

      onTaskCompleted();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      setErrorMessage("Error saving task. Please try again.");
    } finally {
      setButtonLoading(false);
    }
  };

  const StickerRating = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
  `;

  const Sticker = styled.span`
    font-size: 24px;
    cursor: pointer;
    margin: 0 5px;
    transition: transform 0.3s;
    transform: scale(${({ selected }) => (selected ? 1.4 : 1)});
    @media (max-width: 600px) {
      font-size: 28px;
    }
  `;

  const stickers = ["😢", "😟", "😐", "😊", "😃"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Task Details</h1>

        <h2 className="mb-2 font-semibold text-xl">
          {task.treatment.treatmentName}
        </h2>
        <p className="mb-4">{task.treatment.treatmentDescription}</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Select Mood
          </label>
          <StickerRating>
            {stickers.map((sticker, index) => (
              <Sticker
                key={index}
                selected={index + 1 === mood}
                onClick={() => setMood(index + 1)}
              >
                {sticker}
              </Sticker>
            ))}
          </StickerRating>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white"
          />
        </div>
        {errorMessage && (
          <div className="mt-2 text-red-500">{errorMessage}</div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
              buttonLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={buttonLoading}
          >
            {buttonLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
