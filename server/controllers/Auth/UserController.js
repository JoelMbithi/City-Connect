import db from '../../utils/db.js'

//get single user
export const getSingleUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await db.query(
      `SELECT * FROM users WHERE user_id = $1`, [user_id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User does not exist",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved user",
      user: user.rows[0], 
    });
  } catch (error) {
    console.error("Failed to retrieve user:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while retrieving user",
    });
  }
};

//get all users
export const allUsers = async (req,res)  => {
    try {
      const allUsers = await db.query(
        `SELECT * FROM users `
      )
      res.status(200).json({
        status:"success",
        message:"Successful retrieved all users",
        data:allUsers.rows
      })
    } catch (error) {
        console.log("Failed to retrieve users ")
        res.status(500).json({
      status: "error",
      message: "Error when retrieving all users",
   
    });
    }
}

//update user
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { user_id } = req.params;

  try {
    // Hash password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await db.query(
      `UPDATE users 
       SET name = $1, email = $2, password = $3 
       WHERE user_id = $4 
       RETURNING user_id, name, email, role_id, created_at`,
      [name, email, hashedPassword, user_id]
    );

    res.status(200).json({
      status: "success",
      message: "Successfully updated user",
      data: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating user",
    });
  }
};


//delete user 
export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userExist = await db.query(
      `SELECT * FROM users WHERE user_id = $1`, [user_id]
    );

    if (userExist.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User does not exist",
      });
    }

    const deletedUser = await db.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *`,
      [user_id]
    );

    res.status(200).json({
      status: "success",
      message: "Successfully deleted user",
      data: deletedUser.rows[0],
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while deleting user",
    });
  }
};
