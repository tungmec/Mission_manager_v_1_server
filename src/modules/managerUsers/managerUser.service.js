import {query} from '../../db/query.js';
import bcrypt from 'bcrypt';

// SERVICE FOR SUB USER DATA:
// Get all sub users by manager user id:
export const getAllSubUsersByManagerId = async (managerId) => {
    try {
        const {rows} = await query(
            `
                select  s.id,
                        s.manager_id,
                        s.user_name, 
                        s.user_type, 
                        s.create_at, 
                        s.active,
                        r.role_name as role
                from sub_users s                       
                join sub_user_roles r
                on s.user_role_id = r.id
                where s.manager_id = $1
            `
            ,[managerId]
        );

        return rows??null;

    } catch (err) {
        console.log("Database fault: Fail to load all sub_user by manager_user_id");
        console.log(err.message);
        return null;
    }
}

// create new sub uesr:

export const createSubUser = async(managerId, subUserName, password, roleId) => {
    try {

        const password_hash = await bcrypt.hash(password,10);

        const {rows} = await query(
            `
                insert into sub_users
                (manager_id, user_name, password_hash, user_role_id)
                values 
                ($1, $2, $3, $4)
                returning id, manager_id, user_name, user_type, user_role_id, create_at

            `
            ,[managerId, subUserName, password_hash, roleId]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to create new  sub_user ");
        console.log(err.message);
        return null;
    }
}



// SERVICE FOR SUB USER ROLE:
//  get sub_user_role of a manager user by role_name

export const getRoleOfManagerUserByRoleName = async (managerId, roleName) => {
    try {
        const {rows} = await query(
            `
                select *
                from sub_user_roles
                where manager_id = $1 and role_name = $2
            `
            ,[managerId, roleName]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to load sub_user_role by role_name");
        console.log(err.message);
        return null;
    }
}

//  get all sub user role of a manager user by manager ID :

export const getAllRoleOfManagerById = async (managerId) => {
    try {
        const {rows} = await query(
            `
                select *
                from sub_user_roles
                where manager_id = $1
            `
            ,[managerId]
        );

        return rows??null;
    } catch (err) {
        console.log("Database fault: Fail to load sub_user_role by manager id");
        console.log(err.message);
        return null;
    }
}

// create a role of sub user:

export const createSubUserRole = async (managerId, roleName, description) => {
    try {
        const {rows} = await query(
            `
                insert into sub_user_roles
                (manager_id, role_name, description)
                values
                ($1, $2, $3)
                returning *
            `
            ,[managerId, roleName, description]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to load sub_user_role by manager id");
        console.log(err.message);
        return null;
    }
}
// Change name of sub user role by id:
export const renameSubUserRoleById = async (roleId, newName) => {
    try {
        const {rows} = await query(
            `
                update sub_user_roles
                set role_name = $2
                where id=$1
                returning *
            `
            ,[roleId, newName]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to nename sub_user_role by id");
        console.log(err.message);
        return null;
    }
}
// Change description of sub user role by id:
export const changeDescriptionOfSubUserRoleById = async (roleId, newDescription) => {
    try {
        const {rows} = await query(
            `
                update sub_user_roles
                set description = $2
                where id=$1
                returning *
            `
            ,[roleId, newName]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to change description of sub_user_role by id");
        console.log(err.message);
        return null;
    }
}

// Delete role by id:
export const deleteRoleById = async(roleId) => {
    try {
        const {rows} = await query(
            `
                delete from sub_user_roles
                where id =$1
                returning *
            `
            ,[roleId]
        );

        return rows?.[0]??null;

    } catch (err) {
        console.log("Database fault: Fail to delete sub_user_role by id");
        console.log(err.message);
        return null;
    }

}


