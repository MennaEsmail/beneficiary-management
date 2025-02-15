# Beneficiary Management System

## 📌 Project Overview
The **Beneficiary Management System** is an Angular 17-based application that provides:
- **User Authentication & Role-Based Access**
- **Beneficiary Registration & Approval (Admin Only)**
- **Search, Filter, and Sorting Features**
- **Beneficiary Rating System**
- **Profile Page for Beneficiaries**
- **Real-time UI Updates Using RxJS**

---

## 🚀 **Getting Started**
### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js v20+**
- **Angular CLI** (`npm install -g @angular/cli`)

### **2️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repository-url.git
cd beneficiary-management

3️⃣ Install Dependencies
npm install

4️⃣ Run the Project
ng serve

📌 Technologies Used
Angular 17 - Component-based frontend framework
RxJS - Reactive programming for state management
PrimeNG - UI components for Angular
TypeScript - Strongly typed JavaScript
Angular Routing - Client-side navigation

🔀 Why We Used RxJS Instead of NgRx
✅ Pros of RxJS
Lightweight: No need for extra store management setup.
Simplicity: Direct state management using BehaviorSubject without the boilerplate of NgRx.
Real-time UI updates using Observables.
Better Performance compared to NgRx in smaller applications.
❌ Cons of RxJS
No centralized state management: Data consistency needs to be handled manually.
No DevTools Integration: Unlike NgRx, debugging is less structured.
Potential Memory Leaks: Requires manual subscription cleanup.
When to Use NgRx?
For large-scale applications where centralized state management is needed.
If state needs to persist across multiple components.
When time-travel debugging is required.


http://localhost:4200
🔑 Admin Login Credentials
To log in as an Admin, use the following credentials:

Username: admin@example.com
Password: admin123
