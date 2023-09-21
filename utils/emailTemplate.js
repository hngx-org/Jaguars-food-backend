export const getInviteTemplate = (otp, subject = "Invitetion to ") => {
  return `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;1,700&display=swap");
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          font-family: "Nunito", sans-serif;
          font-weight: 400;
          margin-bottom: 0.75rem;
        }
        .body {
          width: 100%;
          min-height: 100dvh;
          background-color: #f1f1f1;
        }
        h1 {
          font-style: italic;
          font-weight: 700;
        }
        .center {
          text-align: center;
          font-size: 1.5rem;
        }
        .container {
          width: 96%;
          margin: 0 auto;
          padding-top: 1rem;
          padding-bottom: 1rem;
          max-width: 600px;
        }
        .container > div {
          background-color: white;
          padding: 1.75rem;
        }
      </style>
    </head>
    <body>
      <div class="body">
        <div class="container">
          <h1>Official Port</h1>
          <div>
            <h2>${subject}</h2>
            <p>
              You are receiving this email because a request was made for a
              one-time code that can be used for authentication.
            </p>
            <p>Please enter the following code for verification:</p>
            <p class="center">${otp}</p>
            <p>
              If you did not request this change, please change your password.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};
