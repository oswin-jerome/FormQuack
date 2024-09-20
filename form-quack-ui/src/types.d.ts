export interface Domain {
  id: number;
  domain: string;
  formCount: number;
  forms: Form[] & FormOverview[];
}

export interface Form {
  id: string;
  name: string;
  active: boolean;
  domain: Domain;
  forwardToEmail: boolean;
  sendAck: boolean;
  ackMessage: string;
  successMessage: string;
  emails: Email[];
}

export interface APIResponse<T> {
  data: T;
  err: string;
  ok: boolean;
}

export interface Submission {
  id: string;
  form: null;
  payload: Object;
}

export interface FormOverview extends Form {
  totalSubmissions: number;
  submissionsThisMonth: number;
  submissionsToday: number;
  active: boolean;
  submissionLimitPerForm: number;
}

export interface Email {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  formCount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  authorities: any[];
  domainLimit: number;
  formsLimit: number;
  username: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  plan: "BASIC" | "PRO" | "PRO_PLUS";

  submissionLimitPerForm: number;
}

export interface DashboardPayload {
  totalDomains: number;
  domainLimit: number;
  totalForms: number;
  formLimit: number;
  totalSubmissions: number;
  totalSubmissionsToday: number;
  totalSubmissionsThisMonth: number;
  popularForm: Form;
  emailsAdded: number;
  totalForwards: number;
  totalForwardsToday: number;
  totalForwardsThisMonth: number;
  totalFails: number;
  totalFailsToday: number;
  totalFailsThisMonth: number;
  totalAck: number;
  totalAckToday: number;
  totalAckThisMonth: number;
}
