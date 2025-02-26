# Kanban Board Task Management App
---
# [Server Repository](https://github.com/gs-shaykot/To-Do-App-Server-End)  
---
---

## **Objective**
The Kanban Board Task Management App is designed to provide a seamless and intuitive way to organize tasks efficiently. It allows users to create, edit, delete, and reorder tasks within a **drag-and-drop interface**, ensuring real-time updates and persistence.

The application is built using **React (Vite.js) and Node.js (Express.js)**, with **MongoDB** for data storage and **Firebase Authentication** for secure user login.

---
## **User Roles & Permissions**

### **Roles**
1. **Authenticated User 👤**:  
   - Can create, update, delete, and move tasks between categories.  
   - Task data is saved instantly in the database.  
   - Requires Google Sign-In for authentication.  

---
## **Application Features**

### **Authentication & User Management**
1. **Google Sign-In** using Firebase Authentication.  
2. **User data storage** (User ID, email, display name) in the database upon first login.  
3. **Secure access control**—only authenticated users can manage tasks.  

### **Task Management System**
1. **Task Creation**  
   - Users can add tasks with a **title (max 50 chars)** and an **optional description (max 200 chars)**.  
   - Each task is assigned an **auto-generated timestamp**.  
   
2. **Task Editing & Deletion**  
   - Modify task title, description, or category.  
   - Remove tasks permanently from the database.  

3. **Drag-and-Drop Functionality**  
   - Move tasks between categories:  
     - **To-Do**  
     - **In Progress**  
     - **Done**  
   - Reorder tasks within each category.  

4. **Instant Data Persistence**  
   - Tasks and their positions are saved immediately in MongoDB.  
   - Data remains unchanged even after page refresh.  

---
## **Backend API Endpoints**
| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| POST   | `/addTask`       | Add a new task                  |
| GET    | `/addTask`       | Retrieve all tasks for a user   |
| PUT    | `/addTask/:id`   | Update task details             |
| DELETE | `/addTask/:id`   | Remove a task permanently       |

---
## **Frontend & UI**
1. **Built with React (Vite.js)** for a fast and smooth experience.  
2. **Minimalistic UI** with a maximum of four colors for clarity.  
3. **Fully responsive design** optimized for desktop and mobile.  
4. **Drag-and-drop functionality** using `@hello-pangea/dnd`.  

---
## **Bonus Features (Optional)**
1. **Dark Mode** toggle for better user experience.  
2. **Task Due Dates** with visual indicators (e.g., overdue tasks in red).  

---
## ⚙️ **Technologies Used**
- **Frontend**: React (Vite.js), DaisyUI, TanStack Query  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: Firebase (Google Sign-In)  
- **Drag & Drop**: `@hello-pangea/dnd`  
- **State Management**: React Hook Form, TanStack Query  
- **Alerts & Notifications**: SweetAlert2  

---
## **Dependencies**
```json
"dependencies": { 
  "@hello-pangea/dnd": "^18.0.1",
  "@tanstack/react-query": "^5.66.9",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.17.2",
  "uuid": "^11.1.0"
}
