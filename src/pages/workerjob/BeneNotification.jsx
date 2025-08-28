import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Chip,
    Divider,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { getallmotherApi, getAllpregnantApi, getallchildbeneficiaryApi, AddBeneNotificationApi } from '../../services/allapi';

function BeneNotification() {
    const [notificationType, setNotificationType] = useState('predefined');
    const [predefinedMessage, setPredefinedMessage] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [placeholders, setPlaceholders] = useState({});
    const [beneficiaries, setBeneficiaries] = useState({
        mothers: [],
        pregnant: [],
        children: []
    });
    const [selectedGroups, setSelectedGroups] = useState({
        mothers: true,
        pregnant: true,
        children: true
    });
    const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(false);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            setLoadingBeneficiaries(true);
            try {
                const [mothersRes, pregnantRes, childrenRes] = await Promise.all([
                    getallmotherApi(),
                    getAllpregnantApi(),
                    getallchildbeneficiaryApi()
                ]);
                
                setBeneficiaries({
                    mothers: mothersRes.data?.data || [],
                    pregnant: pregnantRes.data?.data || [],
                    children: childrenRes.data?.data || []
                });
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
                alert('Failed to load beneficiary data');
            } finally {
                setLoadingBeneficiaries(false);
            }
        };

        fetchBeneficiaries();
    }, []);

    const extractPlaceholders = (template) => {
        if (!template) return [];
        const regex = /{(.*?)}/g;
        const matches = [...template.matchAll(regex)];
        return matches.map((m) => m[1]);
    };

    const predefinedMessages = [
        {
            category: 'Health & Nutrition',
            icon: <MedicalServicesIcon color="primary" />,
            options: [
                {
                    value: 'vaccination_camp',
                    label: 'Vaccination Camp',
                    template: 'Anganwadi vaccination camp on {date} from {time}. All children aged 0-5 years must attend for routine immunization. Bring immunization card.',
                },
                {
                    value: 'nutrition_day',
                    label: 'Nutrition Day Reminder',
                    template: 'Reminder: Monthly Nutrition Day tomorrow. All beneficiaries please come to collect take-home ration and attend growth monitoring.',
                },
                {
                    value: 'health_checkup',
                    label: 'Health Checkup',
                    template: 'Free health checkup camp by government doctors on {date}. All pregnant women and children below 6 years should attend.',
                },
            ],
        },
        {
            category: 'Supplies & Rations',
            icon: <InventoryIcon color="secondary" />,
            options: [
                {
                    value: 'ration_distribution',
                    label: 'Ration Distribution',
                    template: "This month's ration distribution will be on {date} from {time}. Please bring your Aadhaar card and ration card for biometric verification.",
                },
                {
                    value: 'supply_available',
                    label: 'New Supplies Available',
                    template: 'New stock of {supplies} now available at Anganwadi center. Eligible beneficiaries may collect during working hours.',
                },
                {
                    value: 'supply_delay',
                    label: 'Supply Delay Notice',
                    template: 'Notice: {supply} distribution delayed due to {reason}. Revised distribution date will be communicated soon.',
                },
            ],
        },
        {
            category: 'Programs & Events',
            icon: <EventIcon color="action" />,
            options: [
                {
                    value: 'icds_training',
                    label: 'ICDS Training',
                    template: 'Important: Nutrition training session for all pregnant/lactating mothers on {date} at {time}. Attendance mandatory with benefits.',
                },
                {
                    value: 'festival_celebration',
                    label: 'Festival Celebration',
                    template: 'Join us for {festival} celebration at Anganwadi center on {date}. Special nutrition supplements will be distributed.',
                },
                {
                    value: 'awareness_program',
                    label: 'Awareness Program',
                    template: '{topic} awareness program on {date}. Government officials will explain {benefits}. All community members welcome.',
                },
            ],
        },
        {
            category: 'Administrative',
            icon: <AnnouncementIcon color="info" />,
            options: [
                {
                    value: 'holiday_notice',
                    label: 'Holiday Notice',
                    template: 'Anganwadi center will remain closed on {date} for {reason}. Regular services resume on {reopening_date}.',
                },
                {
                    value: 'survey_notice',
                    label: 'Survey Notice',
                    template: 'Government survey team visiting on {date}. All families must provide updated information for scheme eligibility verification.',
                },
                {
                    value: 'policy_change',
                    label: 'Policy Change',
                    template: 'Important: Changes in {scheme_name} scheme guidelines. New benefits include {changes}. Contact Anganwadi worker for details.',
                },
            ],
        },
    ];

    const handleGroupToggle = (group) => (event) => {
        setSelectedGroups({
            ...selectedGroups,
            [group]: event.target.checked
        });
    };

    const getRecipientPhones = () => {
        const phones = [];
        
        if (selectedGroups.mothers) {
            beneficiaries.mothers.forEach(mother => {
                if (mother.guardianPhone) phones.push(String(mother.guardianPhone));
            });
        }
        
        if (selectedGroups.pregnant) {
            beneficiaries.pregnant.forEach(pregnant => {
                if (pregnant.guardianPhone) phones.push(String(pregnant.guardianPhone));
            });
        }
        
        if (selectedGroups.children) {
            beneficiaries.children.forEach(child => {
                if (child.guardian?.contactNumber) phones.push(String(child.guardian.contactNumber));
            });
        }
        
        return [...new Set(phones.filter(Boolean))];

        
    };

    
    

    const handleSendNotifications = async () => {
        if (notificationType === 'predefined' && !predefinedMessage) {
            alert('Please select a predefined message');
            return;
        }
        if (notificationType === 'custom' && !customMessage) {
            alert('Please enter a custom message');
            return;
        }

        setIsSending(true);
        try {
            const finalMessage = notificationType === 'predefined' 
                ? predefinedMessage.replace(/{(.*?)}/g, (_, key) => placeholders[key] || `{${key}}`)
                : customMessage;

            const recipientPhones = getRecipientPhones();
          
            
            
            if (recipientPhones.length === 0) {
                throw new Error('No recipients selected or no phone numbers available');
            }

            const reqBody = {
                notificationType,
                message: finalMessage,
                predefinedTemplate: notificationType === 'predefined' ? predefinedMessage : '',
                customMessage: notificationType === 'custom' ? customMessage : '',
                placeholders: notificationType === 'predefined' ? placeholders : {},
                recipientGroups: selectedGroups,
                totalRecipients: recipientPhones.length,
                phoneNumbers: recipientPhones
            };

            const response = await AddBeneNotificationApi(reqBody);
        
            
            
            if (response.status >= 200 && response.status < 300) {
                alert(`Notification successfully sent to all selected beneficiaries`);
                setPredefinedMessage('');
                setCustomMessage('');
                setPlaceholders({});
            } else {
                throw new Error(response.data?.message || 'Error sending notification');
            }
        } catch (error) {
            console.error('Notification failed:', error);
            alert(`Failed to send notification: ${error.message}`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <SendIcon color="primary" sx={{ mr: 1 }} />
                        Anganwadi Bulk Notifications
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Notification Type</InputLabel>
                        <Select
                            value={notificationType}
                            label="Notification Type"
                            onChange={(e) => {
                                setNotificationType(e.target.value);
                                setPredefinedMessage('');
                                setCustomMessage('');
                                setPlaceholders({});
                            }}
                        >
                            <MenuItem value="predefined">Predefined Anganwadi Message</MenuItem>
                            <MenuItem value="custom">Custom Message</MenuItem>
                        </Select>
                    </FormControl>

                    {notificationType === 'predefined' ? (
                        <Box>
                            {predefinedMessages.map((category) => (
                                <Box key={category.category} sx={{ mb: 3 }}>
                                    <Divider sx={{ mb: 2 }}>
                                        <Chip icon={category.icon} label={category.category} variant="outlined" sx={{ px: 1, py: 2 }} />
                                    </Divider>
                                    <FormControl fullWidth>
                                        <InputLabel>{`${category.category} Messages`}</InputLabel>
                                        <Select
                                            value={predefinedMessage}
                                            label={`${category.category} Messages`}
                                            onChange={(e) => {
                                                const template = e.target.value;
                                                setPredefinedMessage(template);
                                                const fields = extractPlaceholders(template);
                                                const defaultValues = {};
                                                fields.forEach((f) => (defaultValues[f] = ''));
                                                setPlaceholders(defaultValues);
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select a message</em>
                                            </MenuItem>
                                            {category.options.map((msg) => (
                                                <MenuItem key={msg.value} value={msg.template}>
                                                    {msg.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            ))}

                            {Object.keys(placeholders).length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Fill in Message Details:
                                    </Typography>
                                    {Object.keys(placeholders).map((key) => (
                                        <TextField
                                            key={key}
                                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            value={placeholders[key]}
                                            onChange={(e) => setPlaceholders((prev) => ({ ...prev, [key]: e.target.value }))}
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Custom Message"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Type your custom message here for all beneficiaries..."
                            sx={{ mb: 3 }}
                            inputProps={{ maxLength: 200 }}
                            helperText={`${customMessage.length}/200 characters`}
                        />
                    )}

                    <Box sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Select Recipient Groups:
                        </Typography>
                        {loadingBeneficiaries ? (
                            <Typography>Loading beneficiary data...</Typography>
                        ) : (
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGroups.mothers}
                                            onChange={handleGroupToggle('mothers')}
                                        />
                                    }
                                    label={`Mothers (${beneficiaries.mothers.length})`}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGroups.pregnant}
                                            onChange={handleGroupToggle('pregnant')}
                                        />
                                    }
                                    label={`Pregnant Women (${beneficiaries.pregnant.length})`}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedGroups.children}
                                            onChange={handleGroupToggle('children')}
                                        />
                                    }
                                    label={`Children (${beneficiaries.children.length})`}
                                />
                            </FormGroup>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SendIcon />}
                            onClick={handleSendNotifications}
                            disabled={
                                isSending ||
                                (notificationType === 'predefined' && (!predefinedMessage || Object.values(placeholders).some(v => v === ''))) ||
                                (notificationType === 'custom' && !customMessage) ||
                                loadingBeneficiaries
                            }
                            sx={{ px: 4, py: 1.5 }}
                        >
                            {isSending ? 'Sending...' : 'Send Notification'}
                        </Button>
                    </Box>

                    {notificationType === 'predefined' && predefinedMessage && (
                        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Notification Preview:
                            </Typography>
                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                {predefinedMessage.replace(/{(.*?)}/g, (_, key) => placeholders[key] || `{${key}}`)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                This message will be sent to selected beneficiaries via SMS.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default BeneNotification;