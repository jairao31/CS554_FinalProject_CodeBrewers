### CS554_FinalProject_CodeBrewers

# *TULSEE* 🪴

[TULSEE]() is a go-to management and collaboration platform for everyone who wants to support their project teams, research groups, and other collaborative work.

## *Getting Started*

### *How to setup*

Directory:
#### /backend
```javascript
// command to install the required dependencies for the backend
npm install

// command to start the backend server
npm start
```

#### /frontend/tulsee-front/
```javascript
// command to install the required dependencies for the frontend
yarn

// command to start the frontend application
yarn run dev
```

## *Features:*

#### Homepage: 
   - Access to all group and personal projects
   - Search bar for project and user search
   - User settings, Project invites, and Archive
   - light and dark mode

#### Project Page: 
1. Task:
   - create new task, assign users to the task
   - update task status (Open, In Progress, Under Review, Done)
   - user settings, Projectinvitese, and Archive

2. Chat:
   - chat room for all the group members

3. Meet:
   - create zoom meetings 
   - copy or connect the meeting

4. Media:
   - upload media to respective project groups 
   - download or delete media

5. Project settings:
   - update basic details 
   - manage participants
   - invite participants
   - archive project


## *Technologies used:*
**Next.js:**  Front-end framework

**Google Firebase:**  Authentication, Realtime-Database, Cloud Storage

**Socket.io:**  Real-time chat

**AWS EC2 instance:**  frontend and backend hosting
