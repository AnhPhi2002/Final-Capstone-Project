
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import authSubReducer from './authSubSlice';
import yearReducer from "./yearSlice";
import semesterReducer from "./semesterSlice";
import { studentReducer } from './studentSlice';
import importStudentReducer from './importStudentSlice';
import importConditionsReducer from "./importConditionsSlice";
import sendMailReducer from "./sendEmailSlice";
import emailTemplateReducer from "./emailTemplateSlice";
import studentsWithoutGroupReducer from './studentWithoutGroupSlice';

import { groupReducer } from './groupSlice';
import groupDetailReducer from './groupDetailSlice';
import { randomGroupReducer } from "./randomGroupSlice";
import groupInviteReducer from "./groupInviteSlice";
import majorReducer from "./majorSlice";
import topicReducer from "./topicSlice";

import submissionRoundReducer from "./submissionRoundSlice";
import { mentorReducer } from './mentorSlice';
import councilReducer from "./councilSlice";
import topicStudentReducer from "./topicStudentSlice";
import uploadReducer from "./uploadSlice";
import meetingReducer from "./meetingSlice";
import topicGroupRegisterReducer  from './topicGroupRegisterSlice';
import councilReviewReducer from './councilReviewSlice'; 
import CouncilDefenseReducer from './councilDefenseSlice';
import decisionReducer from "./decisionSlice";
import uploadDecisionReducer from "./uploadDecisionSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  authSub: authSubReducer,

  // profileUser: profileUserReducer,
  years: yearReducer,
  semesters: semesterReducer,
  students: studentReducer,
  importStudents: importStudentReducer,
  importConditions: importConditionsReducer,
  sendEmail: sendMailReducer,
  emailTemplates: emailTemplateReducer,
  studentsWithoutGroup: studentsWithoutGroupReducer,
  // groupStudents: groupStudentReducer,
  groups: groupReducer,
  groupDetail:  groupDetailReducer,
  randomGroups: randomGroupReducer,
  groupInvite: groupInviteReducer,
  majors: majorReducer,
  topics: topicReducer,
  // topicRegister: topicRegisterReducer,
  submissionRounds: submissionRoundReducer,
  mentors: mentorReducer,
  councils: councilReducer,
  topicStudents: topicStudentReducer,
  upload: uploadReducer,
   uploadDecision: uploadDecisionReducer,
  // persist: persistedReducer,
  meetings: meetingReducer,
  topicGroupRegister: topicGroupRegisterReducer,
  councilReview: councilReviewReducer,
  councilDefense: CouncilDefenseReducer,
  decision: decisionReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
