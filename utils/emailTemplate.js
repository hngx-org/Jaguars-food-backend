const getInviteTemplate = (otp, organization, subject) => {
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
              You have been invited by ${organization} to join it's organization on Free Lunch App.
              <br/>Use the token below to create your account..
            </p>
            <p class="center">${otp}</p>
          </div>
        </div>
      </div>
    </div>
  </html>
  `;
};

const getOtpTemplate = (otp, organization, subject) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <div
        style="
          @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;1,700&display=swap');
          padding-top: 24px;
        "
      >
        <div
          style="
            margin: 0 auto;
            padding-top: 24px;
            padding-bottom: 24px;
            max-width: 600px;
            padding: 0;
            font-family: 'Nunito', sans-serif;
            font-weight: 400;
            margin-bottom: 12px;
          "
        >
          <h1
            style="
              font-style: italic;
              font-weight: 700;
              padding: 0;
              margin: 0;
              font-family: 'Nunito', sans-serif;
              font-weight: 400;
              margin-bottom: 12px;
            "
          >
            ${organization}
          </h1>
          <h2>${subject}</h2>
          <p style="padding: 0; margin: 0; font-weight: 400; margin-bottom: 12px; line-height: 24px;">
            You are getting this mail because you requested for a password reset.
            <br />Use the token below to verify you password reset your account..
          </p>
          <!--<p>
            <a
              style="
                padding: 4px 16px;
                display: inline-block;
                background-color: #571fcd;
                color: #ffffff;
                font-size: 24px;
                text-decoration: none;
              "
              href="/api/v1/auth/reset-password?token=${otp}"
              target="_blank"
              >Click here</a
            >
          </p>-->
  
          <p>Or you can copy this code to your app</p>
          <p>${String(otp)}</p>
        </div>
      </div>
    </body>
  </html>
  `
};

module.exports = { getInviteTemplate, getOtpTemplate };
