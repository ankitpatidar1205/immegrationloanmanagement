# Business Logic Document (businesslogic.md)

## Project: Immigration Loan Management System

This document defines the **complete backend business logic**, API structure, and data flow for the Loan Management System.

**Backend Stack:**

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 1. Backend Architecture Overview

* REST-based API system
* Role-based access control (Admin / Staff)
* Centralized business logic layer
* Secure authentication using JWT
* MongoDB collections for structured data

---

## 2. User Roles & Permissions

### Roles

* **Admin**: Full access
* **Staff**: Limited access

### Permission Summary

| Feature          | Admin | Staff                |
| ---------------- | ----- | -------------------- |
| Login            | ✅     | ✅                    |
| Client CRUD      | ✅     | View / Edit Assigned |
| Payment Entry    | ✅     | ✅                    |
| Stripe Config    | ✅     | ❌                    |
| Staff Management | ✅     | ❌                    |
| Reminder Config  | ✅     | ❌                    |

---

## 3. Authentication & Authorization APIs

### Auth APIs

1. **POST /api/auth/login**

* Input: email, password
* Logic:

  * Validate credentials
  * Generate JWT token
  * Return role-based access

2. **POST /api/auth/logout**

* Logic:

  * Invalidate token (client-side)

3. **GET /api/auth/profile**

* Logic:

  * Return logged-in user details

---

## 4. User (Staff) Management APIs

### APIs

1. **POST /api/users/create** (Admin)

* Create staff user

2. **GET /api/users** (Admin)

* Fetch all staff users

3. **PUT /api/users/:id** (Admin)

* Update staff details

4. **PATCH /api/users/:id/status** (Admin)

* Activate / Deactivate staff

---

## 5. Client Management APIs

### Core Logic

* Each client has one active loan
* Loan tenure is fixed at 4 months
* Payment schedule auto-generated

### APIs

1. **POST /api/clients**

* Create client
* Auto-generate 4-month schedule

2. **GET /api/clients**

* Admin: all clients
* Staff: assigned clients only

3. **GET /api/clients/:id**

* Fetch client profile + loan details

4. **PUT /api/clients/:id**

* Update client & loan data

---

## 6. Loan Logic & Schedule Generation

### Business Rules

* Loan duration: 4 months
* Equal monthly installments
* Due date calculated from loan start date

### Internal Logic (Auto)

* Generate 4 payment records on loan creation
* Mark status: Pending

---

## 7. Payment Management APIs

### Payment Types

* Manual (Cash / Bank Transfer)
* Stripe (Online)

### APIs

1. **POST /api/payments/manual**

* Input: clientId, amount, date, mode
* Update payment status

2. **POST /api/payments/stripe/webhook**

* Stripe webhook listener
* Auto-mark installment as paid

3. **GET /api/payments/client/:clientId**

* Payment history per client

---

## 8. Reminder & Notification Logic

### Trigger Rules

* Reminder before due date
* Reminder on due date
* Reminder after overdue

### APIs

1. **POST /api/reminders/send**

* Manual trigger (Admin only)

2. **GET /api/reminders/logs**

* View reminder history

### Automation (Cron Jobs)

* Daily job checks due payments
* Sends Email & WhatsApp reminders

---

## 9. Dashboard APIs

### Admin Dashboard APIs

1. **GET /api/dashboard/admin/summary**

* Total loans
* Total collected
* Pending & overdue amounts

### Staff Dashboard APIs

2. **GET /api/dashboard/staff/summary**

* Assigned clients
* Upcoming dues

---

## 10. Excel Import APIs

### APIs

1. **POST /api/import/excel**

* Upload Excel file
* Map columns
* Bulk insert clients & loans

---

## 11. Stripe Integration Logic

* Secure storage of Stripe keys
* Webhook-based payment confirmation
* Payment status sync

---

## 12. MongoDB Collections (Schemas)

### Users

* name
* email
* password
* role (admin / staff)
* status

### Clients

* personal details
* loanAmount
* loanStartDate
* assignedStaff

### Loans

* clientId
* tenure (4 months)
* totalAmount

### Payments

* loanId
* installmentNo
* amount
* status
* paymentMode

### ReminderLogs

* clientId
* type (email / whatsapp)
* sentDate

---

## 13. Error Handling

* Central error middleware
* Proper HTTP status codes
* Validation errors handling

---

## 14. Security Considerations

* JWT-based authentication
* Role-based route protection
* Secure Stripe webhook validation

---

## 15. API Count Summary

| Module         | API Count   |
| -------------- | ----------- |
| Auth           | 3           |
| Users          | 4           |
| Clients        | 4           |
| Payments       | 3           |
| Reminders      | 2           |
| Dashboard      | 2           |
| Import         | 1           |
| **Total APIs** | **19 APIs** |

---

## 16. Final Notes

This businesslogic.md acts as a single source of truth for backend implementation. It defines how APIs behave, how data flows, and how automation works, ensuring smooth integration with the React + Tailwind frontend.
