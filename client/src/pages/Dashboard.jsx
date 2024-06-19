import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddDoneTask from "../components/AddDoneTask";
import TaskCard from "../components/cards/TaskCard";
import { subscriptionSuccess } from "../redux/reducers/userSlice";
import {
  addDoneTask,
  addPayment,
  getDashboardDetails,
  getDoneTasks,
} from "../api";
import { Link } from "react-router-dom";
import axios from "axios";

import SubscriptionModal from "../components/SubscriptionModal";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Button = styled.button`
  position: relative;
  bottom: 60px;
  right: 20px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  justify-content: end;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [treatment, setTreatment] = useState("");
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { userinfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!treatment || !duration || !mood) {
      alert("Please fill in all fields");
      setButtonLoading(false);
      return false;
    }
    if (isNaN(duration) || duration <= 0) {
      alert("Please enter a valid number for duration");
      setButtonLoading(false);
      return false;
    }
    return true;
  };

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  const getTodaysTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDoneTasks(token, "").then((res) => {
      setTodaysTasks(res?.data?.todaysDoneTasks);
      console.log(res.data);
      setLoading(false);
    });
  };

  const checkout = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const response = await axios.post(
        "http://localhost:3003/api/payment/addpayment",
        { rdurl: "http://localhost:3000" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const checkoutUrl = response?.data?.detail?.data?.checkout_url;
      if (checkoutUrl) {
        dispatch(subscriptionSuccess(true));
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  const freecheckout = async () => {
    const token = localStorage.getItem("fittrack-app-token");

    try {
      const response = await axios.post(
        "http://localhost:3003/api/payment/freepayment",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(subscriptionSuccess(false)); // Set to false for free subscription
      } else {
        console.error("Subscription update failed");
      }
    } catch (error) {
      console.error("Error during subscription update", error);
    }
  };

  const addNewDoneTask = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");

    if (validateInputs()) {
      await addDoneTask(token, { treatment, duration, mood, note })
        .then((res) => {
          dashboardData();
          getTodaysTasks();
          setButtonLoading(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleSubscriptionSelect = (plan) => {
    setShowModal(false);
    console.log(plan);
    if (plan === "paid") {
      checkout();
    } else if (plan === "free") {
      freecheckout();
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysTasks();

    if (userinfo && userinfo.isPremium == null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          {/* <AddDoneTask
            treatment={treatment}
            setTreatment={setTreatment}
            duration={duration}
            setDuration={setDuration}
            mood={mood}
            setMood={setMood}
            addNewDoneTask={addNewDoneTask}
            buttonLoading={buttonLoading}
            validateInputs={validateInputs}
          /> */}
        </FlexWrap>

        <Section>
          <Title>Todays Done Tasks</Title>
          <CardWrapper>
            {todaysTasks.map((task) => (
              <TaskCard task={task} />
            ))}
          </CardWrapper>
          <Link to={"/donetasks"}>
            <Button className="mx-10">Get More</Button>
          </Link>
          
        </Section>

        {showModal && (
          <SubscriptionModal
            onClose={() => setShowModal(false)}
            onSelect={handleSubscriptionSelect}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
