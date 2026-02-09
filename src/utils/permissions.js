export const SCOPES = {
  SYSTEM: "SYSTEM",
  ORG: "ORG",
  USER: "USER",
};

export function canViewTemplate(user, template) {
  return true; // everyone can view
}

export function canEditTemplate(user, template, activeOrg) {
  if (user.is_super_admin) return true;

  if (template.scope === SCOPES.ORG) {
    return template.org_id === activeOrg?.id && user.role === "ORG_ADMIN";
  }

  if (template.scope === SCOPES.USER) {
    return template.created_by === user.id;
  }

  return false; // SYSTEM templates non-super-admin
}

export function canCreateTemplate(user) {
  return user.is_super_admin || user.role === "ORG_ADMIN";
}
