export function isSuperAdmin(user) {
  return user?.is_super_admin === true;
}

export function isOrgAdmin(activeOrg) {
  if (!activeOrg) return false;
  return activeOrg.roles?.includes("ADMIN");
}

export function canCreateTemplate(user, activeOrg) {
  if (isSuperAdmin(user)) return true;
  if (isOrgAdmin(activeOrg)) return true;
  return false;
}

export function canEditTemplate(user, activeOrg, template) {
  if (isSuperAdmin(user)) {
    return template.scope_type === "SYSTEM";
  }

  if (isOrgAdmin(activeOrg)) {
    return ["ORG", "ROLE", "USER"].includes(template.scope_type);
  }

  return false;
}
