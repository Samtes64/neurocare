import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addDoneTask, getAllTreatments } from "../api";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.background_secondary};
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 8px;
  background: ${({ theme }) => theme.background_primary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Subtitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-top: 10px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
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

const StickerRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const AddDoneTask = ({treatment,duration,mood,note,setTreatment,setDuration,setMood,setNote, addNewDoneTask, buttonLoading , validateInputs}) => {
  const [treatments, setTreatments] = useState([]);



  const token = localStorage.getItem("fittrack-app-token");

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await getAllTreatments(token);

        const data = await response.data;
        setTreatments(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, [token]);

  
  const stickers = ["😢", "😟", "😐", "😊", "😃"];

  return (
    <Card>
      <Title>Add Done Task</Title>
      <Select className="bg-white" value={treatment} onChange={(e) => setTreatment(e.target.value)}>
        <option value="" disabled>
          Select Treatment
        </option>
        {treatments.map((t) => (
          <option key={t._id} value={t._id}>
            {t.treatmentName}
          </option>
        ))}
      </Select>
      <TextInput
        label="Duration (minutes)"
        placeholder="Enter duration in minutes"
        value={duration}
        handelChange={(e) => setDuration(e.target.value)}
        type="number"
      />
      <Subtitle>Select Mood</Subtitle>
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
      <TextInput
        label="Note"
        placeholder="Enter additional notes"
        value={note}
        handelChange={(e) => setNote(e.target.value)}
        textArea
        rows={4}
      />
      <Button
        text="Add Task"
        small
        onClick={addNewDoneTask}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddDoneTask;
