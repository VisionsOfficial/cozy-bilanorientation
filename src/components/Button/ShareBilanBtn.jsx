import Icon from 'cozy-ui/transpiled/react/Icon';
import React from 'react';
import { useJsonFiles } from '../Hooks/useJsonFiles';
import { useClient } from 'cozy-client';

import Arrow from '../../assets/icons/arrow-right-solid.svg';
import { saveJSONFilesToVisionsCozyDoctype } from '../../utils/saveDataToVisionsCozyDoctype';
import { sendMail } from '../../utils/sendMail';
import { createPublicShareCode } from '../../utils/visions.cozy';

const ShareBilanBtn = ({
  absolute = false,
  onClickFc,
  textContent = 'Partager mon bilan'
}) => {
  return <></>;
};

// const ShareBilanBtn = ({
//   absolute = false,
//   onClickFc,
//   textContent = 'Partager mon bilan'
// }) => {
//   const client = useClient();
//   const { jsonFiles } = useJsonFiles();

//   const handleClick = async () => {
//     // const doc = await saveJSONFilesToVisionsCozyDoctype(client, jsonFiles);

//     // const publicShareCode = await createPublicShareCode(client, doc);

//     // const publicUrl = `${location.protocol}//${location.host}/public/?sharecode=${publicShareCode}`;

//     // console.log(publicUrl);

//     // const mailJob = await sendMail(client, {
//     //   mode: 'from',
//     //   to: [{ name: 'Test', email: 'felix@visionspol.eu' }],
//     //   subjects: "Bilan d'orientation",
//     //   parts: [{ type: 'text/plain', html: `${publicUrl}` }]
//     // });
//     // console.log(mailJob);

//     onClickFc();
//   };

//   return (
//     <div
//       style={{
//         position: absolute ? 'absolute' : null,
//         top: absolute ? 50 : null,
//         right: absolute ? 30 : null
//       }}
//       className='btnShare'
//       onClick={() => handleClick()}
//     >
//       <p className='btnText'>{textContent}</p>
//       <div className='btnCircle'>
//         <Icon icon={Arrow} />
//       </div>
//     </div>
//   );
// };

export default ShareBilanBtn;
