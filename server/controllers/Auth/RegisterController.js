import db from "../../utils/db.js";
import bcrypt from "bcryptjs";
//register user
export const Register = async (req,res) => {
    const {role,name,email,password} = req.body

    try {
        //check for missing fields
        if(!role || !name || !email || !password){
            return res.status(400).json({
                status:"error",
                message:"Please fill all the fields"
            })

        }

         //check if user already exist
            const userExist = await db.query(`
                SELECT * FROM users WHERE email =$1
                `,[email])

                if(userExist.rows.length > 0){
                    return res.status(400).json({
                        status:"error",
                        message:"User already exists"
                    })
                }

                //get the role id

                const roleResult = await db.query(`
                    SELECT id FROM roles WHERE name =$1`,[role])

                    if( roleResult.rows.length === 0 ) {
                        return res.status(400).json({
                            status:"error",
                            message:"Invalid role"
                        })
                    }
                    const role_id = roleResult.rows[0].id

                    //hash password
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password,salt)

                    //insert new user

                    const newUser = await db.query (`
                        INSERT INTO users (name,password,email,role_id) VALUES ($1, $2,$3,$4) RETURNING *`,
                    [name,hashedPassword,email,role_id])

                    res.status(200).json({
                        status:"success",
                        message:"Successful Created a user",
                        data:newUser.rows[0],
                    })
    } catch (error) {
        console.log("Failed to register user ",error)
        res.status(500).json({
            status:"error",
            message:"Error when creating an account"
        })
    }
}

//login user
export const loginUser = async(req,res) => {
    const {email,password} = req.body
    
    try {
        //check if  user exist
       const userExist = await db.query(`
  SELECT users.user_id, users.name, users.email, users.password, roles.name AS role
  FROM users
  JOIN roles ON users.role_id = roles.id
  WHERE users.email = $1
`, [email]);

        if (userExist.rows.length === 0) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
        }
   const user = userExist.rows[0]

   //compare password
   const isMatch = await bcrypt.compare(password,user.password)

     if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

     // 4. Respond with user info (omit password)
    const { password: _, ...userInfo } = user;

           res.status(200).json({
      status: "success",
      message: "Login successful",
      user: userInfo,
    });
    } catch (error) {
         console.log("Failed to login user ",error)
        res.status(500).json({
            status:"error",
            message:"Error when logging in user"
        })
    }
}