import React from "react";
import UpcomingEvents from "./components/upcoming";
import TodoList from "./components/toDo";
import ListOfPatients from "./components/listofpatients";

const MyPatients = () => {
  return (
   <div className=" h-screen">
     <div className=" px-6 py-6 ">
      {/* <div className="flex flex-wrap my-20">
        <div className="w-full md:w-1/2 lg:w-2/3 px-4">
          <UpcomingEvents />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
          <TodoList />
        </div>
      </div> */}
      <ListOfPatients />
    </div>
   </div>
  );
};

export default MyPatients;
