import emailjs from '@emailjs/browser';
//  email service 
const YOUR_SERVICE_ID ="service_8zzqxgz"  //change with new service id
const YOUR_TEMPLATE_ID = "template_sodb9jm" //change with new template id
const YOUR_PUBLIC_ID ="_bEdlo5-1Ls-69RIH"    //change with new public key

export const sendemail = (Email, username, usermessage) => {
  var templateParams = {
    to_email: Email,
    name: username,
    message: usermessage,
  };
  emailjs.init({
    publicKey: YOUR_PUBLIC_ID,
  });
  emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    }
  );
};
