const { z } = require("zod");

// User validation schemas
const userSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  user_name: z.string().min(1, { message: "Le nom d'utilisateur est requis" }),
  role: z.enum(
    ["student", "academic_supervisor", "company_supervisor", "admin"],
    {
      message:
        "Le rôle doit être: student, academic_supervisor, company_supervisor ou admin",
    }
  ),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

// Project validation schemas
const projectSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  academic_supervisor_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "ID du superviseur académique invalide",
  }),
  company_supervisor_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "ID du superviseur d'entreprise invalide",
  }),
  start_date: z.string().datetime({ message: "Date de début invalide" }),
  end_date: z.string().datetime({ message: "Date de fin invalide" }),
});

const projectUpdateSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z
    .string()
    .min(1, { message: "La description est requise" })
    .optional(),
  start_date: z
    .string()
    .datetime({ message: "Date de début invalide" })
    .optional(),
  end_date: z.string().datetime({ message: "Date de fin invalide" }).optional(),
});

// Sprint validation schemas
const sprintSchema = z.object({
  name: z.string().min(1, { message: "Le nom du sprint est requis" }),
  goal: z.string().optional(),
  start_date: z.string().datetime({ message: "Date de début invalide" }),
  end_date: z.string().datetime({ message: "Date de fin invalide" }),
  status: z
    .enum(["planning", "active", "completed"], {
      message: "Le statut doit être: planning, active ou completed",
    })
    .optional(),
});

const sprintUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom du sprint est requis" })
    .optional(),
  goal: z.string().optional(),
  start_date: z
    .string()
    .datetime({ message: "Date de début invalide" })
    .optional(),
  end_date: z.string().datetime({ message: "Date de fin invalide" }).optional(),
  status: z
    .enum(["planning", "active", "completed"], {
      message: "Le statut doit être: planning, active ou completed",
    })
    .optional(),
});

// User Story validation schemas
const userStorySchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  start_date: z.string().datetime({ message: "Date de début invalide" }),
  end_date: z.string().datetime({ message: "Date de fin invalide" }),
});

const userStoryUpdateSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z.string().optional(),
  start_date: z
    .string()
    .datetime({ message: "Date de début invalide" })
    .optional(),
  end_date: z.string().datetime({ message: "Date de fin invalide" }).optional(),
});

// Task validation schemas
const taskSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      message: "La priorité doit être: low, medium ou high",
    })
    .optional(),
  status: z
    .enum(["todo", "in_progress", "standby", "done"], {
      message: "Le statut doit être: todo, in_progress, standby ou done",
    })
    .optional(),
});

const taskUpdateSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z.string().optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      message: "La priorité doit être: low, medium ou high",
    })
    .optional(),
  status: z
    .enum(["todo", "in_progress", "standby", "done"], {
      message: "Le statut doit être: todo, in_progress, standby ou done",
    })
    .optional(),
});

const taskStatusUpdateSchema = z.object({
  status: z.enum(["todo", "in_progress", "standby", "done"], {
    message: "Le statut doit être: todo, in_progress, standby ou done",
  }),
});

// Generic ID validation
const idSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID invalide" }),
});

const sprintIdSchema = z.object({
  sprintId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID de sprint invalide" }),
});

const userStoryIdSchema = z.object({
  userStoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Format d'ID d'user story invalide",
  }),
});

const taskIdSchema = z.object({
  taskId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID de tâche invalide" }),
});

// Journal validation schemas
const journalSchema = z.object({
  date: z.string().datetime({ message: "Date invalide" }),
  activities: z.string().optional(),
  skills: z.string().optional(),
  difficulties: z.string().optional(),
  solutions: z.string().optional(),
});

const journalUpdateSchema = z.object({
  date: z.string().datetime({ message: "Date invalide" }).optional(),
  activities: z.string().optional(),
  skills: z.string().optional(),
  difficulties: z.string().optional(),
  solutions: z.string().optional(),
});

// Meeting validation schemas
const meetingSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  date: z.string().datetime({ message: "Date invalide" }),
  duration: z
    .number()
    .min(1, { message: "La durée doit être positive" })
    .optional(),
  participants: z
    .array(
      z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "ID de participant invalide" })
    )
    .optional(),
  link: z.string().url({ message: "Lien invalide" }).optional(),
  status: z
    .enum(["planned", "completed"], {
      message: "Le statut doit être: planned ou completed",
    })
    .optional(),
  description: z.string().optional(),
});

const meetingUpdateSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }).optional(),
  date: z.string().datetime({ message: "Date invalide" }).optional(),
  duration: z
    .number()
    .min(1, { message: "La durée doit être positive" })
    .optional(),
  participants: z
    .array(
      z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "ID de participant invalide" })
    )
    .optional(),
  link: z.string().url({ message: "Lien invalide" }).optional(),
  status: z
    .enum(["planned", "completed"], {
      message: "Le statut doit être: planned ou completed",
    })
    .optional(),
  description: z.string().optional(),
});

const meetingValidationSchema = z.object({
  status: z.enum(["planned", "completed"], {
    message: "Le statut doit être: planned ou completed",
  }),
});

// Report validation schemas
const reportSchema = z.object({
  version: z.string().min(1, { message: "La version est requise" }),
  date: z.string().datetime({ message: "Date invalide" }),
  notes: z.string().optional(),
  file_url: z.string().url({ message: "URL de fichier invalide" }),
  status: z
    .enum(["draft", "submitted", "approved", "rejected"], {
      message: "Le statut doit être: draft, submitted, approved ou rejected",
    })
    .optional(),
});

