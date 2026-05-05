export const validateCreateTournament=(data:any):string|null=>{
    const {name,game,entryFee,prizePool,mode,StartTime,maxPlayers}=data
    if(!name) return "Name is required"
    if(!game) return "Game is required"
    // entry fee can be 0 but it should be provided
    if(!entryFee ) return "Entry fee is required"
    // prize pool can be 0 but it should be provided
    if(!prizePool) return "Prize pool is required"
    if(!mode) return "Mode is required"
    if(!mode.player) return "Player mode is required"
    if(!mode.type) return "Tournament type is required"
    if(!StartTime) return "Start time is required"
    if(!maxPlayers) return "Max players is required"
    return null
}
export const validateStartTournament=(data:any):string|null=>{
    const {roomId,roomPassword}=data
    if(!roomId) return "Room id is required"
    if(!roomPassword) return "Room password is required"
    return null
}