export class AuthViewModel {
  static fromLoginResult({ token, role }) {
    return {
      token,
      role
    };
  }
}
