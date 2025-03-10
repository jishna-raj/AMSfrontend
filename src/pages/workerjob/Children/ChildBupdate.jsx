import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getachildbeneficiaryApi, updateaChildBeneficiaryApi } from '../../../services/allapi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './ChildBeneficiary.css'

function ChildBupdate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [child, setChild] = useState({
    name: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    address: { street: '', city: '', state: '', zipCode: '' },
    parent: '',
    healthRecords: [],
    nutritionStatus: { date: '', status: '' },
    educationDetails: { preschoolName: '', enrollmentDate: '', progress: '' },
    guardian: { name: '', relationship: '', contactNumber: '', email: '' },
    lastVisitDate: '',
    vaccinationDetails: []
  })

  const formatDateForInput = (isoDate) => {
    try {
      return isoDate?.split('T')[0] || ''
    } catch (error) {
      console.error('Invalid date format:', isoDate)
      return ''
    }
  }

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await getachildbeneficiaryApi(id)
        if (response?.status === 200) {
          const data = response.data.data
          setChild({
            ...data,
            dateOfBirth: formatDateForInput(data.dateOfBirth),
            lastVisitDate: formatDateForInput(data.lastVisitDate),
            nutritionStatus: {
              ...data.nutritionStatus,
              date: formatDateForInput(data.nutritionStatus?.date)
            },
            educationDetails: {
              ...data.educationDetails,
              enrollmentDate: formatDateForInput(data.educationDetails?.enrollmentDate)
            },
            healthRecords: data.healthRecords?.map(record => ({
              ...record,
              date: formatDateForInput(record.date)
            })) || [],
            vaccinationDetails: data.vaccinationDetails?.map(vaccine => ({
              ...vaccine,
              dateAdministered: formatDateForInput(vaccine.dateAdministered)
            })) || []
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
        toast.error('Failed to load child data')
        navigate('/child-beneficiaries')
      }
    }

    fetchChildData()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    
    setChild(prev => {
      const newState = JSON.parse(JSON.stringify(prev))
      let current = newState
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (key.includes('[')) {
          const [field, index] = key.split(/\[|\]/).filter(Boolean)
          current[field] = current[field] || []
          current = current[field][Number(index)] = current[field][Number(index)] || {}
        } else {
          current[key] = current[key] || {}
          current = current[key]
        }
      }
      
      const lastKey = keys[keys.length - 1]
      current[lastKey] = value
      return newState
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Convert dates to ISO format
      const payload = {
        ...child,
        dateOfBirth: child.dateOfBirth ? `${child.dateOfBirth}T00:00:00.000Z` : null,
        lastVisitDate: child.lastVisitDate ? `${child.lastVisitDate}T00:00:00.000Z` : null,
        nutritionStatus: {
          ...child.nutritionStatus,
          date: child.nutritionStatus.date ? `${child.nutritionStatus.date}T00:00:00.000Z` : null
        },
        educationDetails: {
          ...child.educationDetails,
          enrollmentDate: child.educationDetails.enrollmentDate ? 
            `${child.educationDetails.enrollmentDate}T00:00:00.000Z` : null
        },
        healthRecords: child.healthRecords.map(record => ({
          ...record,
          date: record.date ? `${record.date}T00:00:00.000Z` : null
        })),
        vaccinationDetails: child.vaccinationDetails.map(vaccine => ({
          ...vaccine,
          dateAdministered: vaccine.dateAdministered ? 
            `${vaccine.dateAdministered}T00:00:00.000Z` : null
        }))
      }

      const response = await updateaChildBeneficiaryApi(id, payload)

      console.log(payload);
      console.log(response);
      
      
      
      if (response.status === 200) {
        toast.success('Child updated successfully!')
        navigate('/child-beneficiary')
      } else {
        throw new Error(response.data?.message || 'Failed to update child')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.response?.data?.message || error.message || 'Update failed')
    }
  }

  if (loading) {
    return <div className="loading">Loading child data...</div>
  }

  return (
    <div className="child-beneficiary-container">
      <h1 className="form-title">Update Child Beneficiary</h1>
      
      <form className="beneficiary-form" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend className="section-title">Personal Information</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                name="name"
                value={child.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                className="form-input" 
                name="age"
                value={child.age}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="form-label">Gender</label>
              <select 
                className="form-input" 
                name="gender"
                value={child.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="form-label">Date of Birth</label>
              <input 
                type="date" 
                className="form-input" 
                name="dateOfBirth"
                value={child.dateOfBirth}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
        </fieldset>

        {/* Address Information */}
        <fieldset className="form-section">
          <legend className="section-title">Address Details</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Street</label>
              <input 
                type="text" 
                className="form-input" 
                name="address.street"
                value={child.address.street}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-input" 
                name="address.city"
                value={child.address.city}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="form-label">State</label>
              <input 
                type="text" 
                className="form-input" 
                name="address.state"
                value={child.address.state}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="form-label">Zip Code</label>
              <input 
                type="text" 
                className="form-input" 
                name="address.zipCode"
                value={child.address.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Guardian Information */}
        <fieldset className="form-section">
          <legend className="section-title">Guardian Information</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Guardian Name</label>
              <input 
                type="text" 
                className="form-input" 
                name="guardian.name"
                value={child.guardian.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">Relationship</label>
              <input 
                type="text" 
                className="form-input" 
                name="guardian.relationship"
                value={child.guardian.relationship}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="form-label">Contact Number</label>
              <input 
                type="text" 
                className="form-input" 
                name="guardian.contactNumber"
                value={child.guardian.contactNumber}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                name="guardian.email"
                value={child.guardian.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Health Records */}
        <fieldset className="form-section">
          <legend className="section-title">Health Records</legend>
          {child.healthRecords.map((record, index) => (
            <div className="form-grid" key={index}>
              <div className="input-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  name={`healthRecords[${index}].date`}
                  value={record.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <label className="form-label">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  className="form-input" 
                  name={`healthRecords[${index}].weight`}
                  value={record.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Height (cm)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  name={`healthRecords[${index}].height`}
                  value={record.height}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Immunizations</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name={`healthRecords[${index}].immunizations`}
                  value={record.immunizations}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Recent Illnesses</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name={`healthRecords[${index}].recentIllnesses`}
                  value={record.recentIllnesses}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
        </fieldset>

        {/* Nutrition Status */}
        <fieldset className="form-section">
          <legend className="section-title">Nutrition Status</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Assessment Date</label>
              <input 
                type="date" 
                className="form-input" 
                name="nutritionStatus.date"
                value={child.nutritionStatus.date}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">Status</label>
              <select 
                className="form-input" 
                name="nutritionStatus.status"
                value={child.nutritionStatus.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Normal">Normal</option>
                <option value="Underweight">Underweight</option>
                <option value="Overweight">Overweight</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Education Details */}
        <fieldset className="form-section">
          <legend className="section-title">Education Details</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Preschool Name</label>
              <input 
                type="text" 
                className="form-input" 
                name="educationDetails.preschoolName"
                value={child.educationDetails.preschoolName}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">Enrollment Date</label>
              <input 
                type="date" 
                className="form-input" 
                name="educationDetails.enrollmentDate"
                value={child.educationDetails.enrollmentDate}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="form-label">Progress Report</label>
              <textarea 
                className="form-input" 
                rows="4" 
                name="educationDetails.progress"
                value={child.educationDetails.progress}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </fieldset>

        {/* Vaccination Details */}
        <fieldset className="form-section">
          <legend className="section-title">Vaccination Details</legend>
          {child.vaccinationDetails.map((vaccine, index) => (
            <div className="form-grid" key={index}>
              <div className="input-group">
                <label className="form-label">Vaccine Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name={`vaccinationDetails[${index}].vaccineName`}
                  value={vaccine.vaccineName}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="input-group">
                <label className="form-label">Date Administered</label>
                <input 
                  type="date" 
                  className="form-input" 
                  name={`vaccinationDetails[${index}].dateAdministered`}
                  value={vaccine.dateAdministered}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="input-group">
                <label className="form-label">Administered By</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name={`vaccinationDetails[${index}].administeredBy`}
                  value={vaccine.administeredBy}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="input-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-input" 
                  rows="2"
                  name={`vaccinationDetails[${index}].notes`}
                  value={vaccine.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          ))}
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Update Beneficiary</button>
        </div>
      </form>
    </div>
  )
}

export default ChildBupdate