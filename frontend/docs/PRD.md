# Product Requirements Document (PRD)

## Project Name

Immigration Loan Management System

---

## 1. Project Overview

This project is a **custom web-based Loan Management System** designed specifically for an **Immigration business**. The system replaces manual Excel-based loan tracking with an automated, centralized platform.

The software will help the business manage short-term loans (up to 4 months), track payments, send automatic reminders, and allow multiple staff members to work securely within the same system.

The frontend UI will be built using **React JS + Tailwind CSS**, and the product design will be implemented using **Antigravity** for planning and structure.

---

## 2. Project Aim

The main aim of this project is to:

> Create a centralized, automated loan management platform that simplifies loan tracking, payment management, and client follow-ups for an Immigration business, eliminating the need for Excel and manual processes.

---

## 3. Business Problem

Currently, the client is facing the following issues:

* Loan data managed in Excel is difficult to track
* Payment due dates are missed
* Manual follow-ups consume time
* No automation for reminders
* Hard to manage data with multiple staff

---

## 4. Target Users

### User Roles

1. **Admin (Business Owner)**
2. **Staff (Employees)**

Note: No client login/dashboard is required as per current scope.

---

## 5. Total Dashboards

| Dashboard       | Description                         |
| --------------- | ----------------------------------- |
| Admin Dashboard | Full control and system management  |
| Staff Dashboard | Limited access for daily operations |

**Total Dashboards: 2**

---

## 6. Admin Dashboard

### 6.1 Admin Dashboard Aim

The Admin Dashboard provides complete visibility and control over loans, payments, staff, and system settings.

---

### 6.2 Admin Dashboard Menus & Features

#### 6.2.1 Dashboard (Overview)

**Aim:** Give a quick snapshot of business health

Features:

* Total number of clients
* Total loan amount given
* Total amount collected
* Pending payments
* Overdue payments

---

#### 6.2.2 Client Management

**Aim:** Manage all client and loan-related data in one place

Features:

* Add new client
* Edit client details
* View client profile
* Loan amount
* Loan start date
* 4-month loan tenure
* Auto-generated payment schedule

---

#### 6.2.3 Payment Management

**Aim:** Track and manage all payments efficiently

Features:

* Manual payment entry (cash/bank transfer)
* Stripe payment tracking
* Payment history per client
* Payment status (Paid / Pending / Overdue)

---

#### 6.2.4 Reminder Management

**Aim:** Automate follow-ups and reduce manual effort

Features:

* Automatic Email reminders
* Automatic WhatsApp reminders
* Due date-based triggers
* Overdue payment alerts

---

#### 6.2.5 Staff Management

**Aim:** Manage team access securely

Features:

* Create staff accounts
* Edit staff details
* Activate / Deactivate staff
* Assign clients to staff

---

#### 6.2.6 Data Import (Excel Migration)

**Aim:** Move existing Excel data into the system

Features:

* Upload Excel file
* Map Excel columns to system fields
* Import existing 20 clients

---

#### 6.2.7 System Settings

**Aim:** Configure system-wide settings

Features:

* Stripe API key configuration
* Reminder templates (Email / WhatsApp)
* Loan duration settings
* Basic system preferences

---

## 7. Staff Dashboard

### 7.1 Staff Dashboard Aim

The Staff Dashboard allows employees to manage assigned clients and update payment information without accessing sensitive system settings.

---

### 7.2 Staff Dashboard Menus & Features

#### 7.2.1 Dashboard (Overview)

**Aim:** View assigned workload

Features:

* Assigned clients count
* Upcoming payment dues
* Overdue clients list

---

#### 7.2.2 Assigned Clients

**Aim:** Focus only on relevant clients

Features:

* View assigned clients list
* View client loan details
* View payment schedule

---

#### 7.2.3 Payment Updates

**Aim:** Keep payment records updated

Features:

* Add manual payment entries
* Update payment status
* View payment history (read-only)

---

#### 7.2.4 Due Schedule

**Aim:** Ensure timely follow-ups

Features:

* Upcoming due dates
* Overdue payment list

---

## 8. Payment System

### Payment Methods Supported

* Manual Payments (Cash / Bank Transfer)
* Online Payments via Stripe

Stripe payments will be recorded automatically in the system.

---

## 9. Notifications & Automation

### Notification Channels

* Email
* WhatsApp

### Trigger Events

* Upcoming payment due
* Payment overdue

---

## 10. Security & Access Control

* Role-based access (Admin / Staff)
* Secure authentication
* Restricted access to sensitive settings

---

## 11. UI & Frontend Requirements

### Technology Stack

* React JS
* Tailwind CSS

### UI Guidelines

* Clean and professional UI
* Dashboard-focused layout
* Responsive design (Desktop + Tablet)
* Consistent components across dashboards

---

## 12. Scalability

* Designed to handle growth from 20 to 200+ clients
* Modular architecture for future feature expansion

---

## 13. Out of Scope (Current Phase)

* Client login/dashboard
* Mobile application
* Advanced accounting features

---

## 14. Final Summary

This PRD defines a complete Loan Management System tailored for an Immigration business, focusing on automation, clarity, and operational efficiency. The system includes two dashboards (Admin and Staff) and covers loan tracking, payments, reminders, and team collaboration, fully replacing Excel-based workflows.
