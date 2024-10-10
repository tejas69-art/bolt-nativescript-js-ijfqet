import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const mockDevices = [
  { id: 127, batteryPercentage: 85, status: 'Locked' },
  { id: 394, batteryPercentage: 62, status: 'Unlocked' },
  { id: 721, batteryPercentage: 93, status: 'Locked' },
  { id: 508, batteryPercentage: 41, status: 'Unlocked' },
  { id: 956, batteryPercentage: 78, status: 'Locked' },
];

function DeviceList() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="device-list-container">
      <h2>Active Devices</h2>
      <div className="device-list">
        {mockDevices.map((device) => (
          <div key={device.id} className="device-item" onClick={() => navigate(`/devices/${device.id}`)}>
            <div className="device-icon">📱</div>
            <div className="device-info">
              <span className="device-name">Device {device.id}</span>
              <span className="device-status">
                <span className="battery-icon">🔋</span> {device.batteryPercentage}% • {device.status}
              </span>
            </div>
            <div className="arrow-icon">›</div>
          </div>
        ))}
      </div>
      <button onClick={handleLogout} className="logout-button">
        <span className="logout-text">Logout</span>
        <span className="logout-icon">🚪</span>
      </button>
    </div>
  );
}

export default DeviceList;