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
}
