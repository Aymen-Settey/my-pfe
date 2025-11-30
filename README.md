# Équipe D - Validations & Réunions

**Membres de l'équipe :** Aymen Settey & Khairi Hammami
**Projet :** Système de Gestion PFE  
**Durée :** 30 novembre 2025 - 6 décembre 2025

## 📋 Vue d'ensemble

L'équipe D est responsable de l'implémentation des modules **Validations** et **Réunions**, incluant :

- Gestion des réunions (planification, ordre du jour, compte-rendu)
- Système de validation pour les tâches et le contenu des réunions
- Versions de rapports liées aux réunions
- Intégration avec les autres modules (Tâches, User Stories, Rapports)

---

## 🎯 Calendrier du projet

### **Phase 1 : Implémentation des Modèles**

**Date limite : 1er décembre 2025 (Fin de journée)**

#### Tâche 1.1 : Modèle Meeting ✅

- [x] Créer `models/Meeting.js`
- [x] Implémenter le schéma avec les champs :
  - `project_id` (référence vers Project)
  - `datePlanification` (Date)
  - `ordreDuJour` (String - ordre du jour)
  - `compteRendu` (String - compte-rendu)
  - `statut` (Enum : Planifiee, Effectuee, Annulee)
  - `dateCreation` (Date)
  - `planner_id` (référence vers User - ENCADRANT_UNIVERSITAIRE)
- [x] Ajouter les timestamps

**Fichiers à commiter :**

- `models/Meeting.js`

---

#### Tâche 1.2 : Modèle Validation ✅

- [x] Créer `models/Validation.js`
- [x] Implémenter le schéma avec les champs :
  - `task_id` (référence optionnelle vers Task)
  - `meeting_id` (référence optionnelle vers Meeting)
  - `validated_by` (référence vers User)
  - `estValide` (Boolean)
  - `commentaire` (String)
  - `dateValidation` (Date)
  - `typeValidation` (Enum : Tache, ContenuReunion)
- [x] Implémenter la contrainte OU exclusif (task_id OU meeting_id, pas les deux)
- [x] Définir automatiquement `typeValidation` selon l'ID fourni

**Fichiers à commiter :**

- `models/Validation.js`

---

#### Tâche 1.3 : Modèle Report (VersionRapport) ✅

- [x] Mettre à jour `models/Report.js` pour correspondre à la structure VersionRapport
- [x] Changer la relation de Project vers Meeting
- [x] Mettre à jour les champs :
  - `meeting_id` (référence vers Meeting)
  - `urlFichier` (String)
  - `version` (Number)
  - `dateCreation` (Date)

**Fichiers à commiter :**

- `models/Report.js`

---

### **Phase 2 : Implémentation des Contrôleurs**

**Date limite : 3 décembre 2025 (Fin de journée)**

#### Tâche 2.1 : Contrôleur Meeting ✅

- [x] Créer `controllers/meetingController.js`
- [x] Implémenter `createMeeting()` - Seul ENCADRANT_UNIVERSITAIRE peut planifier
- [x] Implémenter `getMeetings()` - Obtenir toutes les réunions d'un projet
- [x] Implémenter `getMeetingById()` - Obtenir une réunion spécifique
- [x] Implémenter `updateMeeting()` - Mettre à jour les détails d'une réunion
- [x] Implémenter `validateMeeting()` - Créer une validation pour le contenu de la réunion
- [x] Implémenter `deleteMeeting()` - Supprimer une réunion

**Fichiers à commiter :**

- `controllers/meetingController.js`

---

#### Tâche 2.2 : Contrôleur Validation ✅

- [x] Créer `controllers/validationController.js`
- [x] Implémenter `createValidation()` - Créer une validation (tâche ou réunion)
- [x] Implémenter `getValidations()` - Obtenir les validations (filtrées par taskId/meetingId)
- [x] Implémenter `getValidationById()` - Obtenir une validation spécifique
- [x] Implémenter `updateValidation()` - Mettre à jour une validation
- [x] Implémenter `deleteValidation()` - Supprimer une validation
- [x] Gérer les paramètres de route lorsqu'imbriqués sous tasks/meetings

