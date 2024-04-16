import React, {useEffect, useState} from 'react';
import {Domain, getTimeStamp} from "./utility";
import './Interview.css';

type InterviewData = {
    id?: number;
    candidateName: string;
    interviewerName: string;
    date: string;
    comments: string;
};
const PORT = '5000';
const HOST_URL = 'http://' + Domain + ':' + PORT;

export default function Interview() {

    const timestamp = getTimeStamp();
    const interviewer = 'Allen An'

    const [interviews, setInterviews] = useState<InterviewData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const [formData, setFormData] = useState<InterviewData>({
        candidateName: '',
        interviewerName: interviewer,
        date: timestamp,
        comments: ''
    });

    useEffect(() => {
        getInterviews();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getInterviews = async () => {
        try {
            const response = await fetch(HOST_URL + '/interviews');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.status === false) {
                throw new Error(data.data);
            }
            console.log(data)

            if (Array.isArray(data.data)) {
            setInterviews(data.data);
        }
            else{
                throw new Error('not array');
            }
            setInterviews(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(HOST_URL + '/interviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');

            }
            const result = await response.json();
            if (result.status === false) {
                throw new Error(result.data);
            }

            alert('Interview Added Successfully');
            console.log(result); // handle response data or redirect
            // Optionally reset form or navigate to another page
            setFormData({candidateName: '', interviewerName: interviewer, date: timestamp, comments: ''});
            await getInterviews();
        } catch (error) {
            console.error('Error adding interview:', error);
            alert('Failed to add interview');
        }
    };


    return (
        <>
            <div className="addInterview ">
                <h2 className='h2-title'>Add an Interview</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='label'>
                            <label>Candidate Name:</label>
                            <input
                                type="text"
                                name="candidateName"
                                value={formData.candidateName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label'>
                            <label>Interviewer Name:</label>
                            <input
                                type="text"
                                name="interviewerName"
                                value={formData.interviewerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label'>
                            <label>Date:</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                step="1"
                            />
                        </div>
                        <div className='label'>
                            <label>Comments:</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='button' type="submit">Add Interview</button>
                    </form>
                </div>
            </div>
            <div className='line'></div>
            <div className="ongoingInterview ">
                <h2 className='h2-title'>Ongoing Interviews</h2>
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {interviews.map(interview => (
                                <li key={interview.id}>
                                    Candidate: {interview.candidateName}, Interviewer: {interview.interviewerName},
                                    Date: {interview.date}, Comments: {interview.comments}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}