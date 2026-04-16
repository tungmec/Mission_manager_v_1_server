import {query} from '../../db/query.js';


// Function to get main user by name:

export const getMainUserByName = async (userName) => {
    try {
        const {rows} = await query(
            `
                select *
                from manager_users
                where user_name = $1
            `
        ,[userName]);

        return rows?.[0]??null;

    } catch(e) {
        console.log("Database fault: Fail to load main user from database by name");
        console.log(e.message);
        return null;
    }
}

// Function to get all main users from database:
export const getAllMainUser = async () => {
    try {
        const {rows} = await query(
        `
            select *
            from manager_users
        `
        ,[]);

        return rows??null;
    } catch (e) {
        console.log("No data loaded");
        console.log(e.message);
        return null;
    }
}


//  Function to create new main user:
export const createNewMainUser = async (userName, passwordHash) => {

    try {
       
        const {rows} = await query(
        `
            insert into manager_users
            (user_name, password_hash)
            values 
            ($1, $2)
            returning user_name, user_type, create_at
        `
        ,[userName, passwordHash]);

        return rows?.[0]??null;

    } catch (e) {
        console.log("Database fault: Fail to insert new main user to database");
        console.log(e.message);
        return null;
    }
   
}