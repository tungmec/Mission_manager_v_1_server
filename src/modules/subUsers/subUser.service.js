import {query} from '../../db/query.js';

// Sub User Profile API :

// get Profile by sub user Id:
export const getSubUserProfileByUserId = async (userId) => {
    
}

// create new sub user Profile:
export const createNewSubUserProfile = async (userId, firstName, lastName, email) => {
    try {
        const {rows} = await query(
            `
                insert into sub_user_profile
                (user_id, first_name, last_name, email)
                values
                ($1, $2, $3, $4)
                returning *
            `
            ,[userId, firstName, lastName, email]
        );
        
    } catch (err) {
        console.log("Database: Fail to create sub_user's Profile, detail: ", err.message);
        return null;
    }
}