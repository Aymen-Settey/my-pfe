# Team D - Validations & Réunions

**Team Members:** [Your Names]  
**Project:** PFE Management System  
**Duration:** November 30, 2025 - December 6, 2025

## 📋 Overview

Team D is responsible for implementing the **Validations** and **Réunions (Meetings)** modules, including:

- Meeting management (planning, agenda, minutes)
- Validation system for tasks and meeting content
- Report versions linked to meetings
- Integration with other modules (Tasks, User Stories, Reports)

---

## 🎯 Project Timeline

### **Phase 1: Models Implementation**

**Deadline: December 1, 2025 (End of Day)**

#### Task 1.1: Meeting Model ✅

- [x] Create `models/Meeting.js`
- [x] Implement schema with fields:
  - `project_id` (reference to Project)
  - `datePlanification` (Date)
  - `ordreDuJour` (String - agenda)
  - `compteRendu` (String - minutes)
  - `statut` (Enum: Planifiee, Effectuee, Annulee)
  - `dateCreation` (Date)
  - `planner_id` (reference to User - ENCADRANT_UNIVERSITAIRE)
- [x] Add timestamps

**Files to commit:**

- `models/Meeting.js`

---

#### Task 1.2: Validation Model ✅

- [x] Create `models/Validation.js`
- [x] Implement schema with fields:
  - `task_id` (optional reference to Task)
  - `meeting_id` (optional reference to Meeting)
  - `validated_by` (reference to User)
  - `estValide` (Boolean)
  - `commentaire` (String)
  - `dateValidation` (Date)
  - `typeValidation` (Enum: Tache, ContenuReunion)
- [x] Implement exclusive OR constraint (task_id OR meeting_id, not both)
- [x] Auto-set `typeValidation` based on provided ID

**Files to commit:**

- `models/Validation.js`

---

#### Task 1.3: Report Model (VersionRapport) ✅

- [x] Update `models/Report.js` to match VersionRapport structure
- [x] Change relationship from Project to Meeting
- [x] Update fields:
  - `meeting_id` (reference to Meeting)
  - `urlFichier` (String)
  - `version` (Number)
  - `dateCreation` (Date)

**Files to commit:**

- `models/Report.js`

---

### **Phase 2: Controllers Implementation**

**Deadline: December 3, 2025 (End of Day)**

#### Task 2.1: Meeting Controller ✅

- [x] Create `controllers/meetingController.js`
- [x] Implement `createMeeting()` - Only ENCADRANT_UNIVERSITAIRE can plan
- [x] Implement `getMeetings()` - Get all meetings for a project
- [x] Implement `getMeetingById()` - Get specific meeting
- [x] Implement `updateMeeting()` - Update meeting details
- [x] Implement `validateMeeting()` - Create validation for meeting content
- [x] Implement `deleteMeeting()` - Delete meeting

**Files to commit:**

- `controllers/meetingController.js`

---

#### Task 2.2: Validation Controller ✅

- [x] Create `controllers/validationController.js`
- [x] Implement `createValidation()` - Create validation (task or meeting)
- [x] Implement `getValidations()` - Get validations (filtered by taskId/meetingId)
- [x] Implement `getValidationById()` - Get specific validation
- [x] Implement `updateValidation()` - Update validation
- [x] Implement `deleteValidation()` - Delete validation
- [x] Handle route params when nested under tasks/meetings

**Files to commit:**

- `controllers/validationController.js`

---

#### Task 2.3: Report Controller Updates ✅

- [x] Update `controllers/reportController.js`
- [x] Change from `projectId` to `meetingId` in all methods
- [x] Update `uploadReport()` - Link to meeting instead of project
- [x] Update `getReports()` - Get reports for a meeting
- [x] Update `getReportById()` - Get specific report version
- [x] Update `updateReport()` - Update report version
- [x] Update `downloadReport()` - Download report file
- [x] Update `reviewReport()` - Create validation for report (meeting content)
- [x] Update `deleteReport()` - Delete report version

**Files to commit:**

- `controllers/reportController.js`

---

### **Phase 3: Routes & Validators**

**Deadline: December 5, 2025 (End of Day)**

#### Task 3.1: Meeting Routes ✅

- [x] Update `routes/meetingRoutes.js`
- [x] Add all CRUD routes for meetings
- [x] Add validation endpoint (`/:meetingId/validate`)
- [x] Nest report routes under meetings
- [x] Nest validation routes under meetings
- [x] Update role authorization (ETUDIANT, ENCADRANT_ENTREPRISE, ENCADRANT_UNIVERSITAIRE)

