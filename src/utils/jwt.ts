//src/utils/jwt.ts
export function parseJwt(
    token: string | null | undefined
  ): { username: string; role: "admin" | "user" } | null {
    if (!token) return null;
  
    try {
      let payload = token.split(".")[1];
      if (!payload) return null;
  
      // Base64URL → Base64 standard
      payload = payload.replace(/-/g, "+").replace(/_/g, "/");
      while (payload.length % 4 !== 0) payload += "=";
  
      const decoded = JSON.parse(atob(payload));
  
      if (!decoded.sub || !decoded.roles || !Array.isArray(decoded.roles)) return null;
  
      // Transformer le rôle backend en "admin" ou "user"
      const role = decoded.roles[0] === "ROLE_ADMIN" ? "admin" : "user";
  
      return { username: decoded.sub, role };
    } catch (err) {
      console.warn("Erreur parseJwt :", err);
      return null;
    }
  }
  
  