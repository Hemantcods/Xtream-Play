import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export enum Game {
    FREEFIRE = "freefire",
    BGMI = "bgmi",
    COD = "cod",
    OTHER = "other"
}

export enum PlayerMode {
    SOLO = "solo",
    DUO = "duo",
    SQUAD = "squad"
}

export interface ITournament extends Document{
    name:string,
    game: Game,
    entryFee:number,
    prizePool:number,
    mode:{
        map:string,
        player: PlayerMode,
        type:string
    }
    roomId?:string,
    roomPassword?:string,
    StartTime:Date,
    winner?:ObjectId,
    maxPlayers:number,
    createdBy?:ObjectId,
    PlacementPrize:{
        "first":number,
        "second":number,
        "third":number
    }
}

const TournamentSchema=new mongoose.Schema<ITournament>({
    name:{
        type:String,
        required:true
    },
    game:{
        type: String,
        enum: Object.values(Game),
        required:true
    },  
    entryFee:{
        type:Number,
        required:true,
        default:0
    },
    prizePool:{
        type:Number,
        required:true,
        default:0
    },
    mode:{
        map:{
            type:String,
            default:"Bermuda"
        },
        player:{
            type:String,
            enum: Object.values(PlayerMode),
            required:true
        },
        type:{
            type:String,
            required:true,
        }
    },
    roomId:{
        type:String,
        default:""
    },
    roomPassword:{
        type:String,
        default:""
    },
    StartTime:{
        type:Date,
        required:true
    },
    winner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    maxPlayers:{
        type:Number,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    PlacementPrize:{
        first:{
            type:Number,
            default:0
        },
        second:{
            type:Number,
            default:0
        },
        third:{
            type:Number,
            default:0
        }
    }
}, { timestamps: true })


export const Tournament=mongoose.model("Tournament",TournamentSchema)