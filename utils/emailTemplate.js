export const getInviteTemplate = (otp, organization, subject) => {
  return `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;1,700&display=swap");
        div,h1,p {
          padding: 0;
          margin: 0;
          font-family: "Nunito", sans-serif;
          font-weight: 400;
          margin-bottom: 12px;
        }
        .body {
          width: 100%;
          height: 100%;
          background-color: #f1f1f1;
        }
        h1 {
          font-style: italic;
          font-weight: 700;
        }
        .center {
          text-align: center;
          font-size: 24px;
        }
        .container {
          width: 96%;
          margin: 0 auto;
          padding-top: 24px;
          padding-bottom: 24px;
          max-width: 600px;
        }
        .child {
          background-color: white;
          padding: 28px;
        }
      </style>
    </head>
    <div>
      <div class="body">
        <div class="container">
          <h1>${organization}</h1>
          <div class='child'>
            <h2>${subject}</h2>
            <p>
              You are receiving this email because you invited to join ${organization}.
            </p>
            <p>Please enter the following code for verification:</p>
            <p class="center">${otp}</p>
           
          </div>
        </div>
      </div>
    </div>
  </html>
  `;
};
