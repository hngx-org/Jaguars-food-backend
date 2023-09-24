<<<<<<< HEAD
import jwt from 'jsonwebtoken';

let JWT_SECRET = process.env.JWT_SECRET || 'JAGUARJAGUARJAGUAR';

// GetToken
export const getToken = (otp) => {
    return new Promise((accept, reject) => {
        jwt.sign({ otp } , JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                accept(token);
            }
        });
    });
};

// Verify token
// export const verifyToken = (token) => {
//     return new Promise((accept, reject) => {
//         jwt.verify(token, JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 // console.log("Data", decoded.email);
//                 accept(decoded);
//             }
//         });
//     });
// };



export const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(decodedToken){
        return(decodedToken)
    }else{
        return
    } 
    };
=======
const jwt = require('jsonwebtoken');

let JWT_SECRET = process.env.JWT_SECRET || 'JAGUARJAGUARJAGUAR';

//GetToken
const getToken = (data, duration = '1d') => {
	return new Promise((accept, reject) => {
		jwt.sign(data, JWT_SECRET, { expiresIn: duration }, (err, token) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				accept(token);
			}
		});
	});
};

//Verifytoken
const verifyToken = (token) => {
	return new Promise((accept, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				// console.log("Data", decoded.email);
				accept(decoded);
			}
		});
	});
};

module.exports = { getToken, verifyToken };
>>>>>>> develop
