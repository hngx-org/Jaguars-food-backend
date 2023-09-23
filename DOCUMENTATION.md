# Food App API(Team Jaguar)

## Introduction

This project is a backend API that's used to managed a person resource. 

baseURL = `to-be-added`

<br>

## Endpoints Summary

<br>

| Endpoint | Method | Headers | Data | Description |
| ------  | ------- | ------- | ------ | -------- |
| /api/v1/auth/user/sugnup | POST |  |**first_name**, **last_name**, **email**, **passwrod**, **phone_number**,  **organization_name**, **lunch_price**, **currency** and **currency_code**   | user signup as admin, creates organization simultaneously |
| /api/v1/organization/invite | POST| | **email** | send invite to user |
| /api/v1/auth/organization/staff/sugnup | POST | |**first_name**, **last_name**, **email**, **passwrod**, **phone_number**,  and **otp_token**   | user signup using invitation token |
| /api/v1/auth/login | POST | | **email** and **password** | Login to user account |
| /api/v1/user/profile | GET | Authorization: `Bearer <auth-token>` | |retrieve a user's details |
| /api/v1/user/profile | PUT | Authorization: `Bearer <auth-token>` | | update atleast one of user's **first_name**, **last_name** or **password**|
| /api/v1/user/bank | PATCH | Authorization: `Bearer <auth-token>` | **bankName**, **bankNumber**, **bankRegion** and **bankCode** | Update user's bank details |
| /api/v1/users | GET  | Authorization: `Bearer <auth-token>` | | get all users in your organization |
| /api/v1/search/{nameoremail} | GET | Authorization: `Bearer <auth-token>`  |  | Search for users by name or email |
| /api/v1/auth/forgot-password | POST | | **email**| request for password reset OTP |
| /api/v1/auth/resend-otp | POST | | **email** | request for password reset OTP |
| /api/v1/auth/reset-password | POST | | **email**, **password** and **otp_token** | update user password |



## Details

### Endpoints

#### /ap-/v1/auth/forgot-passord -  POST 

Use this endpoint to request for password reset otp code

#### Example usage

make a `post` request to `/api/v1/auth/forgot-passord`

#### Request body 

```sh
{
    "email": "user@example.com"
}
```

#### JSON Response - 200 CODE

```sh
{
  "message": "OTP sent to user email"
}
```
 
#### /ap-/v1/auth/resend-otp -  POST 

Use this endpoint to request for password reset otp code

#### Example usage

make a `post` request to `/api/v1/auth/resend-passord`

#### Request body 

```sh
{
    "email": "user@example.com"
}
```

#### JSON Response - 200 CODE

```sh
{
  "message": "OTP sent to user email"
}
```
 
#### /ap-/v1/auth/reset-passord -  POST 

Use this endpoint to request for password reset otp code

#### Example usage

make a `post` request to `/ap-/v1/auth/reset-passord`

#### Request body 

```sh
{
    "email": "user@example.com",
    "password": "1Password",
    "otp_token": "123456"
}
```

#### JSON Response - 200 CODE

```sh
{
  "message": "password updated successfully"
}
```
 