const reportUpdateSchema = z.object({
  version: z.string().min(1, { message: "La version est requise" }).optional(),
  date: z.string().datetime({ message: "Date invalide" }).optional(),
  notes: z.string().optional(),
  file_url: z.string().url({ message: "URL de fichier invalide" }).optional(),
  status: z
    .enum(["draft", "submitted", "approved", "rejected"], {
      message: "Le statut doit être: draft, submitted, approved ou rejected",
    })
    .optional(),
});

// Additional ID validation schemas
const meetingIdSchema = z.object({
  meetingId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID de réunion invalide" }),
});

const reportIdSchema = z.object({
  reportId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID de rapport invalide" }),
});

// Validation middleware functions
const validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateProject = (req, res, next) => {
  try {
    projectSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateProjectUpdate = (req, res, next) => {
  try {
    projectUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateSprint = (req, res, next) => {
  try {
    sprintSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateSprintUpdate = (req, res, next) => {
  try {
    sprintUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateUserStory = (req, res, next) => {
  try {
    userStorySchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateUserStoryUpdate = (req, res, next) => {
  try {
    userStoryUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateTask = (req, res, next) => {
  try {
    taskSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateTaskUpdate = (req, res, next) => {
  try {
    taskUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateTaskStatusUpdate = (req, res, next) => {
  try {
    taskStatusUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateId = (req, res, next) => {
  try {
    idSchema.parse({ id: req.params.id });
    next();
  } catch (error) {
    const err = new Error("Invalid ID format");
    err.status = 400;
    err.details = {
      field: "id",
      value: req.params.id,
      message: error.errors[0]?.message || "Format d'ID invalide",
      code: "INVALID_ID",
    };
    next(err);
  }
};

const validateSprintId = (req, res, next) => {
  try {
    sprintIdSchema.parse({ sprintId: req.params.sprintId });
    next();
  } catch (error) {
    const err = new Error("Invalid Sprint ID format");
    err.status = 400;
    err.details = {
      field: "sprintId",
      value: req.params.sprintId,
      message: error.errors[0]?.message || "Format d'ID de sprint invalide",
      code: "INVALID_SPRINT_ID",
    };
    next(err);
  }
};

const validateUserStoryId = (req, res, next) => {
  try {
    userStoryIdSchema.parse({ userStoryId: req.params.userStoryId });
    next();
  } catch (error) {
    const err = new Error("Invalid User Story ID format");
    err.status = 400;
    err.details = {
      field: "userStoryId",
      value: req.params.userStoryId,
      message: error.errors[0]?.message || "Format d'ID d'user story invalide",
      code: "INVALID_USER_STORY_ID",
    };
    next(err);
  }
};

const validateTaskId = (req, res, next) => {
  try {
    taskIdSchema.parse({ taskId: req.params.taskId });
    next();
  } catch (error) {
    const err = new Error("Invalid Task ID format");
    err.status = 400;
    err.details = {
      field: "taskId",
      value: req.params.taskId,
      message: error.errors[0]?.message || "Format d'ID de tâche invalide",
      code: "INVALID_TASK_ID",
    };
    next(err);
  }
};

const validateJournal = (req, res, next) => {
  try {
    journalSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateJournalUpdate = (req, res, next) => {
  try {
    journalUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateMeeting = (req, res, next) => {
  try {
    meetingSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateMeetingUpdate = (req, res, next) => {
  try {
    meetingUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateMeetingValidation = (req, res, next) => {
  try {
    meetingValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateReport = (req, res, next) => {
  try {
    reportSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateReportUpdate = (req, res, next) => {
  try {
    reportUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
      code: "VALIDATION_ERROR",
    }));
    next(err);
  }
};

const validateMeetingId = (req, res, next) => {
  try {
    meetingIdSchema.parse({ meetingId: req.params.meetingId });
    next();
  } catch (error) {
    const err = new Error("Invalid Meeting ID format");
    err.status = 400;
    err.details = {
      field: "meetingId",
      value: req.params.meetingId,
      message: error.errors[0]?.message || "Format d'ID de réunion invalide",
      code: "INVALID_MEETING_ID",
    };
    next(err);
  }
};

const validateReportId = (req, res, next) => {
  try {
    reportIdSchema.parse({ reportId: req.params.reportId });
    next();
  } catch (error) {
    const err = new Error("Invalid Report ID format");
    err.status = 400;
    err.details = {
      field: "reportId",
      value: req.params.reportId,
      message: error.errors[0]?.message || "Format d'ID de rapport invalide",
      code: "INVALID_REPORT_ID",
    };
    next(err);
  }
};

module.exports = {
  validateUser,
  validateLogin,
  validateProject,
  validateProjectUpdate,
  validateSprint,
  validateSprintUpdate,
  validateUserStory,
  validateUserStoryUpdate,
  validateTask,
  validateTaskUpdate,
  validateTaskStatusUpdate,
  validateJournal,
  validateJournalUpdate,
  validateMeeting,
  validateMeetingUpdate,
  validateMeetingValidation,
  validateReport,
  validateReportUpdate,
  validateId,
  validateSprintId,
  validateUserStoryId,
  validateTaskId,
  validateMeetingId,
  validateReportId,
};
