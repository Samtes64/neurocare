import React, { useState } from 'react';
import styled from "styled-components";

const Modal = ({ task, onClose }) => {
  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [mood, setMood] = useState()
  

  const handleSave = () => {
    // Save the duration and note (could be saved to the task in the state or sent to a backend)
    console.log('Task:', task);
    console.log('Duration:', duration);
    console.log('Note:', note);
    onClose();
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

        <h2 className="mb-2 font-semibold text-xl">{task.task}</h2>
        <p className='mb-4'>Description about the task</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white"

          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Select Mood</label>
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
            onChange={e => setNote(e.target.value)}
            className="border rounded-lg p-2 w-full  bg-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