**Fichiers à commiter :**

- `controllers/validationController.js`

---

#### Tâche 2.3 : Mises à jour du Contrôleur Report ✅

- [x] Mettre à jour `controllers/reportController.js`
- [x] Changer de `projectId` à `meetingId` dans toutes les méthodes
- [x] Mettre à jour `uploadReport()` - Lier à la réunion au lieu du projet
- [x] Mettre à jour `getReports()` - Obtenir les rapports d'une réunion
- [x] Mettre à jour `getReportById()` - Obtenir une version de rapport spécifique
- [x] Mettre à jour `updateReport()` - Mettre à jour une version de rapport
- [x] Mettre à jour `downloadReport()` - Télécharger le fichier de rapport
- [x] Mettre à jour `reviewReport()` - Créer une validation pour le rapport (contenu de réunion)
- [x] Mettre à jour `deleteReport()` - Supprimer une version de rapport

**Fichiers à commiter :**

- `controllers/reportController.js`

---

### **Phase 3 : Routes & Validateurs**

**Date limite : 5 décembre 2025 (Fin de journée)**

#### Tâche 3.1 : Routes Meeting ✅

- [x] Mettre à jour `routes/meetingRoutes.js`
- [x] Ajouter toutes les routes CRUD pour les réunions
- [x] Ajouter l'endpoint de validation (`/:meetingId/validate`)
- [x] Imbriquer les routes de rapports sous les réunions
- [x] Imbriquer les routes de validations sous les réunions
- [x] Mettre à jour l'autorisation des rôles (ETUDIANT, ENCADRANT_ENTREPRISE, ENCADRANT_UNIVERSITAIRE)

**Fichiers à commiter :**

- `routes/meetingRoutes.js`

---

#### Tâche 3.2 : Routes Validation ✅

- [x] Créer `routes/validationRoutes.js`
- [x] Ajouter toutes les routes CRUD pour les validations
- [x] Supporter les routes imbriquées (sous tasks et meetings)
- [x] Ajouter le middleware d'autorisation approprié
- [x] Ajouter le middleware de validation

**Fichiers à commiter :**

- `routes/validationRoutes.js`

---

#### Tâche 3.3 : Mises à jour des Routes Report ✅

- [x] Mettre à jour `routes/reportRoutes.js`
- [x] Changer de routes basées sur le projet à des routes basées sur la réunion
- [x] Mettre à jour tous les chemins de route pour utiliser `meetingId`
- [x] Ajouter l'endpoint de révision (`/:reportId/review`)
- [x] Mettre à jour l'autorisation des rôles

**Fichiers à commiter :**

- `routes/reportRoutes.js`

---

#### Tâche 3.4 : Implémentation des Validateurs ✅

- [x] Mettre à jour `validators/index.js`
- [x] Ajouter `meetingSchema` - Validation de création de réunion
- [x] Ajouter `meetingUpdateSchema` - Validation de mise à jour de réunion
- [x] Ajouter `meetingValidationSchema` - Validation du contenu de réunion
- [x] Ajouter `reportSchema` - Création de version de rapport
- [x] Ajouter `reportUpdateSchema` - Mise à jour de version de rapport
- [x] Ajouter `validationSchema` - Création de validation (avec OU exclusif)
- [x] Ajouter `validationUpdateSchema` - Mise à jour de validation
- [x] Ajouter les schémas de validation d'ID (meetingId, reportId, validationId)
- [x] Ajouter toutes les fonctions middleware de validation

**Fichiers à commiter :**

- `validators/index.js`

---

#### Tâche 3.5 : Intégration des Routes ✅

- [x] Mettre à jour `routes/projectRoutes.js`
- [x] Ajouter les routes de validation au niveau du projet
- [x] Assurer l'imbrication correcte des routes
- [x] Mettre à jour les commentaires des routes

**Fichiers à commiter :**

- `routes/projectRoutes.js`

---

### **Phase 4 : Tests & Intégration**

**Date limite : 6 décembre 2025 (Fin de journée)**

#### Tâche 4.1 : Tests d'Intégration

