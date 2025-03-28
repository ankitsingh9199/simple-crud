import User from "../model/userModel.js";

export const create = async(req,res)=>{
    try {

        const userData = new User(req.body);
        

        if(!userData){
            return res.status(400).json({msg: "User data not found"})
        }

        const savedatga = await userData.save();
        res.status(200).json({msg:"Successfully Create Data"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req,res)=>{
    try {

        const alldata = await User.find();
        if(!alldata){
            return res.status(400).json({msg: "data not avaliable in database"})
        }

        res.status(200).json(alldata)
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getOne = async(req,res)=>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(400).json({msg: "single data not get by id "})
        }

        res.status(200).json(userExist)
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req,res)=>{
    try {
        const id = req.params.id;
        const UserExist = await User.findById(id);
        if(!UserExist){
            return res.status(400).json({msg:"user data not found"});
        }

        const UpdateData = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg:"Successfully Update Data"})

        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteuser = async (req, res)=>{
    try {

        const id = req.params.id;
        const UserExist = await User.findById(id);
        if(!UserExist){
            return res.status(400).json ({msg: "user not exist"});
        }    
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "user deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}