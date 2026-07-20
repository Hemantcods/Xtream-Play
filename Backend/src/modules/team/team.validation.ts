import mongoose from "mongoose";
import z, { invertCodec } from "zod";

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
    .min(2, "IGN is rquired")
    .max(30, "IGN is too long"),
  uid: z.string().trim().min(5, "uid is too short").max(30, "uid is too long"),
});
export type JoinTeamBodySchemaDto = z.infer<typeof JoinTeamBodySchema>;

export const KickMeberSchema = z.object({
  tournamentId: ObjectIdSchema,
  memberId:ObjectIdSchema,
})
export type RemoveMeberSchemaDtp=z.infer<typeof KickMeberSchema>