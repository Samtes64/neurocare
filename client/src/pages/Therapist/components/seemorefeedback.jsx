import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";

const FeedbackList = ({ patients }) => {
    return (
        <div>
            <h2>Feedback List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patients.map((patient, index) => (
                    <Card key={index} className="w-full bg-blue-200 p-4">
                        <CardHeader>
                            <CardTitle>{patient.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{patient.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;
