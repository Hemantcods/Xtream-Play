import mongoose from "mongoose"

export const validateJoinTournament=(data:any):string|null=>{
    // validate the request body for joining a tournament
    const {tournamentId}=data
    // verify by mongoose
    if(!mongoose.Types.ObjectId.isValid(tournamentId)){
        return "Invalid tournament id"
    }
    if(!tournamentId) return "Tournament id is required"
    return null
    // todo add validation for userid 
}