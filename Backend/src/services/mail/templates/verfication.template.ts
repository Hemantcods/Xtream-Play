export const verificationTemplate = (name: string, otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body
  style="
    margin:0;
    padding:40px 20px;
    background:#f4f6f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

  <table
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:40px;"
  >

    <tr>
      <td align="center">

        <h1
          style="
            margin:0;
            color:#2563eb;
            font-size:28px;
          "
        >
          Xtream Play
        </h1>

        <p
          style="
            color:#6b7280;
            margin-top:8px;
            margin-bottom:32px;
          "
        >
          Email Verification
        </p>

      </td>
    </tr>

    <tr>
      <td>

        <p style="font-size:16px;">
          Hello <strong>${name}</strong>,
        </p>

        <p style="font-size:16px;line-height:1.7;">
          Welcome to <strong>Xtream Play</strong>.
          Please use the verification code below to complete your registration.
        </p>

      </td>
    </tr>

    <tr>
      <td align="center" style="padding:30px 0;">

        <div
          style="
            display:inline-block;
            background:#f3f4f6;
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:18px 40px;
            font-size:34px;
            font-weight:bold;
            letter-spacing:10px;
            color:#111827;
          "
        >
          ${otp}
        </div>

      </td>
    </tr>

    <tr>
      <td>

        <p
          style="
            text-align:center;
            font-size:15px;
            color:#6b7280;
          "
        >
          This verification code is valid for
          <strong>5 minutes</strong>.
        </p>

        <p
          style="
            background:#fff7ed;
            border-left:4px solid #f59e0b;
            padding:14px;
            margin-top:30px;
            font-size:14px;
            color:#92400e;
          "
        >
          Never share this code with anyone. Xtream Play will never ask you
          for your verification code.
        </p>

      </td>
    </tr>

    <tr>
      <td>

        <hr
          style="
            margin:35px 0;
            border:none;
            border-top:1px solid #e5e7eb;
          "
        />

        <p
          style="
            color:#6b7280;
            font-size:14px;
            line-height:1.6;
          "
        >
          If you didn't create an account, you can safely ignore this email.
        </p>

        <p
          style="
            margin-top:30px;
            font-size:14px;
            color:#6b7280;
          "
        >
          Thanks,<br />
          <strong>Xtream Play Team</strong>
        </p>

      </td>
    </tr>

  </table>

</body>
</html>
`;
