import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: black;
`;

const SubscriptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SubscriptionCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 45%;

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

const SubscriptionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const SubscriptionButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const SubscriptionModal = ({ onSelect }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTitle>Select Your Subscription Plan</ModalTitle>
        
        <SubscriptionsContainer>
          <SubscriptionCard>
            <SubscriptionTitle>Free Plan</SubscriptionTitle>
            <Description>
              Access daily tasks to help manage your well-being.
            </Description>
            <SubscriptionButton onClick={() => onSelect("free")}>
              Choose Free Plan
            </SubscriptionButton>
          </SubscriptionCard>

          <SubscriptionCard>
            <SubscriptionTitle>Paid Plan</SubscriptionTitle>
            <Description>
              Enjoy all the features of the Free Plan, plus gain access to communicate with professional therapists for personalized guidance.
            </Description>
            <SubscriptionButton onClick={() => onSelect("paid")}>
              Choose Paid Plan
            </SubscriptionButton>
          </SubscriptionCard>
        </SubscriptionsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SubscriptionModal;
