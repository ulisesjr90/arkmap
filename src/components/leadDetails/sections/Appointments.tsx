import React from 'react';

interface AppointmentsProps {
    appointments: Array<{ id: string; date: string; details: string }>;
    onAdd: (appointment: { date: string; details: string }) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments, onAdd }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Appointments</h3>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="text-gray-300">
                        {appointment.date} - {appointment.details}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onAdd({ date: new Date().toISOString(), details: 'New appointment' })}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Appointment
            </button>
        </div>
    );
};

export default Appointments;
