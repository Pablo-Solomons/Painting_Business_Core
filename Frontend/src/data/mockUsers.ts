export type UserRole = 'peintre' | 'admin'

export type DemoUser = {
  id: string
  email: string
  password: string
  name: string
  handle: string
  role: UserRole
}

export type DemoSession = {
  userId: string
  email: string
  name: string
  handle: string
  role: UserRole
}

export const DEMO_PASSWORD = 'demo'

export const demoUsers: DemoUser[] = [
  {
    id: 'marie',
    email: 'marie@artplastique.demo',
    password: DEMO_PASSWORD,
    name: 'Marie Durand',
    handle: 'marie.durand',
    role: 'peintre',
  },
  {
    id: 'admin',
    email: 'admin@artplastique.demo',
    password: DEMO_PASSWORD,
    name: 'Super Admin',
    handle: 'admin',
    role: 'admin',
  },
]

export function findDemoUser(email: string) {
  const normalized = email.trim().toLowerCase()
  return demoUsers.find((user) => user.email.toLowerCase() === normalized) ?? null
}

export function toSession(user: DemoUser): DemoSession {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    handle: user.handle,
    role: user.role,
  }
}

export function homePathForRole(role: UserRole) {
  return role === 'admin' ? '/admin' : '/dashboard/peintre'
}
