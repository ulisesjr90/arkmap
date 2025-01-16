# ARK MAP

ARK MAP is a powerful application designed to streamline lead management, appointment scheduling, and geospatial insights using mapping technologies. It is tailored to support sales teams, managers, and operational staff in tracking leads, managing activities, and utilizing advanced map-based tools.

---

## Key Features
- **Lead Management**: Track, update, and manage leads with detailed information.
- **Appointment Scheduling**: Add and manage appointments with integrated calendar functionality.
- **Activity Tracking**: Log and view activities related to each lead.
- **Map Integration**:
  - Visualize leads on an interactive map.
  - Use heatmaps to identify high-priority areas.
  - Access tools like geolocation, radius filters, and region-based lead analysis.
- **File Management**: Upload and manage files associated with leads, stored securely in Firestore.
- **Role-Based Access**: Tailored views and permissions for different user roles (e.g., admin, sales manager, canvasser).

---

## Technologies Used
### Frontend
- **React** with **TypeScript**
- **TailwindCSS** for styling
- **DaisyUI** components
- **React Router DOM** for navigation

### Backend
- **Next.js API Routes** for server-side logic
- **Firebase**:
  - Firestore for database operations
  - Storage for file handling
  - Authentication for secure user management

### Database
- **MySQL** with Prisma ORM for relational data handling

### Hosting
- **Vercel** for frontend and backend deployment

---

## Project Structure
```
├── public                # Static assets
├── src
│   ├── api              # API routes for backend logic
│   ├── assets           # Application assets (images, etc.)
│   ├── components       # UI components organized by feature
│   │   ├── auth         # Authentication components
│   │   ├── common       # Shared components like buttons, modals
│   │   ├── filters      # Filter components for sorting leads
│   │   ├── form         # Form input components
│   │   ├── layouts      # Layout components like headers and footers
│   │   ├── leadDetails  # Components for lead detail management
│   │   ├── leads        # Lead-related components
│   │   ├── maps         # Map components for geospatial features
│   │   ├── newLead      # Sections for adding new leads
│   ├── config           # Configuration files (Firebase, Firestore, etc.)
│   ├── contexts         # Context providers for state management
│   ├── hooks            # Custom hooks for reusable logic
│   ├── pages            # Application pages
│   ├── types            # Type definitions
│   ├── utils            # Utility functions
├── .env                  # Environment variables
├── README.md             # Project documentation
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ark-map.git
   cd ark-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the following:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   MYSQL_DATABASE=your_mysql_database
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

---

## Usage

1. **Login**: Authenticate using your email and password.
2. **Manage Leads**: Add, update, or delete leads from the dashboard.
3. **Schedule Appointments**: Use the calendar to manage appointments.
4. **Map Features**:
   - View leads on an interactive map.
   - Filter leads by region or proximity.
   - Analyze lead distribution using heatmaps.
5. **View Activity Logs**: Track lead interactions and updates.

---

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

---

## Future Enhancements
- **Offline Mode**: Enable functionality without an internet connection.
- **Custom Fields**: Allow users to add their own fields to lead forms.
- **In-App Notifications**: Notify users of updates and changes in real time.
- **Advanced Filters**: Provide detailed filtering options for lead data.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For inquiries, reach out to the project maintainer through the repository.

