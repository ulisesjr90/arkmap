import React from 'react';

type TimelineEvent = {
  date: string;
  description: string;
};

type LeadTimelineProps = {
  events: TimelineEvent[];
};

export const LeadTimeline: React.FC<LeadTimelineProps> = ({ events }) => (
  <div>
    <h2>Lead Timeline</h2>
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          <strong>{event.date}:</strong> {event.description}
        </li>
      ))}
    </ul>
  </div>
);
