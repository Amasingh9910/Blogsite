import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Login successful, session created:", session);
      return session;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("Current user retrieved:", user);
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logout successful, all sessions deleted");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
