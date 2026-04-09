// A robust Mock Database service simulating Firebase/Supabase NoSQL capabilities

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  createdAt: number;
}

export interface UserCareerState {
  userId: string;
  knownSkills: string[];
  aptitude: { logic: number; math: number; cs: number; problem_solving: number };
  xp: number;
  level: number;
  assessmentsCompleted: number;
  roadmapProgress: Record<string, boolean>; // mapping step ID to true
  lastRecommendedCareers: any[];
  updatedAt: number;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const MockDB = {
  // --- USERS ---
  async registerUser(name: string, email: string, pass: string, educationLevel: string): Promise<UserProfile> {
    await delay(600);
    const users = JSON.parse(localStorage.getItem('db_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }
    
    const newUser: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      educationLevel,
      createdAt: Date.now()
    };
    
    users.push({ ...newUser, pass }); // Store with pass in mock db only
    localStorage.setItem('db_users', JSON.stringify(users));
    
    // Initialize state
    const states = JSON.parse(localStorage.getItem('db_career_state') || '[]');
    states.push({
      userId: newUser.id,
      knownSkills: [],
      aptitude: { logic: 0, math: 0, cs: 0, problem_solving: 0 },
      xp: 0,
      level: 1,
      assessmentsCompleted: 0,
      roadmapProgress: {},
      lastRecommendedCareers: [],
      updatedAt: Date.now()
    } as UserCareerState);
    localStorage.setItem('db_career_state', JSON.stringify(states));

    localStorage.setItem('current_user_id', newUser.id);
    return newUser;
  },

  async loginUser(email: string, pass: string): Promise<UserProfile> {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('db_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.pass === pass);
    if (!user) throw new Error("Invalid credentials");
    
    localStorage.setItem('current_user_id', user.id);
    const { pass: _, ...profile } = user;
    return profile as UserProfile;
  },

  async logoutUser() {
    await delay(300);
    localStorage.removeItem('current_user_id');
  },

  getCurrentUser(): UserProfile | null {
    const id = localStorage.getItem('current_user_id');
    if (!id) return null;
    const users = JSON.parse(localStorage.getItem('db_users') || '[]');
    const user = users.find((u: any) => u.id === id);
    if (!user) return null;
    const { pass: _, ...profile } = user;
    return profile;
  },

  // --- STATE ---
  async getUserState(userId: string): Promise<UserCareerState | null> {
    await delay(200);
    const states = JSON.parse(localStorage.getItem('db_career_state') || '[]');
    return states.find((s: any) => s.userId === userId) || null;
  },

  async updateUserState(userId: string, partial: Partial<UserCareerState>): Promise<void> {
    await delay(300);
    const states = JSON.parse(localStorage.getItem('db_career_state') || '[]');
    const idx = states.findIndex((s: any) => s.userId === userId);
    if (idx !== -1) {
      states[idx] = { ...states[idx], ...partial, updatedAt: Date.now() };
      localStorage.setItem('db_career_state', JSON.stringify(states));
    }
  }
};