**Files to commit:**

- `routes/meetingRoutes.js`

---

#### Task 3.2: Validation Routes ✅

- [x] Create `routes/validationRoutes.js`
- [x] Add all CRUD routes for validations
- [x] Support nested routes (under tasks and meetings)
- [x] Add proper authorization middleware
- [x] Add validation middleware

**Files to commit:**

- `routes/validationRoutes.js`

---

#### Task 3.3: Report Routes Updates ✅

- [x] Update `routes/reportRoutes.js`
- [x] Change from project-based to meeting-based routes
- [x] Update all route paths to use `meetingId`
- [x] Add review endpoint (`/:reportId/review`)
- [x] Update role authorization

**Files to commit:**

- `routes/reportRoutes.js`

---

#### Task 3.4: Validators Implementation ✅

- [x] Update `validators/index.js`
- [x] Add `meetingSchema` - Meeting creation validation
- [x] Add `meetingUpdateSchema` - Meeting update validation
- [x] Add `meetingValidationSchema` - Meeting content validation
- [x] Add `reportSchema` - Report version creation
- [x] Add `reportUpdateSchema` - Report version update
- [x] Add `validationSchema` - Validation creation (with exclusive OR)
- [x] Add `validationUpdateSchema` - Validation update
- [x] Add ID validation schemas (meetingId, reportId, validationId)
- [x] Add all validation middleware functions

**Files to commit:**

- `validators/index.js`

---

#### Task 3.5: Route Integration ✅

- [x] Update `routes/projectRoutes.js`
- [x] Add validation routes at project level
- [x] Ensure proper route nesting
- [x] Update route comments

**Files to commit:**

- `routes/projectRoutes.js`

---

### **Phase 4: Testing & Integration**

**Deadline: December 6, 2025 (End of Day)**

#### Task 4.1: Integration Testing

- [ ] Test meeting creation by ENCADRANT_UNIVERSITAIRE
- [ ] Test meeting validation workflow
- [ ] Test validation creation for tasks
- [ ] Test validation creation for meeting content
- [ ] Test exclusive OR constraint in Validation model
- [ ] Test report version upload linked to meetings
- [ ] Test report review (creates validation)
- [ ] Test nested routes (validations under tasks/meetings)

#### Task 4.2: Error Handling

- [ ] Verify all error messages are clear
- [ ] Test authorization restrictions
- [ ] Test validation constraints
- [ ] Test edge cases (missing IDs, invalid data)

#### Task 4.3: Documentation

- [ ] Update API documentation
- [ ] Document validation exclusive OR constraint
- [ ] Document meeting planning restrictions
- [ ] Document report-meeting relationship

---

## 📁 File Structure

```
My_PFE/
├── models/
│   ├── Meeting.js          ✅ Phase 1.1
│   ├── Validation.js       ✅ Phase 1.2
│   └── Report.js           ✅ Phase 1.3
├── controllers/
│   ├── meetingController.js     ✅ Phase 2.1
│   ├── validationController.js  ✅ Phase 2.2
│   └── reportController.js      ✅ Phase 2.3
├── routes/
│   ├── meetingRoutes.js    ✅ Phase 3.1
│   ├── validationRoutes.js ✅ Phase 3.2
│   ├── reportRoutes.js     ✅ Phase 3.3
│   └── projectRoutes.js    ✅ Phase 3.5
└── validators/
    └── index.js            ✅ Phase 3.4
```

---

## 🔗 API Endpoints

### Meetings

- `POST /api/v1/projects/:projectId/meetings` - Create meeting
- `GET /api/v1/projects/:projectId/meetings` - Get all meetings
- `GET /api/v1/projects/:projectId/meetings/:meetingId` - Get meeting by ID
- `PUT /api/v1/projects/:projectId/meetings/:meetingId` - Update meeting
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/validate` - Validate meeting content
- `DELETE /api/v1/projects/:projectId/meetings/:meetingId` - Delete meeting

### Validations

- `POST /api/v1/projects/:projectId/validations` - Create validation
- `GET /api/v1/projects/:projectId/validations` - Get validations (with query filters)
- `GET /api/v1/projects/:projectId/tasks/:taskId/validations` - Get task validations
- `GET /api/v1/projects/:projectId/meetings/:meetingId/validations` - Get meeting validations
- `GET /api/v1/projects/:projectId/validations/:validationId` - Get validation by ID
- `PUT /api/v1/projects/:projectId/validations/:validationId` - Update validation
- `DELETE /api/v1/projects/:projectId/validations/:validationId` - Delete validation

### Reports (VersionRapport)

- `POST /api/v1/projects/:projectId/meetings/:meetingId/reports` - Upload report version
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports` - Get all report versions
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Get report by ID
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Update report
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId/download` - Download report
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId/review` - Review report
- `DELETE /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Delete report

---

## 🔐 Authorization Rules

### Meetings

- **Create**: Only `ENCADRANT_UNIVERSITAIRE` can plan meetings
- **Read**: `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Update**: Only `ENCADRANT_UNIVERSITAIRE`
- **Delete**: Only `ENCADRANT_UNIVERSITAIRE`
- **Validate**: `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`

