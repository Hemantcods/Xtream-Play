import mongoose from "mongoose";
import z from "zod";

export const ObjectIdSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId",
  });
export const GetTournamentTeamParamsSchema = z.object({
  tournamentId: ObjectIdSchema,
});
export type GetTournamentTeamParamsSchemaDto = z.infer<
  typeof GetTournamentTeamParamsSchema
>;

export const JoinTeamBodySchema = z.object({
  inviteCode: z.string().trim().length(6, "Invalid Invite code"),
  inGameName: z
    .string()
    .trim()
    .min(2, "IGN is required")
    .max(30, "IGN is too long"),
  uid: z.string().trim().min(5, "uid is too short").max(30, "uid is too long"),
});
export type JoinTeamBodySchemaDto = z.infer<typeof JoinTeamBodySchema>;

export const KickMeberSchema = z.object({
  tournamentId: ObjectIdSchema,
  memberId: ObjectIdSchema,
});
export type RemoveMeberSchemaDtp = z.infer<typeof KickMeberSchema>;

export const LeaveMemberSchema = z.object({
  tournamentId: ObjectIdSchema,
});
export const updateTeamProfileSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(3, "TeamName must be at least 3 characters")
    .max(30, "Team name cannot exceed 30 characters")
    .optional(),
  inGameName: z
    .string()
    .trim()
    .min(2, "IGN is required")
    .max(30, "IGN is too long").optional(),
  uid: z.string().trim().min(5, "uid is too short").max(30, "uid is too long").optional(),
}).refine((data)=>data.teamName !==undefined ||  data.inGameName !== undefined ||
  data.uid !== undefined ,{error:"Atleast one field must be provided"}
)
export type UpdateTeamProfileDto = z.infer<
  typeof updateTeamProfileSchema
>;