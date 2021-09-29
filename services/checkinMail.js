const nodemailer = require("nodemailer");
const JSJoda = require("js-joda");
const getCheckoutDate = require("../utils/getCheckoutDate");
let LocalDate = JSJoda.LocalDate;

module.exports = function (userEmail, booking) {
  let guests = 0;
  booking.roomFinalDetails.map(data => {
    guests += Number(data.adults);
    guests += Number(data.children);
  });

  totalPrice = 0;
  totalBeds = 0;
  totalRooms = 0;
  for (let [key, value] of Object.entries(booking.roomDetails)) {
    let objectValues = [];
    for (const [key1, value1] of Object.entries(value)) {
      objectValues.push(value1);
    }
    totalPrice += objectValues[0] * objectValues[1];
    totalBeds += objectValues[0] * objectValues[2];
    totalRooms += objectValues[0];
  }

  booking.startingDayOfStay = new Date(booking.startingDayOfStay).toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  booking.endingDayOfStay = new Date(getCheckoutDate(booking.endingDayOfStay)).toLocaleString(
    "en-us",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: userEmail,
    subject: "Booking Confirmation",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New message</title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 10px 30px 10px 30px !important;
      }
      @media only screen and (max-device-width: 600px) {
        .es-content table,
        .es-header table,
        .es-footer table {
          width: 100% !important;
          max-width: 600px !important;
        }
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120% !important;
        }
        h1 {
          font-size: 36px !important;
          text-align: center;
        }
        h2 {
          font-size: 26px !important;
          text-align: center;
        }
        h3 {
          font-size: 20px !important;
          text-align: center;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 36px !important;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 26px !important;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: inline-block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 20px !important;
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0 !important;
        }
        .es-m-p0r {
          padding-right: 0 !important;
        }
        .es-m-p0l {
          padding-left: 0 !important;
        }
        .es-m-p0t {
          padding-top: 0 !important;
        }
        .es-m-p0b {
          padding-bottom: 0 !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        table.es-social {
          display: inline-block !important;
        }
        table.es-social td {
          display: inline-block !important;
        }
        .es-m-p5 {
          padding: 5px !important;
        }
        .es-m-p5t {
          padding-top: 5px !important;
        }
        .es-m-p5b {
          padding-bottom: 5px !important;
        }
        .es-m-p5r {
          padding-right: 5px !important;
        }
        .es-m-p5l {
          padding-left: 5px !important;
        }
        .es-m-p10 {
          padding: 10px !important;
        }
        .es-m-p10t {
          padding-top: 10px !important;
        }
        .es-m-p10b {
          padding-bottom: 10px !important;
        }
        .es-m-p10r {
          padding-right: 10px !important;
        }
        .es-m-p10l {
          padding-left: 10px !important;
        }
        .es-m-p15 {
          padding: 15px !important;
        }
        .es-m-p15t {
          padding-top: 15px !important;
        }
        .es-m-p15b {
          padding-bottom: 15px !important;
        }
        .es-m-p15r {
          padding-right: 15px !important;
        }
        .es-m-p15l {
          padding-left: 15px !important;
        }
        .es-m-p20 {
          padding: 20px !important;
        }
        .es-m-p20t {
          padding-top: 20px !important;
        }
        .es-m-p20r {
          padding-right: 20px !important;
        }
        .es-m-p20l {
          padding-left: 20px !important;
        }
        .es-m-p25 {
          padding: 25px !important;
        }
        .es-m-p25t {
          padding-top: 25px !important;
        }
        .es-m-p25b {
          padding-bottom: 25px !important;
        }
        .es-m-p25r {
          padding-right: 25px !important;
        }
        .es-m-p25l {
          padding-left: 25px !important;
        }
        .es-m-p30 {
          padding: 30px !important;
        }
        .es-m-p30t {
          padding-top: 30px !important;
        }
        .es-m-p30b {
          padding-bottom: 30px !important;
        }
        .es-m-p30r {
          padding-right: 30px !important;
        }
        .es-m-p30l {
          padding-left: 30px !important;
        }
        .es-m-p35 {
          padding: 35px !important;
        }
        .es-m-p35t {
          padding-top: 35px !important;
        }
        .es-m-p35b {
          padding-bottom: 35px !important;
        }
        .es-m-p35r {
          padding-right: 35px !important;
        }
        .es-m-p35l {
          padding-left: 35px !important;
        }
        .es-m-p40 {
          padding: 40px !important;
        }
        .es-m-p40t {
          padding-top: 40px !important;
        }
        .es-m-p40b {
          padding-bottom: 40px !important;
        }
        .es-m-p40r {
          padding-right: 40px !important;
        }
        .es-m-p40l {
          padding-left: 40px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #fafafa">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#efefef"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: left top;
          background-color: #fafafa;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-header"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-header-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #fef5e4;
                      width: 750px;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#fef5e4"
                    align="center"
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 5px;
                          padding-bottom: 5px;
                          padding-left: 10px;
                          padding-right: 15px;
                        "
                      >
                        <!--[if mso]><table style="width:725px" cellpadding="0" cellspacing="0"><tr><td style="width:199px" valign="top"><![endif]-->
                        <table
                          class="es-left"
                          cellspacing="0"
                          cellpadding="0"
                          align="left"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: left;
                          "
                        >
                          <tr>
                            <td
                              class="es-m-p0r"
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 199px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td align="center" style="padding: 0; margin: 0; font-size: 0px">
                                    <img
                                      class="adapt-img"
                                      src="https://lqcdfn.stripocdn.email/content/guids/CABINET_1374df08c14cd7d7b7b1369a74bf2cf2/images/62891630911721920.png"
                                      alt
                                      style="
                                        display: block;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        -ms-interpolation-mode: bicubic;
                                      "
                                      width="194.977"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td><td style="width:0px"></td><td style="width:526px" valign="top"><![endif]-->
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          align="right"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td align="left" style="padding: 0; margin: 0; width: 526px">
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                      padding-left: 35px;
                                    "
                                  >
                                    <table
                                      border="0"
                                      class="es-table cke_show_border"
                                      align="right"
                                      cellspacing="1"
                                      cellpadding="1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        width: 50%;
                                      "
                                      role="presentation"
                                    >
                                      <tr>
                                        </td>
                                      </tr>
                                    </table>
                                    <br /><br />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 750px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 5px;
                          padding-bottom: 5px;
                          padding-left: 10px;
                          padding-right: 10px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 730px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-bottom: 5px;
                                      padding-top: 20px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        line-height: 36px;
                                        mso-line-height-rule: exactly;
                                        font-family: 'trebuchet ms', 'lucida grande',
                                          'lucida sans unicode', 'lucida sans', tahoma, sans-serif;
                                        font-size: 30px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #333333;
                                      "
                                    >
                                      You are Successfully Checked-In!
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-content-body"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                    align="center"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 750px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-bottom: 30px;
                        "
                      >
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td align="left" style="padding: 0; margin: 0; width: 710px">
                              <table
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  border-top: 1px solid #efefef;
                                  border-bottom: 1px solid #efefef;
                                  background-color: #fef9ef;
                                "
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                bgcolor="#fef9ef"
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-top: 20px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <h4
                                      style="
                                        margin: 0;
                                        line-height: 120%;
                                        mso-line-height-rule: exactly;
                                        font-family: 'trebuchet ms', 'lucida grande',
                                          'lucida sans unicode', 'lucida sans', tahoma, sans-serif;
                                      "
                                    >
                                      SUMMARY:
                                    </h4>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-left: 15px;
                                      padding-right: 40px;
                                    "
                                  >
                                    <table
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        width: 100%;
                                      "
                                      class="cke_show_border"
                                      cellspacing="1"
                                      cellpadding="1"
                                      border="0"
                                      align="left"
                                      role="presentation"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          Checked-In:
                                        </td>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          ${booking.startingDayOfStay}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          Checked-In:
                                        </td>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          ${booking.endingDayOfStay}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          Total Rooms:
                                        </td>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          ${totalRooms}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          Guests:
                                        </td>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 14px;
                                            line-height: 21px;
                                          "
                                        >
                                          ${guests}
                                        </td>
                                      </tr>
                                    </table>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 21px;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      <br />
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-footer-body"
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    bgcolor="#fef5e4"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #fef5e4;
                      width: 750px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 5px;
                          padding-bottom: 5px;
                          padding-left: 10px;
                          padding-right: 10px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 730px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-top: 20px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <h4
                                      style="
                                        margin: 0;
                                        line-height: 120%;
                                        mso-line-height-rule: exactly;
                                        font-family: 'trebuchet ms', 'lucida grande',
                                          'lucida sans unicode', 'lucida sans', tahoma, sans-serif;
                                      "
                                    >
                                      Rooms:
                                    </h4>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                    "
                                  >
                                    ${booking.roomFinalDetails.map(
                                      details => `<table
                                        border="0"
                                        class="es-table cke_show_border"
                                        cellspacing="1"
                                        cellpadding="1"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                          width: 400px;
                                        "
                                        role="presentation"
                                      >
                                        <tr>
                                          <td style="padding: 0; margin: 0; font-size: 13px">
                                            Room&nbsp;Number&nbsp;:&nbsp;
                                          </td>
                                          <td style="padding: 0; margin: 0; font-size: 13px">${
                                            details.roomNumber
                                          }</td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 0; margin: 0; font-size: 13px">
                                            Guests
                                          </td>
                                          <td style="padding: 0; margin: 0; font-size: 13px">${
                                            Number(details.adults) + Number(details.children)
                                          }</td>
                                        </tr>
                                      </table>`
                                    )}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <!--[if mso]><table style="width:710px" cellpadding="0" cellspacing="0"><tr><td style="width:253px" valign="top"><![endif]-->
                        <table
                          class="es-left"
                          cellspacing="0"
                          cellpadding="0"
                          align="left"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: left;
                          "
                        >
                          <tr>
                            <td
                              class="es-m-p0r es-m-p20b"
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 253px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    class="es-m-p0l es-m-txt-c"
                                    align="left"
                                    style="padding: 0; margin: 0; font-size: 0px"
                                  >
                                    <img
                                      src="https://lqcdfn.stripocdn.email/content/guids/CABINET_1374df08c14cd7d7b7b1369a74bf2cf2/images/62891630911721920.png"
                                      alt="Petshop logo"
                                      title="Petshop logo"
                                      width="108"
                                      style="
                                        display: block;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        -ms-interpolation-mode: bicubic;
                                      "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="es-m-txt-c"
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-bottom: 5px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      Po Box 3453 Colins St.
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      Ceduna 4096 Australia
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="es-m-txt-c"
                                    align="left"
                                    style="padding: 0; margin: 0; padding-top: 5px"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="tel:123456789"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                        >123456789</a
                                      ><br /><a
                                        target="_blank"
                                        href="mailto:your@mail.com"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                        >your@mail.com</a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td><td style="width:20px"></td><td style="width:437px" valign="top"><![endif]-->
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          align="right"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td align="left" style="padding: 0; margin: 0; width: 437px">
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    class="es-m-txt-c"
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 15px;
                                      padding-bottom: 20px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 30px;
                                        color: #333333;
                                        font-size: 20px;
                                      "
                                    >
                                      Information
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="es-m-txt-c" align="left" style="padding: 0; margin: 0">
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      Vector graphics designed by
                                      <a
                                        target="_blank"
                                        href="http://www.freepik.com/"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                        >Freepik</a
                                      >.<br />
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      You are receiving this email because you have visited our site
                                      or asked us about regular newsletter<br />
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    class="es-m-txt-c"
                                    style="padding: 0; margin: 0; padding-top: 10px"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue', helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href=""
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                          line-height: 18px;
                                        "
                                        class="unsubscribe"
                                        >Unsubscribe</a
                                      >
                                      ♦
                                      <a
                                        target="_blank"
                                        href="https://viewstripo.email"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                        >Update Preferences</a
                                      >
                                      ♦
                                      <a
                                        target="_blank"
                                        href="https://viewstripo.email"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                        >Customer Support</a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-content-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 750px;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                          padding-bottom: 30px;
                        "
                      >
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 710px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0; display: none"
                                  ></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Email sent: " + info.response);
  });
};