### Validations

- **Create**: `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Read**: `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Update**: `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Delete**: `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`

### Reports

- **Upload**: `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`
- **Read**: `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Update**: `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`
- **Review**: `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Delete**: `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`

---

## 📝 Key Features Implemented

### 1. Exclusive OR Constraint

The Validation model enforces that either `task_id` OR `meeting_id` must be provided, but not both. This is implemented at the model level with a pre-validation hook.

### 2. Meeting Content Validation

Meetings can be validated, which creates a Validation record with `typeValidation: "ContenuReunion"`.

### 3. Task Validation

Tasks can be validated, which creates a Validation record with `typeValidation: "Tache"`.

### 4. Report Versions Linked to Meetings

Reports (VersionRapport) are now linked to meetings instead of projects, allowing multiple versions per meeting.

### 5. Nested Routes

Validations can be accessed through:

- Project level: `/projects/:projectId/validations`
- Task level: `/projects/:projectId/tasks/:taskId/validations`
- Meeting level: `/projects/:projectId/meetings/:meetingId/validations`

---

## 🚀 Git Commit Strategy

### Commit 1: Models (Dec 1, 2025)

```bash
git add models/Meeting.js models/Validation.js models/Report.js
git commit -m "feat(team-d): Add Meeting, Validation, and Report models

- Implement Meeting model with planner relationship
- Implement Validation model with exclusive OR constraint
- Update Report model to link to meetings instead of projects"
```

### Commit 2: Controllers (Dec 3, 2025)

```bash
git add controllers/meetingController.js controllers/validationController.js controllers/reportController.js
git commit -m "feat(team-d): Implement Meeting, Validation, and Report controllers

- Add full CRUD operations for meetings
- Add validation system for tasks and meeting content
- Update report controller to work with meetings"
```

### Commit 3: Routes & Validators (Dec 5, 2025)

```bash
git add routes/meetingRoutes.js routes/validationRoutes.js routes/reportRoutes.js routes/projectRoutes.js validators/index.js
git commit -m "feat(team-d): Add routes and validators for Team D modules

- Add meeting routes with nested report and validation routes
- Add validation routes with support for nested access
- Update report routes to use meeting-based structure
- Add comprehensive validation schemas"
```

### Commit 4: Testing & Documentation (Dec 6, 2025)

```bash
git add README_TEAM_D.md
git commit -m "docs(team-d): Add Team D documentation and testing notes"
```

---

## ✅ Checklist for Final Review

- [x] All models implemented and tested
- [x] All controllers implemented with proper error handling
- [x] All routes configured with correct authorization
- [x] All validators implemented
- [x] Exclusive OR constraint working
- [x] Meeting planning restricted to ENCADRANT_UNIVERSITAIRE
- [x] Report versions linked to meetings
- [x] Validation system supports both tasks and meeting content
- [ ] Integration tests passing
- [ ] API documentation updated

---

## 📞 Team Coordination

### Dependencies on Other Teams

- **Team A**: Project and Sprint models (for meeting `project_id`)
- **Team C**: Task model (for validation `task_id`)
- **Team B**: User Story model (indirectly through tasks)

### Integration Points

- Meetings are linked to Projects (Team A)
- Validations can validate Tasks (Team C)
- Reports are linked to Meetings (Team D)

---

## 🐛 Known Issues / Future Improvements

- [ ] Add pagination for validations list
- [ ] Add filtering by validation status
- [ ] Add meeting reminders/notifications
- [ ] Add file upload for report versions
- [ ] Add validation history tracking

---

**Last Updated:** November 30, 2025  
**Status:** ✅ Implementation Complete | ⏳ Testing In Progress
