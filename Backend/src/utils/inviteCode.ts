const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateInviteCode(length = 6): string {
  let code = "";

  for (let i = 0; i < length; i++) {
    code += CHARACTERS.charAt(
      Math.floor(Math.random() * CHARACTERS.length)
    );
  }

  return code;
}