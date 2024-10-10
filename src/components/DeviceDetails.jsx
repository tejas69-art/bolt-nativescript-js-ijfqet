import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../contexts/AuthContext';

const mockDevices = [
  { id: 127, type: 'mobile', batteryPercentage: 85, status: 'Locked', location: [51.505, -0.09] },
  { id: 128, type: 'tablet', batteryPercentage: 62, status: 'Unlocked', location: [51.51, -0.1] },
  { id: 129, type: 'laptop', batteryPercentage: 33, status: 'Locked', location: [51.515, -0.09] },
];

function DeviceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [device, setDevice] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const foundDevice = mockDevices.find(d => d.id === parseInt(id));
      setDevice(foundDevice);
    }
  }, [id, user, navigate]);

  if (!device) {
    return <div className="container">Loading...</div>;
  }

  const handleToggleLock = () => {
    setDevice(prevDevice => ({
      ...prevDevice,
      status: prevDevice.status === 'Locked' ? 'Unlocked' : 'Locked'
    }));
  };

  return (
    <div className="device-list-container">
      <h2>Device {device.id}</h2>
      <div className="device-item">
        <div className="device-icon">
          {device.type === 'mobile' ? '📱' : device.type === 'tablet' ? '📟' : '💻'}
        </div>
        <div className="device-info">
          <span className="device-name">Device {device.id}</span>
          <span className="device-status">
            <span className="battery-icon">🔋</span> {device.batteryPercentage}% • {device.status}
          </span>
        </div>
      </div>
      <div className="map-container">
        <MapContainer center={device.location} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={device.location}>
            <Popup>Device {device.id} is here</Popup>
          </Marker>
        </MapContainer>
      </div>
      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <button onClick={handleToggleLock} className="blue-button">
        {device.status === 'Locked' ? 'Unlock Device' : 'Lock Device'}
      </button>
      <button onClick={() => navigate('/devices')} className="secondary-button">Back to List</button>
    </div>
  );
}

export default DeviceDetails;