- [ ] Tester la création de réunion par ENCADRANT_UNIVERSITAIRE
- [ ] Tester le workflow de validation de réunion
- [ ] Tester la création de validation pour les tâches
- [ ] Tester la création de validation pour le contenu de réunion
- [ ] Tester la contrainte OU exclusif dans le modèle Validation
- [ ] Tester le téléversement de version de rapport lié aux réunions
- [ ] Tester la révision de rapport (crée une validation)
- [ ] Tester les routes imbriquées (validations sous tasks/meetings)

#### Tâche 4.2 : Gestion des Erreurs

- [ ] Vérifier que tous les messages d'erreur sont clairs
- [ ] Tester les restrictions d'autorisation
- [ ] Tester les contraintes de validation
- [ ] Tester les cas limites (IDs manquants, données invalides)

#### Tâche 4.3 : Documentation

- [ ] Mettre à jour la documentation API
- [ ] Documenter la contrainte OU exclusif de validation
- [ ] Documenter les restrictions de planification de réunion
- [ ] Documenter la relation rapport-réunion

---

## 📁 Structure des Fichiers

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

## 🔗 Points de Terminaison API

### Réunions

- `POST /api/v1/projects/:projectId/meetings` - Créer une réunion
- `GET /api/v1/projects/:projectId/meetings` - Obtenir toutes les réunions
- `GET /api/v1/projects/:projectId/meetings/:meetingId` - Obtenir une réunion par ID
- `PUT /api/v1/projects/:projectId/meetings/:meetingId` - Mettre à jour une réunion
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/validate` - Valider le contenu de la réunion
- `DELETE /api/v1/projects/:projectId/meetings/:meetingId` - Supprimer une réunion

### Validations

- `POST /api/v1/projects/:projectId/validations` - Créer une validation
- `GET /api/v1/projects/:projectId/validations` - Obtenir les validations (avec filtres de requête)
- `GET /api/v1/projects/:projectId/tasks/:taskId/validations` - Obtenir les validations de tâche
- `GET /api/v1/projects/:projectId/meetings/:meetingId/validations` - Obtenir les validations de réunion
- `GET /api/v1/projects/:projectId/validations/:validationId` - Obtenir une validation par ID
- `PUT /api/v1/projects/:projectId/validations/:validationId` - Mettre à jour une validation
- `DELETE /api/v1/projects/:projectId/validations/:validationId` - Supprimer une validation

### Rapports (VersionRapport)

- `POST /api/v1/projects/:projectId/meetings/:meetingId/reports` - Téléverser une version de rapport
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports` - Obtenir toutes les versions de rapport
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Obtenir un rapport par ID
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Mettre à jour un rapport
- `GET /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId/download` - Télécharger un rapport
- `PUT /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId/review` - Réviser un rapport
- `DELETE /api/v1/projects/:projectId/meetings/:meetingId/reports/:reportId` - Supprimer un rapport

---

## 🔐 Règles d'Autorisation

### Réunions

- **Créer** : Seul `ENCADRANT_UNIVERSITAIRE` peut planifier des réunions
- **Lire** : `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Mettre à jour** : Seul `ENCADRANT_UNIVERSITAIRE`
- **Supprimer** : Seul `ENCADRANT_UNIVERSITAIRE`
- **Valider** : `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`

### Validations

- **Créer** : `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Lire** : `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Mettre à jour** : `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Supprimer** : `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`

### Rapports

- **Téléverser** : `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`
- **Lire** : `ETUDIANT`, `ENCADRANT_ENTREPRISE`, `ENCADRANT_UNIVERSITAIRE`
- **Mettre à jour** : `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`
- **Réviser** : `ENCADRANT_UNIVERSITAIRE`, `ENCADRANT_ENTREPRISE`
- **Supprimer** : `ETUDIANT`, `ENCADRANT_UNIVERSITAIRE`

---

## 📝 Fonctionnalités Clés Implémentées

### 1. Contrainte OU Exclusif

Le modèle Validation impose que soit `task_id` SOIT `meeting_id` doit être fourni, mais pas les deux. Ceci est implémenté au niveau du modèle avec un hook de pré-validation.

