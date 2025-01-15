import { Calendar } from 'lucide-react';
import { Lead } from '../../../types/lead';

type LeadAppointmentsProps = {
  lead: Lead;
  onSchedule: () => void;
};

export const LeadAppointments = ({ lead, onSchedule }: LeadAppointmentsProps) => {
  const sortedAppointments = [...lead.appointments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusColor = (status: string) => ({
    'Scheduled': 'text-blue-400',
    'Completed': 'text-green-400',
    'Cancelled': 'text-red-400',
    'No Show': 'text-yellow-400'
  }[status] || 'text-gray-400');

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Initial Consultation':
        return 'text-blue-400';
      case 'Follow-up':
        return 'text-purple-400';
      case 'Service':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Appointments */}
      {sortedAppointments.length > 0 ? (
        <div className="bg-gray-800 rounded p-4">
          <div className="text-sm text-gray-400 mb-3">Appointments</div>
          <div className="space-y-3">
            {sortedAppointments.map(appointment => (
              <div key={appointment.id} className="flex items-start gap-3">
                <Calendar className={`w-5 h-5 mt-1 ${getTypeIcon(appointment.type)}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{appointment.type}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(appointment.date).toLocaleString()}
                      </div>
                    </div>
                    <span className={`text-sm ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  {appointment.notes && (
                    <div className="text-sm text-gray-400 mt-1">
                      {appointment.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded p-4 text-center text-gray-400">
          No appointments scheduled
        </div>
      )}

      {/* Schedule Button */}
      <button
        onClick={onSchedule}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Schedule Appointment
      </button>
    </div>
  );
};

export default LeadAppointments;


