import { User } from "./user.model.js"

export const LeaderBoardService=async()=>{
    const users=await User.find()
    .select('name totalPoints totalEarnings totalWins')
    .sort({totalPoints:-1})
    .limit(100)
    .lean()

    return users.map((user,index)=>({
        rank:index+1,
        ...user
    }))
}