### 2. Validation du Contenu de Réunion

Les réunions peuvent être validées, ce qui crée un enregistrement Validation avec `typeValidation: "ContenuReunion"`.

### 3. Validation de Tâche

Les tâches peuvent être validées, ce qui crée un enregistrement Validation avec `typeValidation: "Tache"`.

### 4. Versions de Rapports Liées aux Réunions

Les rapports (VersionRapport) sont maintenant liés aux réunions au lieu des projets, permettant plusieurs versions par réunion.

### 5. Routes Imbriquées

Les validations peuvent être accédées via :

- Niveau projet : `/projects/:projectId/validations`
- Niveau tâche : `/projects/:projectId/tasks/:taskId/validations`
- Niveau réunion : `/projects/:projectId/meetings/:meetingId/validations`

---

## 🚀 Stratégie de Commit Git

### Commit 1 : Modèles (1er déc. 2025)

```bash
git add models/Meeting.js models/Validation.js models/Report.js
git commit -m "feat(team-d): Ajouter les modèles Meeting, Validation et Report

- Implémenter le modèle Meeting avec relation planner
- Implémenter le modèle Validation avec contrainte OU exclusif
- Mettre à jour le modèle Report pour lier aux réunions au lieu des projets"
```

### Commit 2 : Contrôleurs (3 déc. 2025)

```bash
git add controllers/meetingController.js controllers/validationController.js controllers/reportController.js
git commit -m "feat(team-d): Implémenter les contrôleurs Meeting, Validation et Report

- Ajouter toutes les opérations CRUD pour les réunions
- Ajouter le système de validation pour les tâches et le contenu des réunions
- Mettre à jour le contrôleur de rapport pour fonctionner avec les réunions"
```

### Commit 3 : Routes & Validateurs (5 déc. 2025)

```bash
git add routes/meetingRoutes.js routes/validationRoutes.js routes/reportRoutes.js routes/projectRoutes.js validators/index.js
git commit -m "feat(team-d): Ajouter les routes et validateurs pour les modules de l'équipe D

- Ajouter les routes de réunion avec routes imbriquées de rapport et validation
- Ajouter les routes de validation avec support d'accès imbriqué
- Mettre à jour les routes de rapport pour utiliser la structure basée sur les réunions
- Ajouter des schémas de validation complets"
```

### Commit 4 : Tests & Documentation (6 déc. 2025)

```bash
git add README_TEAM_D.md
git commit -m "docs(team-d): Ajouter la documentation de l'équipe D et les notes de test"
```

---

## ✅ Checklist pour la Revue Finale

- [x] Tous les modèles implémentés et testés
- [x] Tous les contrôleurs implémentés avec gestion d'erreur appropriée
- [x] Toutes les routes configurées avec autorisation correcte
- [x] Tous les validateurs implémentés
- [x] Contrainte OU exclusif fonctionnelle
- [x] Planification de réunion restreinte à ENCADRANT_UNIVERSITAIRE
- [x] Versions de rapports liées aux réunions
- [x] Système de validation supportant les tâches et le contenu des réunions
- [ ] Tests d'intégration réussis
- [ ] Documentation API mise à jour

---

## 📞 Coordination d'Équipe

### Dépendances avec les Autres Équipes

- **Équipe A** : Modèles Project et Sprint (pour `project_id` de réunion)
- **Équipe C** : Modèle Task (pour `task_id` de validation)
- **Équipe B** : Modèle User Story (indirectement via les tâches)

### Points d'Intégration

- Les réunions sont liées aux Projets (Équipe A)
- Les validations peuvent valider les Tâches (Équipe C)
- Les rapports sont liés aux Réunions (Équipe D)

---

## 🐛 Problèmes Connus / Améliorations Futures

- [ ] Ajouter la pagination pour la liste des validations
- [ ] Ajouter le filtrage par statut de validation
- [ ] Ajouter les rappels/notifications de réunion
- [ ] Ajouter le téléversement de fichier pour les versions de rapport
- [ ] Ajouter le suivi de l'historique de validation
