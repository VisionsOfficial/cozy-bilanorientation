const getJobCollection = client => client.collection('io.cozy.jobs');

/**
 * Sends an email using the cozy jobs
 *
 * * Example mailData
 *
 *{
 *  mode: "from",
 *  to: [{ name: "NAME", email: "EMAIL" }],
 *  subjects: "SUBJECT",
 *  parts: [{ type: "text/plain", body: "STRING_BODY" }]
 *}
 *
 * @param {CozyClient} client
 * @param {any} mailData
 */
export const sendMail = async (client, mailData) => {
  try {
    const jobCollection = getJobCollection(client);
    const data = await jobCollection.create('sendmail', mailData);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const trySendBOMail = async (
  client,
  toName,
  toEmail,
  userInfo,
  subject = "Bilan d'orientation"
) => {
  const publicShareUrl = sessionStorage.getItem('pubshare');
  if (!publicShareUrl) return;

  const jobCollection = getJobCollection(client);
  const mailData = {
    mode: 'from',
    to: [{ name: toName, email: toEmail }],
    subject: `${subject} - ${userInfo.firstName} ${userInfo.lastName}`,
    parts: [
      { type: 'text/html', body: buildTemplate(userInfo, publicShareUrl) }
    ]
  };

  try {
    const mailJob = await jobCollection.create('sendmail', mailData);
    return mailJob;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

const buildTemplate = (userInfo, publicShareUrl) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:Nunito, Roboto, sans-serif"> 
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>partage bo acteurs</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- --> 
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet"><!--<![endif]--> 
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:10px 20px 10px 20px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
</style> 
 </head> 
 <body style="width:100%;font-family:Nunito, Roboto, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
     <tr> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#17243F" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#17243f;width:600px"> 
             <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://sso.visionstrust.com/sso/interapp/login?serviceURL=https://visionsgalaxy.io/authentication/sso" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img src="https://fdiqqn.stripocdn.email/content/guids/CABINET_4ed744e31d608041002aad91930c7513/images/logovgtransparent.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="74" title="Logo"></a></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#17243f;background-repeat:no-repeat;width:600px;background-image:url(https://fdiqqn.stripocdn.email/content/guids/CABINET_e138135061b85fdd0f9179dad6b78f41/images/mask_group_sno.png);background-position:center 70px" cellspacing="0" cellpadding="0" bgcolor="#17243F" align="center" background="https://fdiqqn.stripocdn.email/content/guids/CABINET_e138135061b85fdd0f9179dad6b78f41/images/mask_group_sno.png"> 
             <tr> 
              <td align="left" style="Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:30px"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:Nunito, Roboto, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#21bbee"><strong>Vous venez de recevoir un bilan</strong></h1><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:Nunito, Roboto, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#21bbee;display:none"><br></h1></td> 
                     </tr> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#123F88;font-size:18px"><img src="https://fdiqqn.stripocdn.email/content/guids/CABINET_4ed744e31d608041002aad91930c7513/images/partagerbilan2.png" alt="Rocket" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="250" title="Rocket"></a></td> 
                     </tr> 
                     <tr> 
                      <td align="center" class="es-m-txt-c" style="Margin:0;padding-top:10px;padding-left:10px;padding-right:10px;padding-bottom:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Nunito, Roboto, sans-serif;line-height:27px;color:#ffffff;font-size:18px">Un bilan réalisé sur VisionsGalaxy vient&nbsp;de vous être partagé. Afin d'en visualiser le contenu et prendre contact avec ${userInfo.firstName} ${userInfo.lastName}, nous vous invitons à cliquer sur le bouton ci-dessous.</p></td> 
                     </tr> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#21bbee;border-width:0px;display:inline-block;border-radius:30px;width:auto"><a href="${publicShareUrl}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;border-style:solid;border-color:#21bbee;border-width:10px 20px 10px 20px;display:inline-block;background:#21bbee;border-radius:30px;font-family:Nunito, Roboto, sans-serif;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">VOIR LE BILAN</a></span></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr> 
              <td align="left" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://fdiqqn.stripocdn.email/content/guids/CABINET_e138135061b85fdd0f9179dad6b78f41/images/vector_Pm3.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr> 
          <td align="center" style="padding:0;Margin:0"> 
           <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px"> 
             <tr> 
              <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0"> 
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.facebook.com/Visionspol" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#123F88;font-size:14px"><img title="Facebook" src="https://fdiqqn.stripocdn.email/content/assets/img/social-icons/rounded-colored/facebook-rounded-colored.png" alt="Fb" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.instagram.com/visionspol/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#123F88;font-size:14px"><img title="Instagram" src="https://fdiqqn.stripocdn.email/content/assets/img/social-icons/rounded-colored/instagram-rounded-colored.png" alt="Inst" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/company/visionspol/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#123F88;font-size:14px"><img title="Linkedin" src="https://fdiqqn.stripocdn.email/content/assets/img/social-icons/rounded-colored/linkedin-rounded-colored.png" alt="In" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table></td> 
     </tr> 
   </table> 
  </div>  
 </body>
</html>`;
};
