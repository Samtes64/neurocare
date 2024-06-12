import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
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
  background: #f0f0f0;
  border-radius: 10px;
  padding: 30px;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

const SubscriptionTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.primary || "#007BFF"};
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Price = styled.p`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SubscriptionButton = styled.button`
  background-color: ${({ theme }) => theme.primary || "#007BFF"};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 15px 25px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#0056b3"};
  }
`;

const SubscriptionModal = ({ onSelect }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTitle>Select Your Subscription Plan</ModalTitle>

        <SubscriptionsContainer>
          <SubscriptionCard onClick={() => onSelect("free")}>
            <SubscriptionTitle>Free Plan</SubscriptionTitle>
            <Description>
              Access daily tasks to help manage your well-being.
            </Description>
            <Price>Price: 0 Birr</Price>
            <SubscriptionButton>Choose Free Plan</SubscriptionButton>
          </SubscriptionCard>

          <SubscriptionCard onClick={() => onSelect("paid")}>
            <SubscriptionTitle>Paid Plan</SubscriptionTitle>
            <Description>
              Enjoy all the features of the Free Plan, plus gain access to communicate with professional therapists for personalized guidance.
            </Description>
            <Price>Price: 3499 Birr</Price>
            <SubscriptionButton>Choose Paid Plan</SubscriptionButton>
          </SubscriptionCard>
        </SubscriptionsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SubscriptionModal;
