/**
 * A compact, flat representation of {CognitoIdentityServiceProvider.AuthEventType}
 */
interface IAuthEvent {
  id?: string;
  type?: string;
  creationDate?: string;
  response?: string;
  riskDecision?: string;
  ipAddress?: string;
  deviceName?: string;
  city?: string;
  country?: string;
}

interface IAccessHistoryData {
  authEvents: IAuthEvent[];
  nextToken?: string;
}

interface IAccessHistoryQuery {
  authEvents: IAccessHistoryData;
}
