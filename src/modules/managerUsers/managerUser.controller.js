import {getAllSubUsersByManagerId, getAllRoleOfManagerById, 
    changeDescriptionOfSubUserRoleById, renameSubUserRoleById, getRoleOfManagerUserByRoleName
    , createSubUser, createSubUserRole} from './managerUser.service.js';;


export const getAllSubBymanagerId = async (req, res, next) => {
    const managerId = (req.user.user_type="manager") ? req.user?.id??null : null;
    console.log("Manager Id when get all roles", managerId)
    if (! managerId) {
        return res.status(401).json({
            success: false,
            msg : "Manager user fault: User type wrong or no Id"
        })
    }

    try {
        const data = await getAllSubUsersByManagerId(managerId);
        if (!data) {
            return res.status(400).json({
                success: false,
                msg: "No data found"
            })
        }
        console.log("getok");
        return res.status(200).json({
            success: true,
            msg: `All sub users of manager user ${req.user.user_name}`,
            data: data
        })

    } catch (err) {
        return res.status(500).json({
            success:false,
            msg:`Server fault: ${err.message}`
        })
    }
}
// get all roles of manager user by Id:

export const getAllRoleByManagerId = async (req, res, next) => {
    const managerId = (req.user.user_type="manager") ? req.user?.id??null : null;
    if (! managerId) {
        return res.status(401).json({
            success: false,
            msg : "Manager user fault: User type wrong or no Id"
        })
    }

    try {
        const data = await getAllRoleOfManagerById(managerId);
        if (!data) {
            return res.status(400).json({
                success: false,
                msg: "No data found"
            })
        }

        return res.status(200).json({
            success: true,
            msg: `All roles of manager user ${req.user.user_name}`,
            data: data
        })


    } catch (err) {
         return res.status(500).json({
            success:false,
            msg:`Server fault: ${err.message}`
        })
    }
    
}

// create new SubUser:
export const createNewSubUser = async (req, res, next) => {
    const managerId = req.user.id;
    const {subUserName, password, roleId} = req.body;
    const data = await createSubUser(managerId, subUserName, password, roleId);
    if (!data) {
        console.log("Server: Fail to create new Sub User")
        return res.status(500).json({
            success: false,
            msg: "Fail to create subUser",
        })
    }

    return res.status(200).json({
        success:true,
        msg: "Create new Sub Uesr OK !",
        data: data
    })
}

// create new sub user role:

export const createNewRole = async (req, res, next) => {
    const managerId = req.user.id;
    const {roleName, description} = req.body;

    const data = await createSubUserRole(managerId, roleName, description);

    if (!data) {
        console.log("Server: Fail to create new sub user role !");
        return res.status(500).json({
            success:false,
            msg:"Fail to create new sub user role"
        })

    }

    return res.status(200).json(
        {
            success:true,
            msg: "Create new user role OK",
            data: data
        }
    );

}