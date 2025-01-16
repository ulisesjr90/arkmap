import React from 'react';
import { Clock, User, AlertCircle, MessageCircle, Phone } from 'lucide-react';

interface ActivityTabProps {
  lead: any;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ lead }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return Phone;
      case 'update':
        return AlertCircle;
      case 'share':
        return User;
      case 'status_change':
        return Clock;
      default:
        return MessageCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'contact':
        return 'text-blue-400';
      case 'update':
        return 'text-yellow-400';
      case 'share':
        return 'text-green-400';
      case 'status_change':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Combine and sort all activities
  const allActivities = [
    ...(lead.activity || []),
    ...(lead.updates || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Activity Timeline */}
      <div className="space-y-6">
        {allActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);

          return (
            <div key={activity.id} className="relative flex gap-4">
              {/* Timeline line */}
              <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-700 -z-10" />
              
              {/* Icon */}
              <div className={`mt-1 p-1 rounded-full bg-gray-800 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{activity.user}</div>
                  <div className="text-xs text-gray-400">
                    {formatDate(activity.date)}
                  </div>
                </div>

                {activity.type === 'contact' && (
                  <div>
                    <div className="text-sm text-gray-300 mb-1">
                      Contact via {activity.method}
                    </div>
                    <div className="text-sm text-gray-400">
                      Outcome: {activity.outcome}
                    </div>
                  </div>
                )}

                {activity.type === 'status_change' && (
                  <div className="text-sm text-gray-300">
                    Status changed to: {activity.content}
                  </div>
                )}

                {(activity.notes || activity.content) && (
                  <div className="text-sm text-gray-400 mt-2">
                    {activity.notes || activity.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Creation Info */}
        <div className="relative flex gap-4">
          <div className={`mt-1 p-1 rounded-full bg-gray-800 text-gray-400`}>
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">
              Lead created by {lead.owner?.name || 'Unknown'} on {formatDate(lead.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;