const { z } = require("zod");

// User validation schemas
const userSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  motDePasse: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  nom: z.string().min(1, { message: "Le nom est requis" }),
  role: z.enum(
    ["ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"],
    {
      message:
        "Le rôle doit être: ETUDIANT, ENCADRANT_ENTREPRISE ou ENCADRANT_UNIVERSITAIRE",
    }
  ),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  motDePasse: z.string().min(1, { message: "Le mot de passe est requis" }),
});

// Project validation schemas
const projectSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  academic_supervisor_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "ID du superviseur académique invalide",
  }),
  company_supervisor_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "ID du superviseur d'entreprise invalide",
  }),
  dateDebut: z.string().datetime({ message: "Date de début invalide" }),
  dateFin: z.string().datetime({ message: "Date de fin invalide" }),
  statut: z
    .enum(["Actif", "Terminee", "Suspendu"], {
      message: "Le statut doit être: Actif, Terminee ou Suspendu",
    })
    .optional(),
});

const projectUpdateSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z
    .string()
    .min(1, { message: "La description est requise" })
    .optional(),
  dateDebut: z
    .string()
    .datetime({ message: "Date de début invalide" })
    .optional(),
  dateFin: z.string().datetime({ message: "Date de fin invalide" }).optional(),
  statut: z
    .enum(["Actif", "Terminee", "Suspendu"], {
      message: "Le statut doit être: Actif, Terminee ou Suspendu",
    })
    .optional(),
});

// Sprint validation schemas
const sprintSchema = z.object({
  numero: z
    .number()
    .int()
    .positive({ message: "Le numéro du sprint est requis" }),
  nom: z.string().min(1, { message: "Le nom du sprint est requis" }),
  dateDebut: z.string().datetime({ message: "Date de début invalide" }),
  dateFin: z.string().datetime({ message: "Date de fin invalide" }),
  statut: z
    .enum(["Planifie", "EnCours", "Termine"], {
      message: "Le statut doit être: Planifie, EnCours ou Termine",
    })
    .optional(),
});

const sprintUpdateSchema = z.object({
  numero: z.number().int().positive().optional(),
  nom: z.string().min(1, { message: "Le nom du sprint est requis" }).optional(),
  dateDebut: z
    .string()
    .datetime({ message: "Date de début invalide" })
    .optional(),
  dateFin: z.string().datetime({ message: "Date de fin invalide" }).optional(),
  statut: z
    .enum(["Planifie", "EnCours", "Termine"], {
      message: "Le statut doit être: Planifie, EnCours ou Termine",
    })
    .optional(),
});

// User Story validation schemas
const userStorySchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  priorite: z
    .enum(["Haute", "Moyenne", "Basse"], {
      message: "La priorité doit être: Haute, Moyenne ou Basse",
    })
    .optional(),
  acceptation: z.string().optional(),
});

const userStoryUpdateSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z.string().optional(),
  priorite: z
    .enum(["Haute", "Moyenne", "Basse"], {
      message: "La priorité doit être: Haute, Moyenne ou Basse",
    })
    .optional(),
  acceptation: z.string().optional(),
});

// Task validation schemas
const taskSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  statut: z
    .enum(["ToDo", "InProgress", "Standby", "Done"], {
      message: "Le statut doit être: ToDo, InProgress, Standby ou Done",
    })
    .optional(),
});

const taskUpdateSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z.string().optional(),
  statut: z
    .enum(["ToDo", "InProgress", "Standby", "Done"], {
      message: "Le statut doit être: ToDo, InProgress, Standby ou Done",
    })
    .optional(),
});

const taskStatusUpdateSchema = z.object({
  statut: z.enum(["ToDo", "InProgress", "Standby", "Done"], {
    message: "Le statut doit être: ToDo, InProgress, Standby ou Done",
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
  datePlanification: z.string().datetime({ message: "Date invalide" }),
  ordreDuJour: z.string().optional(),
  compteRendu: z.string().optional(),
  statut: z
    .enum(["Planifiee", "Effectuee", "Annulee"], {
      message: "Le statut doit être: Planifiee, Effectuee ou Annulee",
    })
    .optional(),
});

const meetingUpdateSchema = z.object({
  datePlanification: z
    .string()
    .datetime({ message: "Date invalide" })
    .optional(),
  ordreDuJour: z.string().optional(),
  compteRendu: z.string().optional(),
  statut: z
    .enum(["Planifiee", "Effectuee", "Annulee"], {
      message: "Le statut doit être: Planifiee, Effectuee ou Annulee",
    })
    .optional(),
});

const meetingValidationSchema = z.object({
  estValide: z.boolean({ message: "estValide doit être un booléen" }),
  commentaire: z.string().optional(),
});

// Report validation schemas (VersionRapport)
const reportSchema = z.object({
  urlFichier: z.string().url({ message: "URL de fichier invalide" }),
  version: z.number().int().positive({ message: "La version est requise" }),
});

const reportUpdateSchema = z.object({
  urlFichier: z.string().url({ message: "URL de fichier invalide" }).optional(),
  version: z.number().int().positive().optional(),
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

// Validation schemas
const validationSchema = z
  .object({
    taskId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Format d'ID de tâche invalide" })
      .optional(),
    meetingId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: "Format d'ID de réunion invalide",
      })
      .optional(),
    estValide: z.boolean({ message: "estValide doit être un booléen" }),
    commentaire: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.taskId && !data.meetingId) || (!data.taskId && data.meetingId),
    {
      message:
        "Soit taskId soit meetingId doit être fourni (contrainte OU exclusif)",
    }
  );

const validationUpdateSchema = z.object({
  estValide: z
    .boolean({ message: "estValide doit être un booléen" })
    .optional(),
  commentaire: z.string().optional(),
});

const validationIdSchema = z.object({
  validationId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Format d'ID de validation invalide",
  }),
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

const validateValidation = (req, res, next) => {
  try {
    validationSchema.parse(req.body);
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

const validateValidationUpdate = (req, res, next) => {
  try {
    validationUpdateSchema.parse(req.body);
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

const validateValidationId = (req, res, next) => {
  try {
    validationIdSchema.parse({ validationId: req.params.validationId });
    next();
  } catch (error) {
    const err = new Error("Invalid Validation ID format");
    err.status = 400;
    err.details = {
      field: "validationId",
      value: req.params.validationId,
      message: error.errors[0]?.message || "Format d'ID de validation invalide",
      code: "INVALID_VALIDATION_ID",
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
  validateValidation,
  validateValidationUpdate,
  validateId,
  validateSprintId,
  validateUserStoryId,
  validateTaskId,
  validateMeetingId,
  validateReportId,
  validateValidationId,
};
