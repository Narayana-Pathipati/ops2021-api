const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;


const TuitionFeePaidSchema = new Schema(
    {
        //_id : Schema.Types.ObjectId,
        PaidFor : String,
        Amount : Number,
        PayMode : String, 
        ChequeNo : String,
        ChequeDate : Date,
        Remarks : String,
        Term : Number,
        TransId : String,
        ClearedOn : Date,
        Date : {
            type : Date,
            default : Date.now
        },
        IsBatchCreated : {
            type : Boolean,
            default : false
        }
    }
)

const VanFeePaidSchema = new Schema({
    //_id : Schema.Types.ObjectId,
    PaidFor : String,
    Amount : Number,
    PayMode : String,
    Date : {
        type : Date,
        default : Date.now
    },
    ChequeNo : String,
    ChequeDate : Date,
    Remarks : String,
    Month : [String],
    TransId : String,
    ClearedOn : Date,
    IsBatchCreated : {
        type : Boolean,
        default : false
    }
    });

    const AccessoriesFeePaidSchema = new Schema({
        _id : Schema.Types.ObjectId,
        Amount : Number,
        PayMode : String,
        Date : {
            type : Date,
            default : Date.now
        },
        ChequeNo : String,
        ChequeDate : Date,
        Remarks : String,
        TransId : String,
        ClearedOn : Date
    });


const StudentSchema = Schema({
    /* _id : Schema.Types.ObjectId, */
    Name : String,
    ClassId : {
        type : Schema.Types.ObjectId,
        ref : 'Class'
    },
    AdmNo : {
        type : Number,
        unique : true
    },
    Gender : String,
    DOB : Date,
    DOA : {
        type : Date,
        default : Date.now
    },
    BloodGroup : {
        type : String
    },
    Concession : Number,
    Address : {
        DrNo : String,
        Street : String,
        VillageCity : String,
        District : String,
        Pincode : String
    },
    FatherName : String,
    MotherName : String,
    ContactNo1 : String,
    ContactNo2 : String,
    AadharNo : String,
    EmisNo : String,
    VanId : {
        type : Number,
        default : 0,
        ref : "Van"
    },
    VanNo : {
        type : Number,
        default : 0
    },
    IsVanStudent : {
        type : Boolean,
        default : false
    },
    Coord : {
        lat : String,
        lon : String
    },
    Distance : Number,
    //VanFee : Number,
    IsLateAdmission :{
        type : Boolean,
        default : false
    },
    Fee : {   
        Term1 : Number,
        Term2 : Number,
        Term3 : Number,
        Term1Paid : {
            type : Number,
            default : 0
        },
        Term2Paid : {
            type : Number,
            default : 0,
        },
        Term3Paid : {
            type : Number,
            default : 0
        },

        AccessoriesFee : Number,
        VanFee : {
            TotalMonths : Number,
            IsInterior : {
                type : Boolean,
                default : false
            },
            InteriorFee : {
                type : Number,               
                default : function() {
                    if(this.IsInterior && this.IsVanStudent){
                        return 300;
                    }
                    else
                    {
                        return 0;
                    }
                }           
                
            },
            Term1 : {
                APR : Number,
                AprPaid : Number,
                MAY : Number,
                MayPaid : Number,
                JUN : Number,
                JunPaid : Number
            },
            Term2 : {
                JUL : Number,
                JulPaid : Number,
                AUG : Number,
                AugPaid : Number,
                SEP : Number,
                SepPaid : Number
            },
            Term3 : {
                OCT : Number,
                OctPaid : Number,
                NOV : Number,
                NovPaid : Number,
                DEC : Number,
                DecPaid : Number
            },
            Term4 : {
                JAN : Number,
                JanPaid : Number,
                FEB : Number,
                FebPaid : Number,
                MAR : Number,
                MarPaid : Number
            },

            MonthlyFee : {
                type : Number,
                default : function() {
                    if(this.IsVanStudent)
                    {
                    if(this.IsInterior)
                    {
                        if(this.Distance <= 2){
                            return (600 + this.InteriorFee);
                            }else if(this.Distance > 2 && this.Distance <=4)
                            {
                                return (800 + this.InteriorFee);
                            }else if(this.Distance > 4 && this.Distance <=6)
                            {
                                return (1000 + this.InteriorFee);
                            }else if(this.Distance > 6 && this.Distance <= 8)
                            {
                                return (1200 + this.InteriorFee);
                            }else if(this.Distance > 8)
                            {
                                return (1300 + this.InteriorFee);
                            }
                    }else
                    {
                        if(this.Distance <= 2){
                            return 600;
                            }else if(this.Distance > 2 && this.Distance <=4)
                            {
                                return 800;
                            }else if(this.Distance > 4 && this.Distance <=6)
                            {
                                return 1000;
                            }else if(this.Distance > 6 && this.Distance <= 8)
                            {
                                return 1200;
                            }else if(this.Distance > 8)
                            {
                                return 1300;
                            }
                    }
                }
                else
                {
                    return 0;
                }
             }
            },
            Total : {
                type : Number,
                default : function(){
                    if(this.IsVanStudent)
                    {
                    return this.TotalMonths * this.MonthlyFee;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }
    },
    TuitionFeePaid : [TuitionFeePaidSchema],
    VanFeePaid : [VanFeePaidSchema],
    AccessoriesFeePaid : [AccessoriesFeePaidSchema],
    IsActive : {
        type : Boolean,
        default : true
    }
});


StudentSchema.plugin(autoIncrement.plugin, { model: 'Student', field: 'id', startAt: 100, unique:false, incrementBy: 1 });
TuitionFeePaidSchema.plugin(autoIncrement.plugin, {model : 'TuitionFeePaid', field : 'id',unique:false, startAt : 1, incrementBy : 1});
VanFeePaidSchema.plugin(autoIncrement.plugin, {model : 'VanFeePaid', field : 'id', unique : false, startAt : 1, incrementBy : 1});
AccessoriesFeePaidSchema.plugin(autoIncrement.plugin, {model : 'AccessoriesFeePaid', field : 'id', unique:false, startAt : 1, incrementBy : 1});

StudentSchema.index( { Name: "text", AdmNo: "text", VanId : "text" }, { sparse: true } );

module.exports = mongoose.model("Student", StudentSchema);
