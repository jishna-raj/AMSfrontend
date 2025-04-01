import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './notification.css';
import { addNotificationApi, getallchildApi } from '../../services/allapi';

function Notification() {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [time, setTime] = useState(format(new Date(), 'HH:mm'));
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState('');
    const [loadingChildren, setLoadingChildren] = useState(true);

    // Fetch children on component mount
    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await getallchildApi();
                console.log(response);
                
                if (response.status>=200 && response.status<300) {
                    setChildren(response.data.children|| []);
                } else {
                    setError('Failed to load children list');
                }
            } catch (err) {
                console.error('Error fetching children:', err);
                setError('Error loading children data');
            } finally {
                setLoadingChildren(false);
            }
        };

        fetchChildren();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedChildId) {
            setError('Please select a child');
            return;
        }

        if (!message.trim()) {
            setError('Message cannot be empty');
            return;
        }

        if (message.length > 200) {
            setError('Message cannot exceed 200 characters');
            return;
        }

        const selectedDateTime = new Date(`${date}T${time}`);
        if (selectedDateTime < new Date()) {
            setError('Cannot schedule notifications in the past');
            return;
        }

        setIsSending(true);

        try {
            const notificationData = {
                child: selectedChildId,
                message: message.trim(),
                date,
                time
            };

            const response = await addNotificationApi(notificationData);
            
            if (response.data && response.data.success) {
                setMessage('');
                setSelectedChildId('');
                setDate(format(new Date(), 'yyyy-MM-dd'));
                setTime(format(new Date(), 'HH:mm'));
                setSuccess('Notification scheduled successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(response.data?.message || 'Failed to schedule notification');
            }
        } catch (error) {
            console.error('Notification error:', error);
            let errorMessage = 'An error occurred while scheduling the notification';
            
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'Network error - please check your connection';
            }
            
            setError(errorMessage);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="notification-sender">
            <h2>Schedule New Notification</h2>
            <p>Create and schedule notifications for children</p>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="child-select">Select Child</label>
                    {loadingChildren ? (
                        <div className="loading-message">Loading children...</div>
                    ) : (
                        <select 
                            id="child-select"
                            value={selectedChildId}
                            onChange={(e) => setSelectedChildId(e.target.value)}
                            required
                            disabled={children.length === 0}
                        >
                            <option value="">-- Select a child --</option>
                            {children.map(child => (
                                <option key={child._id} value={child._id}>
                                    {child.name} (Age: {child.age})
                                </option>
                            ))}
                        </select>
                    )}
                    {children.length === 0 && !loadingChildren && (
                        <div className="error-message">No children found</div>
                    )}
                </div>

                <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                    <label htmlFor="message">Notification Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Type your notification message..."
                        maxLength={200}
                        rows={3}
                        required
                    />
                    <div className="character-count">{message.length}/200</div>
                </div>

                <div className="datetime-container">
                    <div className="date-picker">
                        <label htmlFor="date">Schedule Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={format(new Date(), 'yyyy-MM-dd')}
                            required
                        />
                    </div>

                    <div className="time-picker">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="send-button"
                    disabled={!message.trim() || !selectedChildId || isSending}
                >
                    {isSending ? (
                        <div className="spinner"></div>
                    ) : (
                        <>
                            <svg className="send-icon" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                            Schedule Notification
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default Notification;