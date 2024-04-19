import React, {useEffect, useState} from 'react';
import {HOST_URL, fetchData, getTimeStamp} from "./utility";
import './css/Interview.css';
import {useNavigate} from "react-router-dom";

type InterviewData = {
    id: number;
    candidateName: string;
    interviewerName: string;
    date: string;
    comments: string;
};


export default function Interview() {

    const timestamp = getTimeStamp();
    const interviewer = 'Allen An'

    const [interviews, setInterviews] = useState<InterviewData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<InterviewData>({
        id: 0,
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

    const goToInterview = (interview_id: number) => {
        console.log('go to interview', interview_id);
        navigate(`/room/${interview_id}`, { replace: true });
    }

    const getInterviews = async () => {
        try {

            const data: InterviewData[] = await fetchData(HOST_URL + '/interviews');

            setInterviews(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetchData(HOST_URL + '/interviews', 'POST', {'Content-Type': 'application/json'}, formData);
            alert('Interview Added Successfully');

            setFormData({id:0,candidateName: '', interviewerName: interviewer, date: timestamp, comments: ''});
            await getInterviews();
        } catch (error) {
            console.error('Error adding interview:', error);
            alert(error);
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
                        <ul className='listitemsContainer'>
                            {interviews.map(interview => (
                                <li className='listitems' key={interview.id} onClick={()=>{goToInterview(interview.id)}}>
                                    Id: {interview.id}, Candidate: {interview.candidateName}, Interviewer: {interview.interviewerName},
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