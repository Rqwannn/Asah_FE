export class UserModel {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public skills: string[] = [],
    public discovers: string[] = [],
    public role?: string,
    public iat?: number,
    public exp?: number,
    public predicted_label?: string,
    public lime_visualization?: string,
    public confidence_visualization?: string,
  ) {}
}
